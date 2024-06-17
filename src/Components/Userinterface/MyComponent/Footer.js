import { Paper } from "@mui/material";
import React from "react";

export default function Footer(props){

return(
  <div>
        <Paper elevation={3} style={{width:'93%',borderRadius:10}}>
     
        <div style={{marginLeft:50,}}>
             <img src="/car/Logo4.png" style={{width:150,height:80,marginTop:50}} />
          </div>
        <div style={{display:'flex',justifyContent:'center',marginTop:-100,paddingBottom:80}}>
          <span style={{marginTop:40,fontWeight:700}}>Home</span>
          <span style={{marginTop:80,marginLeft:-44,fontWeight:700}}>Faq</span>
          <span style={{marginTop:120,marginLeft:-28,fontWeight:700}}>Policy</span>
          <span style={{marginTop:160,marginLeft:-44,fontWeight:700}}>Blog</span>
           
       </div>

        
         
   
        </Paper>
  </div>
)
}