import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { ServerURL,getData, postData } from "../../Services/FetchNodeServices";
import { Avatar,Button,Grid,TextField } from "@mui/material";
import { useStyle } from "./DisplayAllOfferCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllCategory(props){

const [offer,setOffer]=useState([])
const classes=useStyle()
const [open,setOpen]=useState(false)
const [offerId,setOfferId]=useState('')
const [title,setTitle]=useState('')
const [description,setDescription]=useState('')
const [icon,setIcon]=useState({filename:'/car/lexus.png', bytes:''})
const [prevIcon,setPrevIcon]=useState('')
const [oldIcon,setOldIcon]=useState('')
const [buttonStatus,setButtonStatus]=useState({upload:true})
const navigate =useNavigate()

const fetchAllOffer=async()=>{

var result = await getData('offer/display_all_offer')
setOffer(result.data)
}

useEffect(function(){
fetchAllOffer()
},[])

const handleSetDataForDialog=(rowData)=>{
  setOfferId(rowData.offerid)
  setTitle(rowData.title)
  setDescription(rowData.description)
  setIcon({filename:`${ServerURL}/images/${rowData.image}`,bytes:''})
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
formdata.append('offerid',offerId)
formdata.append('image',icon.bytes)
formdata.append('oldicon',oldIcon)
var response =await postData('category/edit_picture',formdata)
if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Image Updated Succesfully',
     
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
fetchAllOffer()
}

const handleDiscard=()=>{
  setIcon({filename:prevIcon,bytes:''})
  setButtonStatus({upload:false})
}

const handleEditData=async()=>{

var body = {title:title,description:description,offerid:offerId}
var response = await postData ('offer/edit_data',body)
if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Edit offer Succesfully',
     
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
fetchAllOffer()
}

const handleDelete=async()=>
{
var body ={offerid:offerId,oldicon:oldIcon}
var response =await postData('offer/delete_data',body)
if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Delete Offer Succesfully',
     
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
fetchAllOffer()
}

function displayCategory() {
  return (
           <MaterialTable
                  title="List of Offer"
                  columns={[
                    { title: 'Offer ID', field: 'offerid' },
                    { title: 'Title', field: 'title' },
                    { title: 'Description', field: 'description' },
                    { title: 'Icon', field: 'image',render:(rowData)=><Avatar src={`${ServerURL}/images/${rowData.image}`} style={{width:40,heigh:40}} variant="rounded" /> },
                   ]}
                  data={offer}        
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
                      onClick: (event) => navigate('/dashboard/offer')
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
   Offer Interface
  </Grid>

  <Grid item xs={12}>
    <TextField value={title} label="Title" fullWidth onChange={(event)=>setTitle(event.target.value)} />
 </Grid>

 <Grid item xs={12}>
    <TextField value={description} label="Description" fullWidth onChange={(event)=>setDescription(event.target.value)} />
 </Grid>

 
 <Grid item xs={6}>
  {showHidePictureButton()}
 </Grid>

 <Grid item xs={6} className={classes.alignCenter}>
 <Avatar
        alt="Offer Icon"
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