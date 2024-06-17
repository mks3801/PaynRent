import { useState, useEffect } from "react";
import { Grid, Button, TextField,Select,MenuItem,FormControl,Avatar,InputLabel} from "@mui/material";
import MaterialTable from "@material-table/core"
import { ServerURL, getData, postData } from "../../Services/FetchNodeServices";
import { useStyle } from "./DisplayAllSubcategoryCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllSubcategory(props) {

const [categoryID,setCategoryID]=useState('')
const [subcategoryID,setSubcategoryID]=useState('')
const [subCategoryName,setSubCategoryName]=useState('')
const [icon,setIcon]=useState({filename:'/car/lexus.png', bytes:''})
const [prevIcon,setPrevIcon]=useState('')
const [oldIcon,setOldIcon]=useState('')
const [subcategory,setSubcategory]=useState([])
const [open,setOpen]=useState('')
const [priority,setPriority] =useState('')
const navigate=useNavigate()
const classes=useStyle()
const [categoryList,setCategoryList] = useState([])
const [buttonStatus,setButtonStatus] = useState({upload:true})

const fetchAllsubcategory=async()=>{
var result = await getData('subcategory/display_all_subcategory')
setSubcategory(result.data)
}

useEffect (function(){
fetchAllsubcategory()
},[])

const fetchAllCategory=async()=>{

var result = await getData('category/display_all_category')
setCategoryList(result.data)
}
                                    
useEffect(function(){
fetchAllCategory()
 },[])

const handlePicture=(event)=>
{
  setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  setButtonStatus({upload:false})
}

const handleSetDataForDialog=(rowData)=>{
setSubcategoryID(rowData.subcategoryid)
setCategoryID(rowData.categoryid)
setSubCategoryName(rowData.subcategoryname)
setPriority(rowData.priority)
setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
setOldIcon(rowData.icon)
setOpen(true)
}

const showHidePictureButton=()=>{
return(<div>{

buttonStatus.upload?<><Button fullWidth variant="contained" component="label">
Upload
<input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
</Button></>:<><Button color="primary" onClick={handleSavePicture}>Save</Button><Button onClick={handleDiscard}  color="secondary">Discard</Button></>
}
</div>)
}

const handleDiscard=()=>
{
  setIcon({filename:prevIcon,bytes:''})
  setButtonStatus({upload:true})
}

const handleSavePicture=async()=>
{
  var formdata = new FormData()
  formdata.append('subcategoryid',subcategoryID)
  formdata.append('icon',icon.bytes)
  formdata.append('oldicon',oldIcon)
  var response =await postData('subcategory/edit_picture',formdata)
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
fetchAllsubcategory()
}

const handleEditData=async()=>
{
  var body = {categoryid:categoryID,subcategoryname:subCategoryName,priority:priority,subcategoryid:subcategoryID}
  var response = await postData('subcategory/edit_data',body)
  if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Edit Subcategory Succesfully',
     
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
fetchAllsubcategory()
}

const handleDeleteData=async()=>
{
  var body = {subcategoryid:subcategoryID,oldicon:oldIcon}
  var response = await postData('subcategory/delete_data',body)
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
fetchAllsubcategory()
}


function displaysubcategory() {
  return (
       <MaterialTable
          title="List of Subcategories"
            columns={[
               { title: 'Category ID', field: 'categoryname' },
               { title: 'Name', field: 'subcategoryname' },
               { title: 'Priority', field: 'priority' },
               { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width:65, heigh: 50 }} variant="rounded" /> },
               ]}
                  data={subcategory}
                  actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Edit SubCategory',
                      onClick: (event, rowData) => handleSetDataForDialog(rowData)
                     },
                     {
                      icon: 'add',
                      tooltip: 'Add Categories',
                      isFreeAction: true,
                      onClick: (event) =>navigate('/dashboard/subcategory')
                    }
  
                  ]}
            />
             )
        }

const handleClose = () => {
setOpen(false)
}

const fillCategoryDropdown=()=>{
 
return categoryList.map((item)=>{
return( 
<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
)
                                     
})
}

const handleChange=(event)=>{
setCategoryID(event.target.value)
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
   <Grid container spacing={2}>
     <Grid item xs={12} className={classes.headingText}>
     Subcategory Interface
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
        <TextField value={subCategoryName} label="Subcategory Name" fullWidth onChange={(event)=>setSubCategoryName(event.target.value)} />
      </Grid>

      <Grid item xs={12}>
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Priority</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Priority"
          value={priority}
          onChange={(event)=>setPriority(event.target.value)}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>

        </Select>
      </FormControl>
      </Grid>

      <Grid item xs={6}>
      {showHidePictureButton()}
      </Grid>

      <Grid item xs={6} className={classes.alignCenter}>
      <Avatar
        alt="Subcategory Icon"
        src={icon.filename }
        variant="rounded"
        sx={{ width: 120, height: 56 }}
      />
      </Grid>
      
      <Grid item xs={6}>
        <Button fullWidth variant="contained" component="label" onClick={handleEditData}  >
          Edit Data
        </Button>
      </Grid>

      <Grid item xs={6}>
      <Button fullWidth variant="contained" component="label" onClick={handleDeleteData}>
        Delete Data
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



return (<div className={classes.mainContainer}>
<div className={classes.box}>
{displaysubcategory()}
</div>
{showDialog()}
</div>)
}