import { useState,useEffect } from "react";
import { Grid,TextField,Button,Avatar } from "@mui/material";
import { useStyle } from "./CategoryCss";
import { ServerURL,postData } from "../../Services/FetchNodeServices";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom"
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function Category(props){
const classes=useStyle()
const [icon,setIcon]=useState({filename:'/car/lexus.png', bytes:''})
const [CategoryName,setCategoryName]=useState('')
const navigate = useNavigate()

const handlePicture=(event)=>{
setIcon({filename:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
}

const handleSubmit=async()=>{

var formdata = new FormData()
formdata.append('categoryname',CategoryName)
formdata.append('icon',icon.bytes);
var response = await postData('category/category_submit',formdata)
if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Category Submitted Succesfully',
     
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
  setCategoryName('')
  setIcon({filename:'/car/lexus.png', bytes:''})
}

const handleNavigate=()=>{
  navigate('/dashboard/displayallcategory')
}

return(
<div className={classes.mainContainer}>
 <div className={classes.box}>

 <Grid container spacing={2} >

  <Grid item xs={12} className={classes.headingText}>
   <div className={classes.ccenter}>
    <ListAltIcon onClick={handleNavigate} />
    <div style={{marginLeft:5}}> 
    Category Interface
    </div>
    </div> 
  </Grid>

<Grid item xs={12}>
    <TextField label="Category Name" fullWidth onChange={(event)=>setCategoryName(event.target.value)} />
 </Grid>

 <Grid item xs={6} className={classes.alignCenter}>
 <Button fullWidth variant="contained" component="label">
    Upload
      <input hidden accept="image/*" multiple type="file" onChange={handlePicture}  />
  </Button>
 </Grid>

 <Grid item xs={6} className={classes.alignCenter}>
 <Avatar
        alt="Category Icon"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 120, height: 75 }}
      />

 </Grid>

 <Grid item xs={6} className={classes.alignCenter}>
 <Button fullWidth variant="contained" component="label" onClick={handleSubmit} >
 submit
 </Button>
 </Grid>

 <Grid item xs={6} className={classes.alignCenter}>
 <Button fullWidth variant="contained" component="label" onClick={handleReset} >
Reset
</Button>
 </Grid>

 </Grid>
 </div>

</div>
)
}