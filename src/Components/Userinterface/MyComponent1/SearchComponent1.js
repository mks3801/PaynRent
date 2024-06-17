import { useState,useEffect } from 'react';
import {Button, Divider, Paper,TextField} from '@mui/material'
import { LocationOn } from '@material-ui/icons';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getData } from '../../Services/FetchNodeServices';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import DateDiff from 'date-diff';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useNavigate } from 'react-router-dom';

export default function SearchComponent(propr){

const [selectedCity,setSelectedCity]=useState('Gwalior')
const [cities,setCities]=useState([])
const [open, setOpen] = useState(false);
const [startTime,setStartTime]=useState('')
const [endTime,setEndTime]=useState('')
const [daysTime,setDaysTime]=useState('')
const [days,setDays]=useState('')
const [hrs,sethrs]=useState('') 
const navigate=useNavigate()

const handleNavigate=()=>{
 navigate('/home')
}

const handleCity = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

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
         {item.status=="Top City"?<>
       <ListItem autoFocus button > 
        <ListItemText primary={<span style={{fontWeight:560,fontSize:18}}>{item.cityname}</span>} onClick={()=>handleCitySelected(item.cityname)} />
       </ListItem></>:<></>}
          </> )
})
}

const showOtherCity=()=>{
return cities.map((item)=>{
   return(<>
         {item.status=="Other City"?<>
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
          sx={{
            position: 'absolute',
            right: 8,
            top: 22,
            color: (theme) => theme.palette.grey[500],
          }}
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
);
}

const handleStartTimeValue=(newValue)=>{
 setStartTime(newValue)
}

const handleEndTimeValue=(newValue)=>{
  setEndTime(newValue)
  dateDiff(newValue)
}

const dateDiff=(et)=>{

  var startDay=new Date(startTime);
  var endDay=new Date(et);
  var diff = new DateDiff(endDay,startDay);

  setDays(parseInt(diff.days()))
  sethrs(Math.ceil(diff.hours()%24))
  setDaysTime("Duration:"+parseInt(diff.days())+"Days"+Math.ceil(diff.hours()%24)+"Hours");
}

return(<div style={{position:'relative'}}>
        <img src='/car/Slider2.png' style={{width:'100%'}}/> 
       <div style={{position:'absolute',top:'5%',left:'4%'}}>
       <Paper elevation={3} style={{display:'flex',justifyContent:'center',padding:20,width:450,height:400,borderRadius:15}} >
        <div  style={{width:480,height:90,background:'#f39c12',borderRadius:20,}}  >
   
         <div style={{marginLeft:'48%',marginTop:'2%',cursor:'pointer'}}><img src='/car/message.png' style={{width:225,height:95}} />
          <div onClick={handleNavigate} style={{position:'absolute',left:'16%',top:'8%',fontSize:24,fontWeight:700,color:'white'}}> Rentals</div>
          <div style={{position:'absolute',left:'11%',top:'15%',fontSize:17,fontWeight:400,color:'white'}}>For hours & days</div>
          <div style={{position:'absolute',left:'55%',top:'8%',fontSize:26,fontWeight:700,color:'black'}}>Subscriptions</div>
          <div style={{position:'absolute',left:'56%',top:'15%',fontSize:18,fontWeight:400,color:'black'}}>For month & year</div>
         </div>

        </div>
        <div style={{position:'absolute',top:'35%'}}><img src='/car/Rentals1.png' style={{width:150}}/></div>
        <div style={{position:'absolute',top:'45%',fontWeight:600,fontSize:18}}>Self drive car rentals in India</div>
        
        <div onClick={handleCity}  style={{position:'absolute',cursor:'pointer',left:'9%',top:'57%',border:'1px solid',width:400,height:60,borderRadius:15}}>
                <LocationOn style={{padding:12}} />
                <span style={{position:'absolute',left:'12%',top:'22%',fontSize:18,fontWeight:'bold'}}>{selectedCity}</span>
        </div>

        
        <div style={{position:'absolute',cursor:'pointer',left:'8%',top:'78%',width:400,height:60,borderRadius:25,background:'#f39c12'}}>
        <span style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'4%',fontSize:20,fontWeight:'bold',color:'#fff'}}>Search</span> 
          </div>     
       </Paper>
       </div>
    {cityDialog()}
 
</div>)

}