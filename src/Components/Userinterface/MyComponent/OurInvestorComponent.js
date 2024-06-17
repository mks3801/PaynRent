import { Paper } from "@mui/material";
import { useState, useEffect } from "react";

export default function OurInvestorComponent(props) {
    return (

        <div >
            <div style={{fontWeight:'bold',fontSize:28,padding:5,}} >Our Investor</div>
            <Paper style={{ display:'flex', width:'93%',borderRadius:15}}>
                <div style={{ position:'relative',left:'2%', width: '20%', height: '100%', }}>
                    <div style={{ width: '100%', height: '100%', padding: '0.5%' }}>
                        <img src="/car/hyundai.webP" style={{ width: 180 }} />

                    </div>
                    <div style={{ position: 'relative',top:'-15px', bottom: '30px', left: '10px' }}>
                        Hyundai Motor Company
                    </div>
                </div>

                <div style={{ position:'relative',left:'12%',width: '20%', height: '100%', }}>
                    <div style={{ width: '100%', height: '100%', padding: '0.5%' }}>
                        <img src="/car/edelweissFinancialServices.webP" style={{ width: 180 }} />

                    </div>
                    <div style={{position:'relative',left:'10px',top:'-15px', bottom: '30px',  }}>
                        Edelweiss Financial Services
                    </div>
                </div>

                <div style={{position:'relative',left:'20%', width: '100%', height: '100%', }}>
                    <div style={{ width: '100%', height: '100%', padding: '0.5%' }}>
                        <img src="/car/dreamIncubator.webP" style={{ width: 180 }} />

                    </div>
                    <div style={{ position: 'relative', bottom: '30px', left: '35px',top:'-15px' }}>
                        Dream Incubator
                    </div>
                </div>

                <div style={{ position:'relative',left:'14%', width: '100%', height: '100%', }}>
                    <div style={{ width: '100%', height: '100%', padding: '0.5%' }}>
                        <img src="/car/beenext.webP" style={{ width: 180 }} />

                    </div>
                    <div style={{ position: 'relative', bottom: '30px', left: '60px',top:'-15px'}}>
                        Beenext
                    </div>
                </div>
            </Paper>
        </div>



    )
}