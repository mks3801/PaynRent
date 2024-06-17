import { useState,useEffect,createRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ServerURL } from "../../Services/FetchNodeServices";

export default function FeaturedComponent(props){

var settings = {
 dots: false,
 infinite: true,
 speed: 500,
 slidesToShow: 4,
 slidesToScroll: 1,
 arrows:false
 };

var mySlider=createRef()

var images=props.images

const playSlide=()=>{

return images.map((item)=>{
 return(
     <div>
          <img src={`${ServerURL}/images/${item.image}`} style={{borderRadius:20,width:270,height:150}} />
     </div>
 )
})
}

const handleClickLeft=()=>{
mySlider.current.slickPrev()
}
const handleClickRight=()=>{
    mySlider.current.slickNext()
}

return(
<div style={{marginLeft:'5%'}}>
<div style={{display:'flex',justifyContent:'space-between',paddingTop:15,paddingBottom:15,width:'98%'}}>
    <span style={{fontWeight:'bold',fontSize:24,}}>Featured</span>
    <span><KeyboardArrowLeftIcon style={{fontSize:35}} onClick={handleClickLeft} /> <KeyboardArrowRightIcon style={{fontSize:35}} onClick={handleClickRight}  /></span>
</div>
<Slider ref={mySlider} {...settings}>
   {playSlide()}
</Slider>
</div>
 )
}