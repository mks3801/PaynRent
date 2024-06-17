import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Grid,TextField,Button } from '@mui/material';
import OtpInterface from './OtpInterface';

export default function UserSignupDrawer(props) {
 
 
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [mobile,setMobile]=React.useState('')
  const [btnStatus,setBtnStatus]=React.useState(false)
  const [btnMsg,setBtnMsg]=React.useState("Get An Otp")
  const [getOtp,setOtp]=React.useState('')
  const [generatedOtp,setGeneratedOtp]=React.useState('')
  const [userStatus,setUserStatus]=React.useState(false)

  React.useEffect(function(){
          setState({ ...state, ['right']: props.status });
  },[props])

  const GenerateOtp=()=>{
    if(btnMsg=="Change Mobile Number")
    {
      setBtnStatus(false)
      setBtnMsg("Get An Otp")
      setMobile('')
    }
    else{
    var otp=parseInt(Math.random()*8999)+1000
    alert(otp)
    setBtnMsg("Change Mobile Number")
    setBtnStatus(true)
    setGeneratedOtp(otp)
    }
  }

  const handleClose=()=>{
    setState({ ...state, ['right']: false })
    setUserStatus(false)
  }

  const toggleDrawer =(anchor, open) => (event) => 
     {
      if (
        event.type === 'keydown' &&(event .key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
      props.handleStatus(open)
      setState({ ...state, ['right']: props.status });
    };

  const handleOtpChange=(value)=>{
     setOtp(value)
  }

  const list = (anchor) => (
    <Grid container spacing={2} style={{width:440,padding:30}}>
       <Grid item xs={12}>
       <img src='/car/Logo1.png' style={{width:80,height:50}}/>
       </Grid>
       <Grid item xs={12}>
          <span style={{display:'flex',justifyContent:'center',fontFamily:'Poppins',fontSize:20,fontWeight:700}}>Login</span>
       </Grid>
       <Grid item xs={12}>
         <TextField onChange={(event)=>setMobile(event.target.value)} value={mobile} label="Mobile Number" fullWidth variant='outlined' />
       </Grid>
       <Grid item xs={12}>
          <Button onClick={GenerateOtp} variant='contained'style={{display:'flex',justifyContent:'center', background: 'linear-gradient(280deg,#e67e22,20%,#d35400,#f39c12)' }} fullWidth>{btnMsg}</Button>
       </Grid>
       {btnStatus?
       <Grid item xs={12}>
          <OtpInterface handleClose={handleClose} mobile={mobile} getOtp={getOtp} generatedOtp={generatedOtp} GenerateOtp={GenerateOtp} onChange={handleOtpChange} user={props.user} open={props.open}/>
       </Grid>:<></>}
     
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
