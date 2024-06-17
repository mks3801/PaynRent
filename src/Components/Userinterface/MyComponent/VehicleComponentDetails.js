import { useState,useEffect } from "react";
import { Paper,Grid,Divider,TextField,Button } from "@mui/material";
import Header from "./Header";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ServerURL, getData } from '../../Services/FetchNodeServices';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function VehicleComponentDetails(props){

const bookingDetails=useSelector(state=>state.booking)
const [selectedCity,setSelectedCity]=useState(bookingDetails.city)
const [cities,setCities]=useState([])
const [open,setOpen]=useState(false)

const navigate=useNavigate()
const vehicle=useSelector((state)=>state.vehicle)
const vehicledetails=Object.values(vehicle)[0]

var st=Object.values(bookingDetails.starttime)[2]
var std=st.toDateString()
var stt=st.getHours()+":"+st.getMinutes()+":"+st.getSeconds()

var et=Object.values(bookingDetails.endtime)[2]
var etd=et.toDateString()
var ett=et.getHours()+":"+et.getMinutes()+":"+et.getSeconds()

var pickUp=400
var seDeposit=5000
var total=parseInt(pickUp)+parseInt(seDeposit)+parseInt(vehicledetails.rent)

const handlePlan=()=>{
  navigate("/home")
}

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

const handleClose=()=>{
  setOpen(false)
 }

 const handlePayment=()=>{
  navigate("/paymentgateway")
 }

return(<div style={{width:'100%',height:'100%'}}>
<div><Header/></div> 
<div style={{display:'flex',marginBottom:'10',background:"#7f8c8d",padding:'20px'}}>
<div style={{width:'100vw', height:'100vh',  borderRadius:10,marginTop:-22, }}>     

 <Paper style={{background:"#95a5a6",width:'63%',height:'45%'}}>

 <div style={{fontSize:22,fontWeight:600,marginLeft:70,marginTop:25}}>
  <span style={{position:'relative',top:18}}> {vehicledetails.companyname} {vehicledetails.modelname}</span>
 </div>

 <div>
     <img src={`${ServerURL}/images/${vehicledetails.icon} `} style={{width:220,height:140,marginLeft:40,marginTop:25}}/>  
 </div>

 <div style={{fontSize:15,fontWeight:600,marginLeft:10,marginTop:20}}>
  <span><img src="/car/iconDiesel.svg" style={{width:45,height:13}}/></span> <span style={{marginLeft:-10}} >{vehicledetails.fueltype}</span>
  <span><img src="/car/iconTransmission.svg" style={{width:45,height:13}}/></span><span style={{marginLeft:-7}}>{vehicledetails.transmission} </span>
  <span><img src="/car/iconSeat.svg" style={{width:45,height:13}}/></span><span style={{marginLeft:-8}}>{vehicledetails.capacity} Seater</span>
 </div>

 <div style={{flexDirection:'column',marginTop:-235,marginLeft:300}}> 
 <Divider> <span style={{fontWeight:700,}}>BOOKING DETAILS</span></Divider> 
 </div>

 <div style={{marginLeft:340,marginTop:20}}>
 <span > {std+" "+stt} </span> <span style={{marginLeft:50}} >To</span> <span style={{marginLeft:60}}>{etd+" "+ett} </span>
 </div>
 <div style={{marginLeft:340,marginTop:20}}>
         <span style={{marginLeft:150}}> {bookingDetails.duration} </span>
 </div>

 <div style={{marginLeft:390,marginTop:80}}>
    <span style={{marginLeft:120,cursor:'pointer',fontWeight:700}}> {selectedCity} : </span>
    <span onClick={handleCity} style={{marginLeft:10,fontWeight:580,fontSize:18,cursor:'pointer',fontFamily:'Poppins'}}>Chage City</span>
 </div>
 <div style={{marginLeft:310,marginTop:10}}>
  <span style={{marginLeft:50,fontWeight:700}}>Pricing Plan: Includes 616 kms, excludes fuel</span>
 <span onClick={handlePlan} style={{marginLeft:10,cursor:'pointer',fontFamily:'Poppins',fontWeight:580,fontSize:18}}>Change Plan</span>
 </div>

 </Paper>
</div>
<Paper style={{background:"#95a5a6",width:'65%',height:'40%',marginTop:270,marginLeft:-1280}}>
 <Divider style={{fontSize:25}}> <span style={{display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:20,marginTop:10}}>IMPORTANT POINTS TO REMEMBER </span> </Divider>
   <div style={{flexDirection:'column',marginLeft:20}}>
     <table>
       <tr>
          <td style={{fontWeight:550,fontSize:11,width:150,paddingTop:20}}>
             CHANGE IN PRICING PLAN:
          </td>
          <td style={{fontWeight:400,fontSize:12,paddingLeft:50}}>
            The pricing plan (11 kms/hr, without fuel) cannot be changed after the booking is made
          </td>
        </tr><br/>  
                                
       <tr>
         <td style={{fontWeight:550,fontSize:11}}>
          FUEL:
         </td>
        <td style={{fontWeight:400,fontSize:12,paddingLeft:50}}>
          In case you are returning the car at a lower fuel level than what was received, we will charge a flat Rs 500 refuelling service charge + actual fuel cost to get the tank to the same level as what was received
        </td>
       </tr><br/> 
       <tr>
        <td style={{fontWeight:550,fontSize:11,width:190}}>
          TOLLS, PARKING, INTER-STATE TAXES:
        </td>   
        <td style={{fontWeight:400,fontSize:12,paddingLeft:50}}>
          To be paid by you.
        </td>
      </tr><br/>  
                                
      <tr>
       <td style={{fontWeight:550,fontSize:11}}>
          ID VERIFICATION:
       </td>   
       <td style={{fontWeight:400,fontSize:12,paddingLeft:50}}>
          Please keep your original Driving License handy. While delivering the car to you, our executive will verify your original Driving License and ID proof (same as the ones whose details were provided while making the booking). This verification is mandatory. In the unfortunate case where you cannot show these documents, we will not be able to handover the car to you, and it will be treated as a late cancellation (100% of the fare would be payable). Driving license printed on A4 sheet of paper (original or otherwise) will not be considered as a valid document.
       </td>
      </tr><br/>  
                                
      <tr>
       <td style={{fontWeight:550,fontSize:11}}>
         PRE-HANDOVER INSPECTION:
       </td>   
       <td style={{fontWeight:400,fontSize:12,paddingLeft:50}}>
          Please inspect the car (including the fuel gauge and odometer) thoroughly before approving the checklist.
       </td>
      </tr> <br/> 
</table>
                    </div>          
 </Paper>  

 
                
<Paper style={{ background:"#95a5a6",width:'33%',marginLeft:'20px',marginTop:'3px'}}>
   <Divider style={{position:'relative',top:18 ,}} ><span style={{fontWeight:700,fontSize:20}}>FARE DETAILS</span></Divider>
        <table style={{marginLeft:20,marginTop:30}}>
           <tr>
             <td style={{paddingTop:10}}>
                Base fare
              </td>
              <td style={{paddingLeft:60,paddingTop:10}}>
                &#8377; {vehicledetails.rent}  
              </td>
             </tr>  

             <tr>
               <td style={{paddingTop:10}}>
                Doorstep delivery & pickup
               </td>
               <td  style={{paddingLeft:60,paddingTop:10}}>
                &#8377; <span>{pickUp}  </span> 
               </td>
             </tr>  
             <tr>
                <td style={{paddingTop:10}}>
                  Insurance & GST
                </td>
                <td style={{paddingLeft:60,paddingTop:10}}>
                  Included
                </td>
              </tr>  
              <tr>
                <td style={{paddingTop:10}}>
                   Refundable security deposit
                </td>
                <td style={{paddingLeft:60,paddingTop:10}}>
                  &#8377; {seDeposit}
                </td>
                </tr><br/>
        </table>
                
<span style={{position:'relative',left:25,top:20}}><TextField variant={"standard"} label="Promo Code" /> <Button variant="contained" style={{background:'linear-gradient(270deg,#1caba2,20%,#1c7fab)',marginLeft:250,marginTop:-55}}>APPLY</Button></span><br/>
  <Divider style={{position:'relative',top:40}}></Divider><br/>
   <div style={{position:'relative',left:40,top:40}}>Total <span style={{marginLeft:210}}>&#8377; {total} </span></div><br/>
  <Divider style={{position:'relative',top:40,}}></Divider><br/>

        <table style={{marginLeft:20,marginTop:25}}>
          <tr>
             <td style={{paddingTop:10}}>
                Kms limit
             </td>
             <td style={{paddingLeft:60,paddingTop:10}}>
                520 kms
             </td>
           </tr> 

           <tr>
            <td style={{paddingTop:10}}>
              Fuel
            </td>
            <td  style={{paddingLeft:60,paddingTop:10}}>
               Excluded
             </td>
            </tr> 
            <tr>
              <td style={{paddingTop:10}}>
                Extra kms charge
              </td>
              <td style={{paddingLeft:60,paddingTop:10}}>
                &#8377; 9/km
              </td>
             </tr> 
             <tr>
                <td style={{paddingTop:10}}>
                  Tolls, Parking & Inter-state taxes
                </td>
                <td style={{paddingLeft:60,paddingTop:10}}>
                 To be paid by you
                </td>
               </tr><br/>
        </table>

     <div onClick={()=>navigate("/paymentgateway")} style={{display:'flex',justifyContent:'center'}}><Button   variant="contained" style={{background:'linear-gradient(280deg,#e67e22,20%,#d35400,#f39c12)',width:'50%'}} >Proceed</Button></div>

</Paper>
                    
</div>
{cityDialog()}
</div>)
}