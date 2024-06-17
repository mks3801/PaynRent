import { useState,useEffect } from "react";
import { Button,Grid,TextField,Avatar,Select,InputLabel,MenuItem,FormControl,Radio,FormLabel,RadioGroup,FormControlLabel } from "@mui/material";
import { useStyle } from "./VehicleCss";
import Swal from "sweetalert2";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { ServerURL,postData,getData } from "../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";

 

export default function Vehicle(props){

const classes =useStyle()
const navigate=useNavigate()
const [categoryID,setCategoryID]=useState('')
const [subcategoryID,setSubcategoryID]=useState('')
const [companyID,setCompanyID]=useState('')
const [modelID,setModelID]=useState('')
const [icon,setIcon]=useState({filename:'/car/lexus.png',bytes:''})
const [categoryList,setCategoryList]=useState([])
const [subcategoryList,setSubcategoryList]=useState([])
const [companyList,setCompanyList]=useState([])
const [modelList,setModelList]=useState([])
const [fuel,setFuel]=useState('')
const [capacity,setCapacity]=useState('')
const [ratings,setRatings]=useState('')
const [status,setStatus]=useState('')
const [venderId,setVenderId]=useState('')
const [registration,setRegistration]=useState('')
const [color,setColor]=useState('')
const [average,setAverage]=useState('')
const [remark,setRemark]=useState('')
const [feature,setFeature]=useState('')
const [transmission,setTransmission]=useState('')
const [rent,setRent]=useState('')

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
   fetchAllModelByCompany(event.target.value)
  }

const fetchAllModelByCompany=async(company_Id)=>
{
   var body={companyid:company_Id}
   var response=await postData('model/fetch_all_model_by_company',body)
   setModelList(response.result)
}

  /* Model Fill Dropdown */
  const fetchAllModel=async()=>
{
   var result =await getData('model/display_all_model')
   setModelList(result.data)
}

useEffect(function(){
fetchAllModel()
},[])

const fillModelDropDown=()=>{
  return modelList.map((item)=>{
    return(
      <MenuItem value={item.modelid}>{item.modelname}</MenuItem> 
    )
  })
}
 
  
const handlemodelChange=(event)=>
{
 setModelID(event.target.value)
}
/*=================================*/

const handlePicture=(event)=>
{
  setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
}

