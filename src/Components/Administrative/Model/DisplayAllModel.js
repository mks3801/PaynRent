import { useState,useEffect } from "react";
import { Grid,Button,TextField,Avatar,Select,FormControl,InputLabel,MenuItem } from "@mui/material";
import { useStyle } from "./DisplayAllModelCss";
import { ServerURL,postData,getData } from "../../Services/FetchNodeServices";
import MaterialTable from "@material-table/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllModel(props){

const classes=useStyle()
const navigate=useNavigate()
const [model,setModel]=useState([])
const [modelID,setModelID]=useState('')
const [categoryID,setCategoryID]=useState('')
const [subcategoryID,setSubcategoryID]=useState('')
const [companyID,setCompanyID]=useState('')
const [modelName,setModelName]=useState('')
const [year,setYear]=useState('')
const [icon,setIcon]=useState({filename:'car/lexus.png',bytes:''})
const [categoryList,setCategoryList]=useState([])
const [subcategoryList,setSubcategoryList]=useState([])
const [companyList,setCompanyList]=useState([])
const [open,setOpen]=useState('')
const [buttonStatus,setButtonStatus]=useState({upload:true})
const [prevIcon,setPrevIcon]=useState('')
const [oldIcon,setOldIcon]=useState('')

const fetchAllModel=async()=>
{
   var result =await getData('model/display_all_model')
   setModel(result.data)
}

useEffect(function(){
fetchAllModel()
},[])

const handleSetDataForDialog=(rowData)=>
{
  setModelID(rowData.modelid)
  setCategoryID(rowData.categoryid)
  setSubcategoryID(rowData.subcategoryid)
  setCompanyID(rowData.companyid)
  setModelName(rowData.modelname)
  setYear(rowData.year)
  setIcon({filename:`${ServerURL}/images/${rowData.icon}`})
  fetchAllSubcategoryByCategory(rowData.categoryid)
  fetchAllCompanyBySubcategory(rowData.subcategoryid)
  setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
  setOldIcon(rowData.icon)
  setOpen(true)
  
}

const handleClose=()=>
{
  setOpen(false)
}

function displayModel() {
return (
  <MaterialTable
    title="List of Model"
    columns={[
      { title: 'Category ID', field: 'categoryname' },
      { title: 'SubCategory ID', field: 'subcategoryname' },
      { title: 'Company ID', field: 'companyname' },
      { title: 'Name', field: 'modelname' },
      { title: 'Year', field: 'year' },
      { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 70, height: 40 }} variant="rounded" /> },
    ]}
      data={model}
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
        onClick: (event)=> navigate('/dashboard/model')
       }
                                    
    ]}
  />
  )}

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
  setButtonStatus({upload:false})
  }

const showHidePictureButton=()=>{
  return(
    <div>
      {buttonStatus.upload?<><Button fullWidth variant="contained" component="label">
           Upload
      <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
      </Button></>:<><Button color="primary" onClick={handleSavePicture}>Save</Button><Button color="secondary" onClick={handleDiscard}>Discard</Button></>}
    </div>
  )
}

const handleSavePicture=async()=>
{
  var formdata = new FormData()
  formdata.append('modelid',modelID)
  formdata.append('icon',icon.bytes)
  formdata.append('oldicon',oldIcon)
  var response = await postData('model/edit_picture',formdata)
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
  setButtonStatus({upload:true})
  fetchAllModel()
}

const handleDiscard=()=>
{
  setIcon({filename:prevIcon,bytes:''})
  setButtonStatus({upload:true})
}

const handleEditData=async()=>
{
  var body = {categoryid:categoryID,subcategoryid:subcategoryID,companyid:companyID,modelname:modelName,year:year,modelid:modelID}
  var response = await postData('model/edit_data',body)
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
fetchAllModel() 
}

const handleDeleteData=async()=>
{
  var body ={modelid:modelID,oldicon:oldIcon}
  var response = await postData('model/delete_data',body)
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
  fetchAllModel()
}

const showDialog=()=>{
  return(
    <div>
          
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <DialogContent>
       
      <Grid container spacing={2}>
   
   <Grid item xs={12} className={classes.headingText}>
     Model Interface          
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
   <TextField value={modelName} label="Model Name" fullWidth onChange={(event)=>setModelName(event.target.value)} />
   </Grid> 
   <Grid item xs={12}>
   <TextField value={year} label="Year" fullWidth onChange={(event)=>setYear(event.target.value)} />
   </Grid>

   <Grid item xs={6}>
      {showHidePictureButton()}
     </Grid>

     <Grid item xs={6} className={classes.alignCenter}>
     <Avatar
        alt="Model Icon"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 120, height: 75 }}
      />
     </Grid>

     <Grid item xs={6}>
      <Button fullWidth variant="contained" component="label" onClick={handleEditData}  >
           Edit Data
      </Button>         
     </Grid>
    
     <Grid item xs={6}>
      <Button fullWidth variant="contained" component="label" onClick={handleDeleteData} >
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
  <div className={classes.box}>
  {displayModel()}
  </div>
  {showDialog()}
</div>
)
}