import { Paper } from "@mui/material";

export default function PlayStore(props){
    return(
        <div>
            <div style={{padding:15}}></div>
            <Paper style={{display:'flex',width:'90%',padding:20,borderRadius:15, }}>
                <div style={{fontWeight:'bold',fontSize:24,color:'gray',position:'relative',left:'10%',top:'30%'}}>
                    Download the PaynRent App
                    <div style={{position:'relative', top:'20%',left:'-10%'}}>
                        <img src="/car/app_store.png" style={{width:200}}/>
                        <span style={{position:'relative', top:'10%'}}>
                    <img src="/car/google_play.png" style={{width:200}}/>
                    </span>
                    </div>
                    </div>
                    <div  style={{position:'relative',left:'30%'}}>
                    <img src="/car/mobile.png" style={{width:350}}/> 
                    </div>
            </Paper>
        </div>
    )
}