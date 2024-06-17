import { useState,useEffect } from "react";
import { Grid,TextField,Avatar,Select,FormControl,InputLabel,MenuItem,Button } from "@mui/material";
import { ServerURL,postData,getData } from "../../Services/FetchNodeServices";
import { useStyle } from "./ModelCss";
import { useNavigate } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import Swal from "sweetalert2";

export default function Model(props){

const classes=useStyle()
const navigate=useNavigate()
const [categoryID,setCategoryID]=useState('')
const [subcategoryID,setSubcategoryID]=useState('')
const [companyID,setCompanyID]=useState('')
const [modelName,setModelName]=useState('')
const [year,setYear]=useState('')
const [icon,setIcon]=useState({filename:'/car/lexus.png', bytes:''})
const [categoryList,setCategoryList]=useState([])
const [subcategoryList,setSubcategoryList]=useState([])
const [companyList,setCompanyList]=useState([])

/* Category Fill Dropdown */
const fetchAllCategory=async()=>{

var result = await getData('category/display_all_category')
  setCategoryList(result.data)
  }
                                    
  useEffect(function(){
  fetchAllCategory()
  },[])
                  
const fillCategoryDropdown=()=>{
                                   
  return categoryList.map((item)=>{
  return( 
    <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
   )
})
}
const handleChange=(event)=>
{
  setCategoryID(event.target.value)
  fetchAllSubcategoryByCategory(event.target.value)
}
                  
const fetchAllSubcategoryByCategory=async(category_Id)=>{
                                  
  var body={categoryid:category_Id}
  var response=await postData('subcategory/fetch_all_subcategory_by_category',body)
  setSubcategoryList(response.result)
  }
 /* SubCategory Fill Dropdown */                                 
const fillSubcategoryDropDown=()=>
{
  return subcategoryList.map((item)=>{
  return(
  <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>  
)
})
}
                                  
const handleSubcategoryChange=(event)=>
{
setSubcategoryID(event.target.value)
fetchAllCompanyBySubcategory(event.target.value)
 
}

const fetchAllCompanyBySubcategory=async(sub_id)=>{

var body={subcategoryid:sub_id}
var response=await postData('company/fetch_all_company_by_subcategory',body)
setCompanyList(response.result)
}
 
/* Company Fill Dropdown */
const fetchAllCompany=async()=>{
var result= await getData('company/display_all_company')
setCompanyList(result.data)
}
                  
useEffect(function(){
 fetchAllCompany()
 },[])

const fillCompanyDropDown=()=>
{ 
  return companyList.map((item)=>{
  return(
         <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
  )
  })
}

const handleCompanyChange=(event)=>
{
 setCompanyID(event.target.value)
}

const handlePicture=(event)=>{
setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
}

const handleSubmit=async()=>{
var formdata = new FormData()
formdata.append('categoryid',categoryID)
formdata.append('subcategoryid',subcategoryID)
formdata.append('companyid',companyID)
formdata.append('modelname',modelName)
formdata.append('year',year)
formdata.append('icon',icon.bytes)
var response= await postData('model/submit_model',formdata)
if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Company Submitted Succesfully',
     
  })
}
else
{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Server Error',
     
  })
}
}

const handleReset=()=>{
setCategoryID('')
setSubcategoryID('')
setCompanyID('')
setModelName('')
setYear('')
setIcon({filename:'car/lexus.png',bytes:''})
}

const handleNavigate=()=>
{
  navigate('/dashboard/displayallmodel')
}

return(
<div className={classes.mainContainer}>
<div className={classes.box}>
 <Grid container spacing={2}>
    
   <Grid item xs={12} className={classes.headingText}>
   <div className={classes.ccenter}>
    <ListAltIcon onClick={handleNavigate} />
    <div style={{marginLeft:5}}> 
      Model Interface 
      </div> 
      </div>          
    </Grid>

    <Grid item xs={6}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
          value={categoryID}
          onChange={handleChange}
        >
         {fillCategoryDropdown()}
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={6}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Subcategory</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Subcategory"
          value={subcategoryID}
          onChange={handleSubcategoryChange}
        >
         {fillSubcategoryDropDown()}
         </Select>
      </FormControl>
    </Grid>

    <Grid item xs={6}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Company"
          value={companyID}
          onChange={handleCompanyChange}
        >
         {fillCompanyDropDown()}
         </Select>
      </FormControl>          
    </Grid>

   <Grid item xs={6}>
   <TextField label="Model Name" fullWidth onChange={(event)=>setModelName(event.target.value)} />
   </Grid> 
   <Grid item xs={12}>
   <TextField label="Year" fullWidth onChange={(event)=>setYear(event.target.value)} />
   </Grid>

   <Grid item xs={6}>
      <Button fullWidth variant="contained" component="label">
           Upload
      <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
      </Button>
     </Grid>

     <Grid item xs={6} className={classes.alignCenter}>
     <Avatar
        alt="Company Icon"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 120, height: 75 }}
      />
     </Grid>

     <Grid item xs={6}>
      <Button fullWidth variant="contained" component="label" onClick={handleSubmit} >
            Submit
      </Button>         
     </Grid>
    
     <Grid item xs={6}>
      <Button fullWidth variant="contained" component="label" onClick={handleReset}>
            Reset
      </Button>         
     </Grid>

  </Grid> 
</div>

</div>)
}