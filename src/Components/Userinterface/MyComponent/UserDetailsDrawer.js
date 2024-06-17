import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Grid,TextField,Button } from '@mui/material';
import { postData } from '../../Services/FetchNodeServices';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';

export default function UserDetailsDrawer(props) {
 
const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [mobile,setMobile]=React.useState('')
  const [fullName,setFullName]=React.useState('')
  const [emailid,setEmail]=React.useState('')
  const [dob,setDOB]=React.useState('')
  const [aadhar,setAadhar]=React.useState('')
  const [licence,setLicence]=React.useState('')
  const [btnMsg,setBtnMsg]=React.useState("Login")
  const [btnStatus,setBtnStatus]=React.useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const user = useSelector(state => state.userdetails)
  const userdetails = Object.values(user)[0]

  React.useEffect(function(){
          setState({ ...state, ['right']: props.status });
  },[props])

  

  const toggleDrawer =(anchor, open) => (event) => 
     {
      if (
        event.type === 'keydown' &&(event .key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
      props.handleStatus(open)
      props.handleClose(false)
      setState({ ...state, ['right']: props.status });
    };

    const fetchUserDetails=async()=>{
      var result=await postData("user/check_user_mobileno",{mobileno:props.mobile})
       dispatch({type:"ADD_USER",payload:[props.mobile,result.data]})
     }

     const fetchAllUserDetails=async()=>{
      var result=await postData("user/check_user_fullname",{fullname:fullName})
       console.log(JSON.stringify(result))
     }
   
   
  const handleSubmitUser=async()=>{
    var body={mobileno:props.mobile,fullname:fullName,emailid:emailid,birthdate:dob,aadharno:aadhar,licenceno:licence}
    dispatch({type:"ADD_USER",payload:[body]})
    var response= await postData("user/userdetails_submit",body)
    if(response.status)
    {
      alert("Successfully Registrated..... ")
      setState({ ...state, ['right']: false });
      fetchUserDetails()
      fetchAllUserDetails()
      setBtnMsg()
      setBtnStatus(true)
      //navigate("/vehicledetails")
    }
    else
    {
      alert("Registration Failed....")
    }
  }

  const list = (anchor) => (
    <Grid container spacing={2} style={{width:440,padding:30}}>
       <Grid item xs={12}>
       <img src='/car/Logo1.png' style={{width:80,height:50}}/>
       </Grid>
       <Grid item xs={12}>
          <span style={{display:'flex',justifyContent:'center',fontFamily:'Poppins',fontSize:20,fontWeight:700}}>Sign Up</span>
       </Grid>
       <Grid item xs={12}>
         <TextField onChange={(event)=>setMobile(event.target.value)} value={props.mobile} label="Mobile Number" fullWidth variant='outlined' />
       </Grid>
       <Grid item xs={12}>
         <TextField value={fullName} onChange={(event)=>setFullName(event.target.value)}  label="Full Name" fullWidth variant='outlined' />
       </Grid>
       <Grid item xs={12}>
         <TextField onChange={(event)=>setEmail(event.target.value)}   label="EmailId" fullWidth variant='outlined' />
       </Grid>
       <Grid item xs={12}>
         <TextField  onChange={(event)=>setDOB(event.target.value)} label="Birth Date" fullWidth variant='outlined' />
       </Grid>
       <Grid item xs={12}>
         <TextField onChange={(event)=>setAadhar(event.target.value)}   label="Aadhar Number" fullWidth variant='outlined' />
       </Grid>
       <Grid item xs={12}>
         <TextField onChange={(event)=>setLicence(event.target.value)}   label="Licence Number" fullWidth variant='outlined' />
       </Grid>
       <Grid item xs={12}>
          <Button onClick={handleSubmitUser} variant='contained'style={{display:'flex',justifyContent:'center', background: 'linear-gradient(280deg,#e67e22,20%,#d35400,#f39c12)' }} fullWidth>Proceed</Button>
       </Grid>
       
    </Grid>
  );

  return (
    <div>
      
        <React.Fragment key={'right'}>
          
          <Drawer
            anchor={'right'}
            open={state.right}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
        </React.Fragment>
    </div>
  
  );
  
}
