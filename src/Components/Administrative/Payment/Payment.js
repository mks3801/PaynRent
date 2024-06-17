import { useState,useEffect } from "react";
import {Grid,TextField,Button} from "@mui/material"
import { useStyles } from "./PaymentCss";
import { postData } from "../../Services/FetchNodeServices";

export default function Payment(props){

const classes = useStyles()
const [firstName,setFirstName]=useState('')
const [lastName,setLastName]=useState('')
const [email,setEmail]=useState('')
const [phoneNumber,setPhoneNumber]=useState('')
const [orderNumber,setOrderNumber]=useState('')
const [totalamt,setTotalAmt]=useState('')
const [description,setDescription]=useState('')
const [discountAmt,setDiscountAmt]=useState('')
const [taxAmt,setTaxAmt]=useState('')
const [unitPrice,setUnitPrice]=useState('')
const [shippingPrice,setShippingPrice]=useState('')
const [currency,setCurrency]=useState('')

const handleSubmit=async()=>{
 var body={firstname:firstName,lastname:lastName}
  var response = await postData("payment/order_submit",body)
  alert(response.status) 
}

return(<div className={classes.mainContainer}>
          <div className={classes.box}>
            <Grid container spacing={2}>
              <Grid item xs={12} className={classes.headingStyles}>
                    Payment Interface
              </Grid>
              <Grid item xs={4}  >
                <TextField onChange={(event)=>setFirstName(event.target.value)} label="First Name" fullWidth/>
              </Grid>

              <Grid item xs={4}  >
                <TextField onChange={(event)=>setLastName(event.target.value)} label="Last Name" fullWidth/>
              </Grid>

              <Grid item xs={4}  >
                <TextField onChange={(event)=>setEmail(event.target.value)} label="Email Address" fullWidth/>
              </Grid>

              <Grid item xs={4}  >
                <TextField onChange={(event)=>setPhoneNumber(event.target.value)} label="Phone Number" fullWidth/>
              </Grid>

              <Grid item xs={4}  >
                <TextField onChange={(event)=>setOrderNumber(event.target.value)} label="Order Number" fullWidth/>
              </Grid>

              <Grid item xs={4}  >
                <TextField onChange={(event)=>setTotalAmt(event.target.value)} label="Total Amount" fullWidth/>
              </Grid>

              <Grid item xs={4}  >
                <TextField onChange={(event)=>setDescription(event.target.value)} label="Description" fullWidth/>
              </Grid>

              <Grid item xs={4}  >
                <TextField onChange={(event)=>setDiscountAmt(event.target.value)} label="Discount Amount" fullWidth/>
              </Grid>

              <Grid item xs={4}  >
                <TextField onChange={(event)=>setTaxAmt(event.target.value)} label="Tax Amount" fullWidth/>
              </Grid>

              <Grid item xs={4}  >
                <TextField onChange={(event)=>setUnitPrice(event.target.value)} label="Unit Price" fullWidth/>
              </Grid>
              
              <Grid item xs={4}  >
                <TextField onChange={(event)=>setShippingPrice(event.target.value)} label="Shipping Price" fullWidth/>
              </Grid>

              <Grid item xs={4}  >
                <TextField onChange={(event)=>setCurrency(event.target.value)} label="Currency" fullWidth/>
              </Grid>
              <Grid item xs={12}  >
              <Button variant="contained" color="success" onClick={handleSubmit} fullWidth>
                  Submit
                 </Button>
              </Grid>
             </Grid>       
          </div>

</div>)
}