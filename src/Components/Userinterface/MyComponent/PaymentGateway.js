import React, { Component, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
 import { postData, ServerURL } from '../../Services/FetchNodeServices'
import { useNavigate } from "react-router";
import { Swal} from "sweetalert2";

import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  margin: {
    marginRight: "80%",
    paddingLeft: "",
  },
  button: {
    margin: theme.spacing.unit,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

export default function PaymentGateway (props){

  const [loading,setLoading] = useState(true)

  const ss=useSelector((state)=>state.vehicle)
  const vehicledetails=Object.values(ss)[0]

  console.log("vehicle",vehicledetails)
  const userdetail=useSelector((state=>state.userdetails))
  const useDetails=Object.values(userdetail)[0]
  console.log("username",useDetails)
  
  var pickUp=400
  var seDeposit=5000
  var total=pickUp+seDeposit

  const gotoRazorpay=()=>{
    return(
      
    <div> {openPayModal()}</div>
   
 
    )
  }

  const openPayModal =async () => {
    var rzp1 = new window.Razorpay(options);
    await rzp1.open()
   setLoading(!loading)
    
  }
 
  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: total*100, //  = INR 1
    currency:'INR',
    name: "PayNRent",
    description: 'Test Transcation',
    image:
      `${ServerURL}/images/Logo1.png`,
    handler: function (response) {
        
     
      alert(response.razorpay_payment_id)
      
       window.location.href= `/home`
 },
prefill: {
name: useDetails.fullname,
contact: useDetails.mobileno,
email: useDetails.emailid
    },
notes: {
      address: "some address",
},
theme: {
      color: "blue",
     
},
  };
 
  return (
    <>
  
       {gotoRazorpay()}

    </>
  );
};

 
