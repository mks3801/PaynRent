import { Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import VehicleComponent from "./VehicleComponent";
import { getData } from "../../Services/FetchNodeServices";
import Header from "./Header"
import Header1 from "./Header1"
import Filter from "./Filter";

export default function VehicleDetails(props){

const [vehicleList, setVehicleList] = useState([])
const [temvehicleList, setTemVehicleList] = useState([])
       
 const fetchAllVehicle = async () => {
  var result = await getData('user/display_all_vehicle')
  setVehicleList(result.data)
  setTemVehicleList(result.data)
   }
       
  useEffect(function () {
  fetchAllVehicle()
  }, [])

  const segmentFilter = (ids) => {
   var models = Object.values(ids?.segment ? ids.segment : {})
   var brand = Object.values(ids?.brand ? ids.brand : {})
   var fuelType=Object.values(ids?.fuel? ids.fuel:{})
   var transmission=Object.values(ids?.transmission? ids.transmission:{})
   var capacity=Object.values(ids?.capacity? ids.capacity:{})
   var i
///////////////////  Segment  /////////////////////////
var segment_str = " "
  if (models.length > 0) {
   for (i = 0; i < models.length; i++) {
   segment_str = segment_str + "item.subcategoryid===" + models[i] + " || "
   }
    segment_str = segment_str.substring(0, segment_str.lastIndexOf('||')-1)
  }
///////////////////  Brand  /////////////////////////
  var brand_str = " "
  if (brand.length > 0) {
  for (i = 0; i < brand.length; i++) {
  brand_str = brand_str + "item.companyname==='" + brand[i] + "' || "
  }
  brand_str = brand_str.substring(0, brand_str.lastIndexOf('||')-1 )
  }
///////////////////  Fuel Type  /////////////////////////
  var fuel_str = " "
   if(fuelType.length>0){
    for(i=0;i<fuelType.length;i++){
     fuel_str = fuel_str + "item.fueltype==='" + fuelType[i] + "' || "
    }
    fuel_str = fuel_str.substring(0,fuel_str.lastIndexOf("||")-1)
   }
///////////////////  Transmission /////////////////////////
  var transmission_str = " "
   if(transmission.length>0){
    for(i=0;i<transmission.length;i++){
     transmission_str = transmission_str + "item.transmission==='" + transmission[i] + "' || "
     }
   transmission_str = transmission_str.substring(0,transmission_str.lastIndexOf("||")-1)
 }
///////////////////  Seating Capacity /////////////////////////
  var capacity_str = " "
   if(capacity.length>0){
    for(i=0;i<capacity.length;i++){
     capacity_str = capacity_str + "item.capacity==='" + capacity[i] + "' || "
   }
  capacity_str = capacity_str.substring(0,capacity_str.lastIndexOf("||")-1)
 }
///////////////////  Final Query  /////////////////////////
var final_query =" "
          
  if (segment_str != " ") {
   final_query = final_query + segment_str + " && "
  }
  if (brand_str != " ") {
   final_query = final_query + brand_str + " && "
  }
  if(fuel_str != " "){
  final_query = final_query + fuel_str + " && "
  }
    
  if(transmission_str != " "){
   final_query = final_query + transmission_str + " && "
 }
             
  if(capacity_str != " ")
   {
    final_query = final_query + capacity_str + " && "
   }
    
  if(capacity_str === " ")
  {
    final_query = final_query.substring(0, final_query.lastIndexOf('&&')-1)
  } 
  else if(transmission_str === " ")
   {
     final_query = final_query.substring(0, final_query.lastIndexOf('&&')-1 )
   }
    
   else if(fuel_str === " ")
  {
   final_query = final_query.substring(0, final_query.lastIndexOf('&&')-1 )
  }
   else if(brand_str === " ") {
   final_query = final_query.substring(0, final_query.lastIndexOf('&&')-1 )
   }
  else
  {
    final_query = final_query.substring(0, final_query.lastIndexOf('&&')-1 )
  }
 var temp = temvehicleList.filter((item) => {
    return eval(final_query)
    })
    setVehicleList(temp)
}

const filterOperation = (parameter) => {
   segmentFilter(parameter)       
}

  const listOfVehicle = () => {
    return vehicleList.map((item) => {
    return (<div style={{ margin: 5 }}>
     <VehicleComponent item={item} />
    </div>)
   })
 }
 return(<div style={{ display: 'flex', flexDirection: 'column', background: '#dfe6e9', height: 1500 }}>
  
<div> 
   <Header />
</div>

<div>
   <Header1 />
</div>

<div>
  <Grid container spacing={1}>
    <Grid item xs={2} style={{ display: 'flex', flexDirection: 'column', background: 'white', height: 1550, marginTop: 8.4, borderTopRightRadius: 10, marginLeft: 10, paddingLeft: 30 }}>
     <Filter filterOperation={filterOperation} />
    </Grid>

   <Grid item xs={9} style={{ margin: 20, display: 'flex', flexWrap: 'wrap', paddingBottom: 870 }}>
    {listOfVehicle()}
   </Grid>
 </Grid>
      </div>
 
 </div>)
}