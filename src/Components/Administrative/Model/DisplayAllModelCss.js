import { makeStyles } from "@mui/styles";
export const useStyle=makeStyles({

mainContainer:{

width:'100vw',
height:'100vh',
paddingLeft:'5%',
background:'#fff'

},

box:{

width:'75%',
height:'90%',
background:'#fff',
borderRadius:10,
padding:10,
},

dialogContainer:{
width:'44vw',
height:'70vh',
background:'#fff'
},

dialogBox:{
height:'100%',
width:'100%',
background:'white',
borderRadius:10,
padding:10,
                  },

headingText:{

fontWidth:24,
fontWeight:'bold',
letterSpacing:1,
paddingTop:5,
paddingBottom:5,
 

},

alignCenter:{
display:'flex',
justifyContent:'center',
alignItems:'center',
                  
},
photoCenter:{
                 
display:'flex',
justifyContent:'center',
alignItems:'center',
flexDirection:'row'
}
              

})