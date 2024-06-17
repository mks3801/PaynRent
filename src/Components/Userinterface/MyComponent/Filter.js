import { useState, useEffect } from 'react';
import { ServerURL, getData } from '../../Services/FetchNodeServices';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
 
export default function Filter(props) {
  
  const [selectedSegment,setSelectedSegment]=useState({})
  const [selectedBrand,setSelectedBrand]=useState({})
  const [selectedFuelType,setSelectedFuelType]=useState({})
  const [selectedTransmission,setSelectedTransmission]=useState({})
  const [selectedCapacity,setSelectedCapacity]=useState({})
  const [filterList,setFilterList]=useState({})
  const [segment, setSegment] = useState([])
  const [brand, setBrands] = useState([])
 
///////////  Segment ///////////////////
 const fetchAllSegment=async()=>{
  var result = await getData('user/display_all_subcategory')
  setSegment(result.data)
 }
useEffect(function(){
  fetchAllSegment()
},[])

const listSegment = () => {
  return segment.map((item) => {
    return (<div>
      <FormControlLabel onChange={handleSegmentChange} control={<Checkbox value={item.subcategoryid}/>} label=<span style={{fontFamily:'Poppins'}}>{item.subcategoryname}</span> />
    </div>)
  })
}
///////////////////////  Company //////////////////////////////

const fetchAllCompany=async()=>{
  var result=await getData('user/display_all_brand')
  setBrands(result.data)
}
useEffect(function(){
  fetchAllCompany()
},[])

const listAllCompany=()=>{
  return brand.map((item)=>{
    return(<div>
         <FormControlLabel onChange={handleBrandChange} control={<Checkbox value={item.companyname}/>} label=<span style={{fontFamily:'Poppins'}}>{item.companyname}</span> />
    </div>)
  })
}
///////////////////////  All Filter Change //////////////////////////////

const handleSegmentChange=(event)=>{
  var segment=selectedSegment
  if(event.target.checked)
    segment[event.target.value]=event.target.value
    else
    delete segment[event.target.value]
    setSelectedSegment(segment)
    
  var filter=filterList
      filter={...filter,'segment':segment}
      setFilterList(filter)
      props.filterOperation(filter)
}

const handleBrandChange=(event)=>{
  var brand=selectedBrand
  if(event.target.checked)
    brand[event.target.value]=event.target.value
    else
    delete brand[event.target.value]
    setSelectedBrand(brand)
    
  var filter=filterList
      filter={...filter,'brand':brand}
      setFilterList(filter)
      props.filterOperation(filter)
}

const handleFueltypeChange=(event)=>{
  var fuel=selectedFuelType
  if(event.target.checked)
    fuel[event.target.value]=event.target.value
    else
    delete fuel[event.target.value]
    setSelectedFuelType(fuel)
    
  var filter=filterList
      filter={...filter,'fuel':fuel}
      setFilterList(filter)
      props.filterOperation(filter)
}

const handleTransmissionChange=(event)=>{
  var transmission=selectedTransmission
  if(event.target.checked)
    transmission[event.target.value]=event.target.value
    else
    delete transmission[event.target.value]
    setSelectedTransmission(transmission)
    
  var filter=filterList
      filter={...filter,'transmission':transmission}
      setFilterList(filter)
      props.filterOperation(filter)
}

const handleCapacityChange=(event)=>{
   var capacity=selectedCapacity
   if(event.target.checked)
    capacity[event.target.value]=event.target.value
    else
    delete capacity[event.target.value]
    setSelectedCapacity(capacity)
    
  var filter=filterList
      filter={...filter,'capacity':capacity}
      setFilterList(filter)
      props.filterOperation(filter)
  if(event.target.unchecked)
  {
    capacity[event.target.value]=event.target.value
  }
}


return(
   <div style={{ background:'white',paddingLeft:25,paddingRight:20,marginTop:0,marginRight:5 ,borderRadius:5}}>
      <div style={{ fontWeight: 'bold', fontSize: 20, }}>FILTER
   </div>
      
      <div style={{ marginTop: 15 }}>
        <div style={{ fontWeight:500, fontSize: 18 }}>Segment</div><br />
        <div>{listSegment()  }</div>

        <div style={{ marginTop: 15 }}>
        <div style={{ fontWeight: 500, fontSize: 18 }}>Company</div><br />
           {listAllCompany() } 
        </div>
        
        <div style={{marginTop:15}}>
        <div style={{ fontWeight: 500, fontSize: 18 }}>Fuel Type</div><br />

        <FormControlLabel control={<Checkbox value="Petrol" onChange={handleFueltypeChange} />}  label=<span style={{fontFamily:'Poppins'}}>Petrol </span> /><br/>
        <FormControlLabel control={<Checkbox value="Desiel" onChange={handleFueltypeChange}  />} label=<span style={{fontFamily:'Poppins'}}>Desiel </span>/><br/>
        <FormControlLabel control={<Checkbox value="Electric" onChange={handleFueltypeChange}  />} label=<span style={{fontFamily:'Poppins'}}>Electric </span>/><br/>
        <FormControlLabel control={<Checkbox value="CNG" onChange={handleFueltypeChange} />} label=<span style={{fontFamily:'Poppins'}}>CNG </span>/>
      </div>
      </div>

      <div style={{ marginTop: 15 }}>
        <div style={{ fontWeight: 500, fontSize: 18, marginTop: 20 }}>Transmission Type</div><br />

        <FormControlLabel control={<Checkbox value="Manual" onChange={handleTransmissionChange} />} label=<span style={{fontFamily:'Poppins'}}>Manual </span>/><br/>
        <FormControlLabel control={<Checkbox value="Automatic" onChange={handleTransmissionChange} />} label=<span style={{fontFamily:'Poppins'}}>Automatic </span>/><br/>
      </div>

      <div style={{ marginTop: 15 }}>
        <div style={{ fontWeight: 500, fontSize: 18 }}>Seating Capacity</div><br />
        <FormControlLabel control={<Checkbox value="4" onChange={handleCapacityChange} />} label=<span style={{fontFamily:'Poppins'}}>4 Seater </span>/><br/>
        <FormControlLabel control={<Checkbox value="5" onChange={handleCapacityChange}/>} label=<span style={{fontFamily:'Poppins'}}>5 Seater </span>/><br/>
        <FormControlLabel control={<Checkbox value="7" onChange={handleCapacityChange} />} label=<span style={{fontFamily:'Poppins'}}>7 Seater </span>/><br/>
        <FormControlLabel control={<Checkbox value="8" onChange={handleCapacityChange}/>} label=<span style={{fontFamily:'Poppins'}}>8 Seater</span>/><br/>
      </div>
  </div>)
}