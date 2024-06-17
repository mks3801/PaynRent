import { useState,useEffect } from "react";
import { Grid,TextField,Button,Select,MenuItem,FormControl,Avatar,InputLabel } from "@mui/material";
import { useStyle } from "./SubcategoryCss";
import { ServerURL,postData,getData } from "../../Services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function Subcategory(props){

const classes=useStyle()
const [icon,setIcon]=useState({filename:'/car/lexus.png', bytes:''})
const [subcategoryName,setSubCategoryName] = useState('')
const [priority,setPriority] =useState('')
const [categoryID,setCategoryID]=useState('')
const [categoryList,setCategoryList] = useState([])
const navigate=useNavigate()

const handlePicture=(event)=>
{
  setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
}

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

const handleChange=(event)=>{
setCategoryID(event.target.value)
}


const handleSubmit=async()=>{

var formdata =new FormData()
formdata.append('categoryid',categoryID)
formdata.append('subcategoryname',subcategoryName)
formdata.append('icon',icon.bytes)
formdata.append('priority',priority)
var response = await postData('subcategory/submit_subcategory',formdata)
if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Subcategory Submitted Succesfully',
     
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

const handleNavigate=()=>
{
  navigate('/dashboard/displayallsubcategory')
}

const handleReset=()=>
{
  setCategoryID('')
  setSubCategoryName('')
  setIcon('')
}

return(
<div className={classes.mainContainer}>
 <div className={classes.box}>
   <Grid container spacing={2}>
     <Grid item xs={12} className={classes.headingText}>
     <div className={classes.ccenter}>
    <ListAltIcon onClick={handleNavigate} />
    <div style={{marginLeft:5}}> 
    SubCategory Interface
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
        <TextField label="Subcategory Name" fullWidth onChange={(event)=>setSubCategoryName(event.target.value)} />
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
       <Button fullWidth variant="contained" component="label">
         Upload
      <input hidden accept="image/*" multiple type="file" onChange={handlePicture}  />
       </Button>
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
        <Button fullWidth variant="contained" component="label" onClick={handleSubmit} >
           submit
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

