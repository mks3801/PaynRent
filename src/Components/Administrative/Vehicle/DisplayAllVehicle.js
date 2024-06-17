import { useState,useEffect } from "react";
import {ServerURL,getData,postData } from "../../Services/FetchNodeServices";
import { Button,Grid,TextField,Avatar,Select,InputLabel,MenuItem,FormControl,Radio,FormLabel,RadioGroup,FormControlLabel } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useStyle } from "./DisplayAllVehicleCss";
import MaterialTable from "@material-table/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
 
export default function DisplayAllVehicle(props){

const classes=useStyle()
const navigate=useNavigate()
const [vehicle,setVehicle]=useState([])
const [vehicleId,setVehicleId]=useState()
const [categoryID,setCategoryID]=useState('')
const [subcategoryID,setSubcategoryID]=useState('')
const [companyID,setCompanyID]=useState('')
const [modelID,setModelID]=useState('')
const [icon,setIcon]=useState({filename:'car/lexus.png',bytes:''})
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
const [open,setOpen]=useState('')
const [buttonStatus,setButtonStatus]=useState({upload:true})
const [prevIcon,setPrevIcon]=useState('')
const [oldIcon,setOldIcon]=useState('')

const fetchAllVehicle=async()=>{
var result = await getData('vehicle/display_all_vehicle')
setVehicle(result.data)
}

useEffect(function(){
fetchAllVehicle()
},[])

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
   setButtonStatus({upload:false})
 }

const handleSetDataForDialog=(rowData)=>{
 setVehicleId(rowData.vehicleid)
 setCategoryID(rowData.categoryid)
 setSubcategoryID(rowData.subcategoryid)
 setCompanyID(rowData.companyid)
 setModelID(rowData.modelid)
 setVenderId(rowData.venderid)
 setRegistration(rowData.registrationno)
 setColor(rowData.color)
 setFuel(rowData.fueltype)
 setRatings(rowData.ratings)
 setAverage(rowData.average)
 setRemark(rowData.remark)
 setCapacity(rowData.capacity)
 setStatus(rowData.status)
 setFeature(rowData.feature)
 setTransmission(rowData.transmission)
 setRent(rowData.rent)
 setIcon({filename:`${ServerURL}/images/${rowData.icon}`})
 fetchAllSubcategoryByCategory(rowData.categoryid)
 fetchAllCompanyBySubcategory(rowData.subcategoryid)
 fetchAllModelByCompany(rowData.companyid)
 setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
 setOldIcon(rowData.icon)
 setOpen(true)
}

function displayVehicle() {
 return (
  <MaterialTable
    title="List of Vehicle"
    columns={[
    { title: 'VehicleId/VenderId',render:(rowData)=><div>{rowData.vehicleid}<br/>{rowData.venderid}</div> },
    { title: 'Category/SubCategory',render:(rowData)=><div>{rowData.categoryname}<br/>{rowData.subcategoryname}</div> },
    { title: 'Company/Model', render:(rowData)=><div>{rowData.companyname}<br/>{rowData.modelname}</div> },
    { title: 'Registration Number/color',render:(rowData)=><div>{rowData.registrationno}<br/>{rowData.color}</div>},
    { title: 'Fuel/Average',render:(rowData)=><div>{rowData.fueltype}<br/>{rowData.average}</div>},
    { title: 'Ratings', field: 'ratings'},
    { title: 'Rmark', field: 'remark'},
    { title: 'Capacity', field: 'capacity'},
    { title: 'Status', field: 'status'},
    { title: 'Feature', field: 'feature'},
    { title: 'Transmission', field: 'transmission'},
    { title: 'Rentperhrs', field: 'rent'},
    { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 80, heigh: 55 }} variant="rounded" /> },
             ]}
    data={vehicle}
    actions={[
   {
     icon: 'edit',
     tooltip: 'Model',
     onClick: (event, rowData) => handleSetDataForDialog(rowData)
   },
   {
    icon: 'add',
    tooltip: 'Add Model',
    isFreeAction: true,
    onClick: (event)=> navigate('/dashboard/vehicle')
   }
]}
/>
)}

