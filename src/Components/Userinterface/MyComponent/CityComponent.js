import React, { useEffect } from "react";
import { useState } from "react";
import { getData } from "../../Services/FetchNodeServices";

export default function CityComponent(props){

const [cities,setCities] = useState([])

const fetchAllCities=async()=>{

var result = await getData('user/display_all_city')
setCities(result.data)
}

useEffect(function(){
fetchAllCities()
},[])

const displayAllCities=()=>{
return cities.map((item)=>{
 return(<div >
        <a href="www.gwalior.com" style={{color:'white',textDecorationLine:'none',display:'flex',justifyContent:'left',alignContent:'space-around'}} > Self Drive Car Rental in India {item.cityname}</a>
        </div>)
})
}

return(<div style={{background:'black',color:'white',marginLeft:50,marginTop:40,borderRadius:15,width:'93%',display:'flex',flexDirection:'column',justifyContent:'space-around'}} >
   <span style={{marginLeft:25,marginTop:40,fontWeight:'bold',fontSize:24}}>Serviciable City</span>
  <div style={{columnCount:3,marginLeft:25,marginTop:15,paddingBottom:40}}>
  {displayAllCities()}
  </div>
</div>)
}
