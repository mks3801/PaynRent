import { useState,useEffect } from "react";
import { postData,getData } from "../../Services/FetchNodeServices";
import { useStyle } from "./CompanyCss";
import { Grid,TextField,Button,Avatar,Select,FormControl,InputLabel,MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";

export default function Company(props){

const classes=useStyle()
const [categoryID,setCategoryID]=useState('')
const [subcategoryID,setSubcategoryID]=useState('')
const [categoryList,setCategoryList]=useState([])
const [icon,setIcon]=useState({filename:'/car/lexus.png', bytes:''})
const [subcategoryList,setSubcategoryList]=useState([])
const [companyName,setCompanyName]=useState('')
const navigate=useNavigate()

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
}

const handlePicture=(event)=>{
  setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
}

const handleSubmit=async()=>
{
  var formdata = new FormData()
  formdata.append('categoryid',categoryID)
  formdata.append('subcategoryid',subcategoryID)
  formdata.append('companyname',companyName)
  formdata.append('icon',icon.bytes)
  var response = await postData('company/submit_company',formdata)
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

const handleReset=()=>
{
  setCategoryID('')
  setSubcategoryID('')
  setCompanyName('')
  setIcon({filename:'/car/lexus.png', bytes:''})
}

const handleNavigate=()=>
{
  navigate('/dashboard/displayallcompany')
}

return(
<div className={classes.mainContainer}>
 <div className={classes.box}>
   <Grid container spacing={2}>
     <Grid item xs={12} className={classes.headingText}>
     <div className={classes.ccenter}>
    <ListAltIcon onClick={handleNavigate} />
    <div style={{marginLeft:5}}> 
    Company Interface
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
     
     <Grid item xs={12}>
       <TextField label="Company Name" fullWidth onChange={(event)=>setCompanyName(event.target.value)} />
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
</div>
)}