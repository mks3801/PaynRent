import {useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Button,Divider,TextField} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocationOn } from '@material-ui/icons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { getData } from '../../Services/FetchNodeServices';
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function Header(props){

const bookingDetails=useSelector(state=>state.booking)
const [selectedCity,setSelectedCity]=useState(bookingDetails.city)
const [cities,setCities]=useState([])
const [startTime,setStartTime]=useState(bookingDetails.starttime)
const [endTime,setEndTime]=useState(bookingDetails.endtime)
const [open,setOpen]=useState(false)
 
const fetchAllCity=async()=>{
  var response= await getData('user/display_all_city')
   setCities(response.data)
    }
          
useEffect(function(){
 fetchAllCity()
},[])
          
const showTopCity=()=>{
 return cities.map((item)=>{
 return(<>
  {item.status=="TopCity"?<>
   <ListItem autoFocus button > 
    <ListItemText primary={<span style={{fontWeight:560,fontSize:18}}>{item.cityname}</span>} onClick={()=>handleCitySelected(item.cityname)} />
   </ListItem></>:<></>}
  </> )
})
}
          
const showOtherCity=()=>{
return cities.map((item)=>{
 return(<>
  {item.status=="OtherCity"?<>
    <ListItem autoFocus button > 
    <ListItemText primary={item.cityname} onClick={()=>handleCitySelected(item.cityname)} />
    </ListItem></>:<></>}
 </> )
})
}
const handleCitySelected=(cityselected)=>
{
  setSelectedCity(cityselected)
  setOpen(false)
                   
}

const handleCity=()=>{
      setOpen(true)    
}
          
const cityDialog=()=>
{
 return (
 <div>
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    PaperProps={{style:{borderRadius:15}}}
   >
   <DialogTitle sx={{ m: 1, p: 2,width:250 }}  >
    <IconButton
       aria-label="close"
       onClick={handleClose}
       sx={{position: 'absolute', right: 8,top: 22,color: (theme) => theme.palette.grey[500],}}
     >
     <CloseIcon />
     </IconButton>
      {"Select Your City"}
     </DialogTitle>
     <Divider/>
     <DialogContent >
     <List>
      <div style={{fontSize:18,fontWeight:'bold'}}>Top City</div>
      {showTopCity()}
      <Divider/>
     <div style={{fontSize:18,fontWeight:'bold'}}>Other City</div>
      {showOtherCity()}
      </List>
      </DialogContent>
   </Dialog>
 </div>
);} 

const handleStartTimeValue=(newValue)=>{
 setStartTime(newValue)
}
         
const handleEndTimeValue=(newValue)=>{
  setEndTime(newValue)
          
}

const handleClose=()=>{
 setOpen(false)
}

    return(
        <div>
          <Box sx={{ flexGrow: 1 }}>
               <AppBar position="static" style={{ background: '#2E3B55' }} >
           <Toolbar>
            <div onClick={handleCity}  style={{position:'absolute',cursor:'pointer',left:'7%',top:'21%',border:'1px solid',width:210,height:40.5,background:'#dfe6e9',borderBottomLeftRadius:10,borderTopLeftRadius:10}}>
             <LocationOn style={{padding:10,color:'#2E3B55'}} />
              <span style={{position:'relative',left:'5%',bottom:'40%',fontSize:18,fontWeight:'bold',color:'#2E3B55'}}>{selectedCity}</span>
              <span style={{position:'absolute',cursor:'pointer',left:'80%',top:'1%'}}> <KeyboardArrowDownIcon style={{padding:10,color:'#2E3B55',}} /></span>
          </div>
         
         <Box component="div" sx={{ flexGrow: 1 }}>
         <div>
          <span style={{position:'absolute',cursor:'pointer',left:'23.5%',bottom:'15%',border:'1px solid',width:226,height:40,background:'#dfe6e9' }}>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker
          value={startTime}
          label={<span style={{padding:60,fontWeight:700,fontSize:16,color:'#2E3B55'}}>Start Time</span>}
          onChange={(newValue) => {handleStartTimeValue(newValue)}}
          renderInput={(params) =><TextField variant='standard'  {...params}/>}
          InputProps={{
            disableUnderline:true
          }}
        />
        </LocalizationProvider>
        <span style={{position:'absolute',cursor:'pointer',left:'80.7%',top:'1%'}}><KeyboardArrowDownIcon style={{padding:10,color:'#2E3B55'}} /></span>
          </span>
          <span  style={{position:'absolute',cursor:'pointer',left:'41.2%',bottom:'15%',border:'1px solid',width:226,height:40,background:'#dfe6e9',borderBottomRightRadius:10,borderTopRightRadius:10 }}>
           
           <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
          value={endTime}
          label={<span style={{padding:60,fontWeight:700,fontSize:16,color:'#2E3B55'}}>End Time</span>}
          onChange={(newValue) => {handleEndTimeValue(newValue)}}
          renderInput={(params) =><TextField variant='standard' {...params}/>}
          InputProps={{
            disableUnderline:true
          }}
        />
        </LocalizationProvider>  
        <span style={{position:'absolute',cursor:'pointer',left:'82.7%',top:'1%'}}><KeyboardArrowDownIcon style={{padding:10,color:'#2E3B55'}} /></span>
          </span>
          <span style={{position:'relative' ,left:"60%",width:'20%'}}> <Button variant="contained" style={{background:'linear-gradient(280deg,#e67e22,20%,#d35400,#f39c12)'}}>Modify Search</Button></span>
        </div>
         </Box>
         <Box>
        
         </Box>
          
        </Toolbar>
      </AppBar>
    </Box>
    <div>{cityDialog()}</div>
        </div>
    )
}