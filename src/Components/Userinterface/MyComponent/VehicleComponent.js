import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { ServerURL } from "../../Services/FetchNodeServices";
import UserSignupDrawer from "./UserSignupDrawer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function VehicleComponent(props) {

  const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem("userDetails")))

  var item = props.item
  var bookingDetails = useSelector(state => state.booking)

  console.log("aa",bookingDetails)

  var [status, setStatus] = useState(false)
  const [open,setOpen] = useState(false)
  
  var dispatch = useDispatch()
  var navigate = useNavigate()
 
const handleBook = (item) => {
    var Rent = (item.rent * (bookingDetails.days * 24)) + (item.rent * (bookingDetails.hrs))
    item['rent'] = Rent
    dispatch({ type: "ADD_VEHICLE", payload: [item.vehicleid, item] })
    if(userInfo)
    {
      setStatus(false)
      navigate('/vehicledetails')
    }
    setStatus(true)
    setOpen(true)
  }

  const handleStatus = () => {
    setStatus(false)
  }

  return (<div style={{ display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 15, width: '85%', height: 265, padding: 10 }}>
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <span style={{ display: 'flex', justifyContent: 'center' }}> <img src={`${ServerURL}/images/${item.icon}`} style={{ width: 140, height: 90 }} /></span>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
      <div style={{ fontWeight: 600, fontSize: 12 }} >{item.companyname}</div>
      <div style={{ fontWeight: 700 }} >{item.modelname}</div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'row', fontFamily: 'Poppins', fontSize: 12, fontWeight: 500, }}>

      <div style={{ position: 'relative', right: 5 }}><img src="/car/iconDiesel.svg" style={{ width: 45, height: 13 }} /><span style={{ fontSize: 15, position: 'relative', bottom: 17, left: 40 }}>{item.fueltype}</span></div>
      <div style={{ position: 'relative', right: 5 }}><img src="/car/iconTransmission.svg" style={{ width: 45, height: 13 }} /><span style={{ fontSize: 15, position: 'relative', bottom: 17, left: 37 }}>{item.transmission}</span></div>
      <div style={{ position: 'relative', right: 8 }}><img src="/car/iconSeat.svg" style={{ width: 45, height: 13 }} /><span style={{ fontSize: 15, position: 'relative', bottom: 17, left: 34 }}>{item.capacity}<span style={{ marginLeft: 5 }}>Seater</span> </span></div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <span style={{ position: 'relative', left: 10, fontSize: 24, fontWeight: 600, fontFamily: 'Poopins' }}>&#8377;</span>
      <span style={{ position: 'relative', left: 17, fontSize: 24, fontWeight: 'bold', fontFamily: 'Poopins' }}>{(item.rent * (bookingDetails.days * 24)) + (item.rent * (bookingDetails.hrs))}</span>
      <span style={{ position: 'relative', left: 80, width: 100 }}> <Button onClick={() => handleBook(item)} variant="contained" style={{ background: 'linear-gradient(280deg,#e67e22,20%,#d35400,#f39c12)' }} fullWidth>Book &gt;</Button></span>
    </div>
    <div style={{ display: 'flex' }}>
      <div style={{ position: 'relative', top: 14, left: 35, fontSize: 12, fontWeight: 600 }}> 671 kms | Prices Exclude fuel cost</div>
    </div>
    <UserSignupDrawer status={status} handleStatus={handleStatus} open ={open} />
  </div>)

}