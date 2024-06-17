import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { ServerURL,getData, isValidAuth, postData } from "../../Services/FetchNodeServices";
import { Avatar,Button,Grid,TextField } from "@mui/material";
import { useStyle } from "./DisplayAllCategoryCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllCategory(props){

const [category,setCategory]=useState([])
const classes=useStyle()
const [open,setOpen]=useState(false)
const [categoryID,setCategoryID]=useState('')
const [categoryName,setCategoryName]=useState('')
const [icon,setIcon]=useState({filename:'/car/lexus.png', bytes:''})
const [prevIcon,setPrevIcon]=useState('')
const [oldIcon,setOldIcon]=useState('')
const [buttonStatus,setButtonStatus]=useState({upload:true})
const navigate =useNavigate()

const fetchAllCategory=async()=>{

var result = await getData('category/display_all_category')
setCategory(result.data)
}

const checkAuth=async()=>{
  var result=await isValidAuth()
   if(result.auth)
   {fetchAllCategory()}
   else
   {alert(result.message)}
}

useEffect(function(){
//fetchAllCategory()
checkAuth()
},[])

const handleSetDataForDialog=(rowData)=>{
  setCategoryID(rowData.categoryid)
  setCategoryName(rowData.categoryname)
  setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
  setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
  setOldIcon(rowData.icon)
  setOpen(true)
}

const handlePicture=(event)=>{
  setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  setButtonStatus({upload:false})
}

const showHidePictureButton=()=>{
  return(<div>

    {buttonStatus.upload?<><Button fullWidth variant="contained" component="label">
    Upload
      <input hidden accept="image/*" multiple type="file" onChange={handlePicture}   />
  </Button></>:<><Button color="primary" onClick={handleSavePicture}>Save</Button><Button color="secondary" onClick={handleDiscard}>Discard</Button></>}
  </div>)
}

const handleSavePicture=async()=>{
var formdata =new FormData()
formdata.append('categoryid',categoryID)
formdata.append('icon',icon.bytes)
formdata.append('oldicon',oldIcon)
var response =await postData('category/edit_picture',formdata)
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
fetchAllCategory()
}

const handleDiscard=()=>{
  setIcon({filename:prevIcon,bytes:''})
  setButtonStatus({upload:false})
}

const handleEditData=async()=>{

var body = {categoryname:categoryName,categoryid:categoryID}
var response = await postData ('category/edit_data',body)
if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Delete Category Succesfully',
     
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
fetchAllCategory()
}

const handleDelete=async()=>
{
var body ={categoryid:categoryID,oldicon:oldIcon}
var response =await postData('category/delete_data',body)
if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Delete Category Succesfully',
     
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
fetchAllCategory()
}

function displayCategory() {
  return (
           <MaterialTable
                  title="List of Categories"
                  columns={[
                    { title: 'Category ID', field: 'categoryid' },
                    { title: 'Name', field: 'categoryname' },
                    { title: 'Icon', field: 'icon',render:(rowData)=><Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{width:60,heigh:50}} variant="rounded" /> },
                   ]}
                  data={category}        
                  actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Edit Categories',
                      onClick: (event, rowData) => handleSetDataForDialog(rowData)
                    },
                    {
                      icon: 'add',
                      tooltip: 'Add Category',
                      isFreeAction: true,
                      onClick: (event) => navigate('/dashboard/category')
                    }
                  ]}
                  
  />
)
}

const handleClose=()=>{
  setOpen(false)
}

const showDialog=()=>{
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
    
        <DialogContent>
        
 <div className={classes.dialogBox}>

 <Grid container spacing={2} >

  <Grid item xs={12} className={classes.headingText}>
    Category
  </Grid>

<Grid item xs={12}>
    <TextField value={categoryName} label="Category Name" fullWidth onChange={(event)=>setCategoryName(event.target.value)} />
 </Grid>

 
 <Grid item xs={6}>
  {showHidePictureButton()}
 </Grid>

 <Grid item xs={6} className={classes.alignCenter}>
 <Avatar
        alt="Category Icon"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 100, height: 60 }}
      />

 </Grid>

 <Grid item xs={6} className={classes.alignCenter}>
 <Button onClick={handleEditData} fullWidth variant="contained" component="label" >
Edit Data
 </Button>
 </Grid>

 <Grid item xs={6} className={classes.alignCenter}>
 <Button onClick={handleDelete} fullWidth variant="contained" component="label">
Delete
</Button>
 </Grid>

 </Grid>
 </div>

 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
          Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}

return(<div className={classes.mainContainer}>
  <div className={classes.box}>

{displayCategory()}
</div>
{showDialog()}
</div>)
}