const showHidePictureButton=()=>{
return(
  <div>
   {buttonStatus.upload?<><Button fullWidth variant="contained" component="label">
                    Upload
    <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
     </Button></>:<><Button color="primary" onClick={handleSavePicture}>Save</Button><Button color="secondary" onClick={handleDiscard} >Discard</Button></>}
  </div>
)}

const handleSavePicture=async()=>
{ var formdata = new FormData()
  formdata.append('vehicleid',vehicleId)
  formdata.append('icon',icon.bytes)
  formdata.append('oldicon',oldIcon)
  var response = await postData('vehicle/edit_picture',formdata)
  if(response.status)
  {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'Icon Updated Succesfully',
       
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
  setOpen(false)
  fetchAllVehicle()
  setButtonStatus({upload:true})
}

const handleDiscard=()=>
{
  setIcon({filename:prevIcon,bytes:''})
  setButtonStatus({upload:true})
}

const handleEditData=async()=>
{
 var body={categoryid:categoryID,subcategoryid:subcategoryID,
           companyid:companyID,modelid:modelID,venderid:venderId,registrationno:registration,
           color:color,fueltype:fuel,ratings:ratings,average:average,remark:remark,
           capacity:capacity,status:status,feature:feature,transmission:transmission,vehicleid:vehicleId,}
 var response =await postData('vehicle/edit_data',body)
 if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Edit Data Succesfully',
     
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
setOpen(false)
fetchAllVehicle()
}

const handleDelete=async()=>
{
  var body={vehicleid:vehicleId,oldicon:oldIcon}
  var response = await postData('vehicle/delete_data',body)
  if(response.status)
  {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'Delete Model Succesfully',
       
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
setOpen(false)
fetchAllVehicle()
}

const handleClose=()=>
{
  setOpen(false)
}
                  
const showDialog=()=>{
 return(
  <div>
   <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    style={{width:"100%"}}
    >
   <DialogContent >
    
      <Grid container spacing={2}>

        <Grid item xs={12} className={classes.headingText}>
          Vehicle Interface
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
       <TextField value={venderId} label="Veder ID" fullWidth onChange={(event)=>setVenderId(event.target.value)} />
      </Grid>

      <Grid item xs={6}>
       <TextField value={registration} label="Registration Number" fullWidth onChange={(event)=>setRegistration(event.target.value)} />
      </Grid>
      <Grid item xs={4}>
       <TextField value={color} label="color" fullWidth onChange={(event)=>setColor(event.target.value)} />
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
          label="Fule Type"
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
       <TextField value={average} label="Average" fullWidth onChange={(event)=>setAverage(event.target.value)} />
      </Grid>
      <Grid item xs={4}>
       <TextField value={remark} label="Remark" fullWidth onChange={(event)=>setRemark(event.target.value)} />
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
  >         
           <MenuItem value="4">4 Seater</MenuItem>
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
        value={status}
      >
        <FormControlLabel value="Continue" control={<Radio />} label="Continue" />
        <FormControlLabel value="Discontinue" control={<Radio />} label="Discontinue" />
        </RadioGroup>
    </FormControl>
      </Grid>
      
      <Grid item xs={4}>
       <TextField value={feature} label="Feature" fullWidth onChange={(event)=>setFeature(event.target.value)} />
      </Grid>
      <Grid item xs={4}>
       <TextField value={feature} label="Rent" fullWidth onChange={(event)=>setRent(event.target.value)} />
      </Grid>
      <Grid item xs={4}>
       {showHidePictureButton()}
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
      <Button fullWidth variant="contained" component="label" onClick={handleEditData}   >
           Edit Data
      </Button>     
      </Grid>
      <Grid item xs={6}>
      <Button fullWidth variant="contained" component="label" onClick={handleDelete}   >
        Delete Data
      </Button>     
      </Grid>
      </Grid>

                  
   </DialogContent>
   <DialogActions>
   <Button onClick={handleClose} autoFocus>
    Close
   </Button>
   </DialogActions>
  </Dialog>
 </div>
)} 

return(
 <div className={classes.mainContainer}>
  <div className={classes.dialogBox}>
   {displayVehicle()}
  </div>
  {showDialog()}
 </div>
)
}