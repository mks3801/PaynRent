import FeaturedComponent from "./MyComponent/FeaturedComponent"
import { useState,useEffect,createRef } from "react";
import Header from "./MyComponent/Header"
import SearchComponent from "./MyComponent/SearchComponent"
import { getData } from "../Services/FetchNodeServices"
import OfferComponent from "./MyComponent/OfferComponent"
import WhyPnpComponent from "./MyComponent/WhyPnpComponent";
import CityComponent from "./MyComponent/CityComponent";
import OurInvestorComponent from "./MyComponent/OurInvestorComponent";
import OurJourney from "./MyComponent/OurJourney";
import PlayStore from "./MyComponent/PlayStore";
import FaqComponent from "./MyComponent/FaqComponent";
import Footer from "./MyComponent/Footer";


export default function Home(props){
  const [feature,setFeature] = useState([])
  const [offer,setOffer] = useState([])
  const [pnp,setPnp] = useState([])

  const fetchAllFeatute=async()=>{
      var result = await getData('user/display_all_feature')
      setFeature(result.data)
  }
  
  useEffect(function(){
      fetchAllFeatute()
  },[])

const fetchAllOffer=async()=>{
  var result = await getData('user/display_all_offer')
  setOffer(result.data)
}

useEffect(function(){
  fetchAllOffer()
},[])

const fetchAllPnp=async()=>{
  var result = await getData('user/display_all_whypnp')
  setPnp(result.data)
}

useEffect(function(){
  fetchAllPnp()
},[])

return (<div style={{display:'flex',flexDirection:'column',background:'#dfe6e9'}}>
  <Header/>
  
  <div>
  <SearchComponent/>
  </div>

  <div style={{width:'98%',}}>
    <FeaturedComponent images={feature} />
  </div>

  <div style={{width:'98%',}}>
    <OfferComponent images={offer} />
  </div> 

  <div style={{width:'98%',}}>
    <WhyPnpComponent images={pnp} />
  </div> 

  <div style={{display:'flex',justifyContent:'center'}}>
  <div style={{width:'98%',}}>
    <CityComponent />
  </div> 
  </div>

  <div style={{width:'98%',marginLeft:'5%'}}>
    <OurInvestorComponent images={pnp} />
  </div> 

  
  <div style={{width:'98%',marginLeft:'5%'}}>
    <OurJourney   />
  </div> 
 

  <div style={{width:'98%',marginLeft:'5%'}}>
    <PlayStore   />
  </div> 

  <div style={{width:'98%',marginLeft:'5%',padding:10}}>
    <FaqComponent  />
  </div> 

  <div style={{width:'98%',marginLeft:'5%',padding:10}}>
    <Footer  />
  </div> 

</div>)
}