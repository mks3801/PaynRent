import { useState, useEffect } from "react";
import { Grid, Button, TextField,Select,MenuItem,FormControl,Avatar,InputLabel} from "@mui/material";
import MaterialTable from "@material-table/core"
import { ServerURL, getData, postData } from "../../Services/FetchNodeServices";
import { useStyle } from "./DisplayAllCompanyCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllCompany(props){

const [company,setCompany]=useState([])
const [categoryID,setCategoryID]=useState('')
const [subcategoryID,setSubcategoryID]=useState('')
const [companyID,setCompanyID]=useState('')
const [icon,setIcon]=useState({filename:'/car/lexus.png', bytes:''})
const [prevIcon,setPrevIcon]=useState('')
const [oldIcon,setOldIcon]=useState('')
const [companyName,setCompanyName]=useState('')
const [open,setOpen]=useState('')
const [categoryList,setCategoryList] = useState([])
const [subcategoryList,setSubcategoryList] = useState([])
const [buttonStatus,setButtonStatus] = useState({upload:true})
const navigate=useNavigate()
const classes=useStyle()

const fetchAllCompany=async()=>{
var result= await getData('company/display_all_company')
setCompany(result.data)
}

useEffect(function(){
fetchAllCompany()
},[])

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
setButtonStatus({upload:false})
}

function displayCompany() {
return (
 <MaterialTable
  title="List of Company"
  columns={[
   { title: 'Category ID', field: 'categoryname' },
   { title: 'SubCategory ID', field: 'subcategoryname' },
   { title: 'Name', field: 'companyname' },
   { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 80, height: 45 }} variant="rounded" /> },
   ]}
    data={company}
    actions={[
   {
    icon: 'edit',
    tooltip: 'Edit SubCategory',
    onClick: (event, rowData) => handleSetDataForDialog(rowData)
   },
   {
    icon: 'add',
    tooltip: 'Add Company',
    isFreeAction: true,
    onClick: (event)=> navigate('/dashboard/company')
   }
                  
  ]}
  />
)}

const handleClose=()=>
{
  setOpen(false)
}

const handleSetDataForDialog=(rowData)=>
{ 
  setCompanyID(rowData.companyid)
  setCategoryID(rowData.categoryid)
  setSubcategoryID(rowData.subcategoryid)
  fetchAllSubcategoryByCategory(rowData.categoryid)
  setCompanyName(rowData.companyname)
  setIcon({filename:`${ServerURL}/images/${rowData.icon}`})
  setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
  setOldIcon(rowData.icon)
  setOpen(true)
}
const showHidePictureButton=()=>{
  return(<div>
    {buttonStatus.upload?<><Button fullWidth variant="contained" component="label">
    Upload
<input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
</Button></>:<><Button color="primary" onClick={handleSavePicture}>Save</Button><Button color="secondary" onClick={handleDiscard} >Discard</Button></>}
  </div>)
}

const handleSavePicture=async()=>
{
  var formdata = new FormData()
  formdata.append('companyid',companyID)
  formdata.append('icon',icon.bytes)
  formdata.append('oldicon',oldIcon)
  var response = await postData('company/edit_picture',formdata)
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
fetchAllCompany()
}

const handleDiscard=()=>
{
  setIcon({filename:prevIcon,bytes:''})
  setButtonStatus({upload:true})
}

const handleEditData=async()=>{

var body={categoryid:categoryID,subcategoryid:subcategoryID,companyname:companyName,companyid:companyID} 
var response=await postData('company/edit_data',body)
if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Updated Company Succesfully',
     
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
fetchAllCompany() 
}

const handleDeleteData=async()=>
{
  var body={companyid:companyID,oldicon:oldIcon}
  var response= await postData('company/delete_data',body)
  if(response.status)
  {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'Delete Subcategory Succesfully',
       
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
  fetchAllCompany()
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
<div className={classes.dialogContainer}>
<div className={classes.dialogBox}> 
<Grid container spacing={2}>
     <Grid item xs={12} className={classes.headingText}>
       Company Interface
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
       <TextField value={companyName} label="Company Name" fullWidth onChange={(event)=>setCompanyName(event.target.value)} />
     </Grid>
      
     <Grid item xs={6}>
     {showHidePictureButton()}
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
   </div>
   </div>
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
{displayCompany()}
</div>
{showDialog()}
</div>
)

}