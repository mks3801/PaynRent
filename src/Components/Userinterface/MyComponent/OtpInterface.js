import React, { useEffect } from "react";
import { useState } from "react";
import {Button, Grid,TextField} from "@mui/material"
import UserDetailsDrawer from "./UserDetailsDrawer";
import { getData,postData } from "../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function OtpInterface(props){

const [textOne,setTextOne]=useState('')
const [textTwo,setTextTwo]=useState('')
const [textThree,setTextThree]=useState('')
const [textFour,setTextFour]=useState('')
const [seconds,setSeconds]=useState(true)
const [time,setTime]=useState(10)
const [refresh,setRefresh]=useState(false)
const [inputOtp,setInputOtp]=useState('')
const [status,setStatus]=useState(false)
const [login,setLogin]=useState("Login/SignUp")
const [userDetails,setUserDetails]=useState([])
const [userInfo,setUserInfo]=useState({})
const [signup,setSignup]=useState("Login/SignUp")
const navigate=useNavigate()
const dispatch=useDispatch()

const handleOneChange=(event)=>{
 if(event.target.value.length>=1)
 {setTextOne(event.target.value)
   document.getElementById('t2').focus()
 }
}

const handleTwoChange=(event)=>{
 if(event.target.value.length>=1)
   {setTextTwo(event.target.value)
    document.getElementById('t3').focus()
 }
}
const handleThreeChange=(event)=>{
  if(event.target.value.length>=1)
   {setTextThree(event.target.value)
     document.getElementById('t4').focus()
 }
}
const handleFourChange=(event)=>{
  if(event.target.value.length>=1)
   {setTextFour(event.target.value)
    setInputOtp(textOne+textTwo+textThree+event.target.value)
    props.onChange(textOne+textTwo+textThree+event.target.value) 
  }

}
var interval
const myTimer=()=>{
  if(seconds)
  {
    var t=time
     interval=setInterval(()=>{
      if(t>=1){
       t=t-1
       setTime(t)
      }
      else
      {
        clearInterval(interval)
        setSeconds(false)
      }
      },1000)
      setRefresh(!refresh)
    }
  }
const fetchUserDetails=async()=>{
 var result=await postData("user/check_user_mobileno",{mobileno:props.mobile})
 setUserDetails(result)
 }

useEffect(function(){
  myTimer()
  fetchUserDetails()
},[])

const fetchUserInfo=async()=>{
  var result=await postData("user/check_user_username")
  setUserInfo(result)
  }
 
 useEffect(function(){
   fetchUserInfo()
 },[])
 

const handleVerifyOtp=()=>{
 if(props.getOtp==props.generatedOtp)
  {
   
    if(userDetails.status)
    {  
      dispatch({type:"ADD_USER",payload:[props.mobile,userDetails.data,userDetails.fullname]})
      localStorage.setItem("userDetails",JSON.stringify(userDetails.data))
      props.handleClose(false)
      //navigate("/vehicledetails")
      if(props.user==true)
      {
        window.location.reload()
      }
      if(props.open==true)
      {
        navigate('/vehicledetails')
      }
    }
    else
    {
      setStatus(true)
      
    }
    
  }

  else{
  alert("Not Verified")
  }
}
const handleStatus=()=>{
 
  setStatus(false)
}



return(<div>
          <Grid container spacing={3} style={{width:300,padding:20,marginLeft:30 }}>
             <Grid item xs={3} >
               <TextField id="t1" InputProps={{style:{fontWeight:900}}} onChange={handleOneChange} />
             </Grid>
             <Grid item xs={3}>
               <TextField id="t2" InputProps={{style:{fontWeight:900}}} onChange={handleTwoChange} />
             </Grid>
             <Grid item xs={3}>
               <TextField id="t3" InputProps={{style:{fontWeight:900}}} onChange={handleThreeChange} />
             </Grid>
             <Grid item xs={3}>
               <TextField id="t4" InputProps={{style:{fontWeight:900}}} onChange={handleFourChange} />
             </Grid>
             <Grid item xs={12}>
               {seconds?<div> waiting otp....{time}</div>: <div style={{cursor:'pointer'}} onClick={props.GenerateOtp}>Resend Otp</div>}
             </Grid>
             
             <Grid item xs={12}>
              <Button onClick={handleVerifyOtp} variant="contained" color="inherit" fullWidth>Verify Otp</Button>
             </Grid>
              

          </Grid>
          <UserDetailsDrawer handleClose={props.handleClose} mobile={props.mobile} status={status} handleStatus={handleStatus} />
         
</div>)
}