const handleSubmit=async()=>{

var formdata = new FormData()
formdata.append('categoryid',categoryID)
formdata.append('subcategoryid',subcategoryID)
formdata.append('companyid',companyID)
formdata.append('modelid',modelID)
formdata.append('venderid',venderId)
formdata.append('registrationno',registration)
formdata.append('color',color)
formdata.append('fueltype',fuel)
formdata.append('ratings',ratings)
formdata.append('average',average)
formdata.append('remark',remark)
formdata.append('capacity',capacity)
formdata.append('status',status)
formdata.append('feature',feature)
formdata.append('transmission',transmission)
formdata.append('icon',icon.bytes)
formdata.append('rent',rent)
var response = await postData('vehicle/submit_vehicle',formdata)
if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Vehicle Submitted Succesfully',
     
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

const clearValue=()=>
{
  setCategoryID('')
  setSubcategoryID('')
  setCompanyID('')
  setModelID('')
  setVenderId('')
  setRegistration('')
  setColor('')
  setFuel('')
  setAverage('')
  setRatings('')
  setRemark('')
  setCapacity('')
  setStatus('')
  setFeature('')
  setTransmission('')
  setIcon({filename:'car/lexus.png',bytes:''})
  setRent('')
}

const handleNavigate=()=>
{
  navigate('/dashboard/displayallvehicle')
}

return(
    <div className={classes.mainContainer}>
     <div className={classes.box}>
      <Grid container spacing={2}>

        <Grid item xs={12} className={classes.headingText}>
        <div className={classes.ccenter}>
            <ListAltIcon onClick={handleNavigate} />
          <div style={{marginLeft:5}}> 
          Vehicle Interface 
          </div> 
        </div>       
        </Grid>

        <Grid item xs={6}>
        <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select Category"
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
          label="Select Subcategory"
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
          label="Select Company"
          value={companyID}
          onChange={handleCompanyChange}
        >
         {fillCompanyDropDown()}
         </Select>
        </FormControl>          
        </Grid>

        <Grid item xs={6}>
        <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Select model</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select Model"
          value={modelID}
          onChange={handlemodelChange}
        >
         {fillModelDropDown()}
         </Select>
        </FormControl>          
        </Grid>

      <Grid item xs={6}>
       <TextField label="Veder ID" fullWidth onChange={(event)=>setVenderId(event.target.value)} />
      </Grid>

      <Grid item xs={6}>
       <TextField label="Registration Number" fullWidth onChange={(event)=>setRegistration(event.target.value)} />
      </Grid>
      <Grid item xs={4}>
       <TextField label="color" fullWidth onChange={(event)=>setColor(event.target.value)} />
      </Grid>
      <Grid item xs={4}>
      <FormControl fullWidth>
       <InputLabel id="demo-simple-select-label">Fuel</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fuel}
          label="Fuel"
          onChange={(event=>setFuel(event.target.value))}
  >
           <MenuItem value="Petrol">Petrol</MenuItem>
           <MenuItem value="Desiel">Desiel</MenuItem>
           <MenuItem value="CNG">CNG</MenuItem>
           <MenuItem value="Electric">Electric</MenuItem>
        </Select>
       </FormControl>
      </Grid>
     
      <Grid item xs={4}>
      <FormControl fullWidth>
       <InputLabel id="demo-simple-select-label">Transmission</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={transmission}
          label="Transmission"
          onChange={(event=>setTransmission(event.target.value))}
  >
           <MenuItem value="Manual">Manual</MenuItem>
           <MenuItem value="Automatic">Automatic</MenuItem>
           
        </Select>
       </FormControl>
      </Grid>

      <Grid item xs={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ratings</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ratings}
          label="Rating"
          onChange={(event => setRatings(event.target.value))}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={4}>
       <TextField label="Average" fullWidth onChange={(event)=>setAverage(event.target.value)} />
      </Grid>
      <Grid item xs={4}>
       <TextField label="Remark" fullWidth onChange={(event)=>setRemark(event.target.value)} />
      </Grid>
      <Grid item xs={4}>
      <FormControl fullWidth>
       <InputLabel id="demo-simple-select-label">Seating Capacity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={capacity}
          label="Seating Capacity"
          onChange={(event=>setCapacity(event.target.value))}
  >        <MenuItem value="4">4 Seater</MenuItem>
           <MenuItem value="5">5 Seater</MenuItem>
           <MenuItem value="7">7 Seater</MenuItem>
           <MenuItem value="8">8 Seater</MenuItem>
        </Select>
       </FormControl>
      </Grid>
      <Grid item xs={4}>
      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(event)=>setStatus(event.target.value)}
      >
        <FormControlLabel value="Continue" control={<Radio />} label="Continue" />
        <FormControlLabel value="Discontinue" control={<Radio />} label="Discontinue" />
        </RadioGroup>
    </FormControl>
      </Grid>
      <Grid item xs={4}>
       <TextField label="Feature" fullWidth onChange={(event)=>setFeature(event.target.value)} />
      </Grid>
      <Grid item xs={4}>
       <TextField label="Rentperhr" fullWidth onChange={(event)=>setRent(event.target.value)} />
      </Grid>
      <Grid item xs={4}>
      <Button fullWidth variant="contained" component="label">
           Upload
      <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
      </Button>
     </Grid>

     <Grid item xs={4} className={classes.alignCenter}>
     <Avatar
        alt="Vehicle Icon"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 120, height: 60 }}
      />
     </Grid>
      <Grid item xs={6}>
      <Button fullWidth variant="contained" component="label" onClick={handleSubmit}  >
            Submit
      </Button>     
      </Grid>
      <Grid item xs={6}>
      <Button fullWidth variant="contained" component="label" onClick={clearValue}  >
            Reset
      </Button>     
      </Grid>
      </Grid>

</div>
</div>)
}