import { Paper } from "@mui/material";

export default function OurJourney(props){
   return(
       <div>
           <div style={{fontWeight:'bold',fontSize:28,padding:10}}>Our Journey</div>
           <Paper style={{display:'flex',width:'93%',borderRadius:15,height:250}}>
               <div style={{position:'relative',left:'8%',top:'25%',width:'20%',padding:5}}>
                   <div style={{width:'100%',padding:0.5}}>
                      <img src="/car/happy.png" style={{width:60}}/>
                   </div>
                   <div style={{fontWeight:'bolder',fontSize:24,position:'relative',left:'-5%'}}>
                       1 MN +
                   </div>
                   <div style={{fontWeight:550,position:'relative',left:'-10%' }}>
                       Happy Revvers
                   </div>

               </div>

               <div style={{position:'relative',left:'12%',top:'25%',width:'20%',padding:5}}>
                   <div style={{width:'100%',padding:0.5}}>
                      <img src="/car/accross.png" style={{width:60}}/>
                   </div>
                   <div style={{fontWeight:'bolder',fontSize:24,position:'relative',left:'-7%'}}>
                   22 Cities +
                   </div>
                   <div style={{fontWeight:550,position:'relative',left:'-5%' }}>
                   Across India
                   </div>

               </div>

               <div style={{position:'relative',left:'20%',top:'25%',width:'20%',padding:5}}>
                   <div style={{width:'100%',padding:0.5}}>
                      <img src="/car/travel.png" style={{width:60}}/>
                   </div>
                   <div style={{fontWeight:'bolder',fontSize:24,position:'relative',left:'-5%'}}>
                      50 MN +
                   </div>
                   <div style={{fontWeight:550,position:'relative',left:'-7%' }}>
                     Kms Travelled
                   </div>
                   </div>

                   <div style={{position:'relative',left:'25%',top:'25%',width:'20%',padding:5}}>
                   <div style={{width:'100%',padding:0.5}}>
                      <img src="/car/review.png" style={{width:60}}/>
                   </div>
                   <div style={{fontWeight:'bolder',fontSize:24}}>
                      4.8/5
                   </div>
                   <div style={{fontWeight:550,position:'relative',left:'-5%' }}>
                       20k+ Review
                   </div>

               </div>




           </Paper>
       </div>
   )
}