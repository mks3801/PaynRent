import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button,Avatar} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SideBar from './SideBar';
import { Grid } from '@material-ui/core';
import Category from "../Category/Category";
import DisplayAllCategory from "../Category/DisplayAllCategory";
import Subcategory from "../Subcategory/Subcategory";
import DisplayAllSubcategory from "../Subcategory/DisplayAllSubcategory";
import Company from "../Company/Company";
import DisplayAllCompany from "../Company/DisplayAllCompany";
import Model from "../Model/Model";
import DisplayAllModel from "../Model/DisplayAllModel";
import Vehicle from "../Vehicle/Vehicle";
import DisplayAllVehicle from "../Vehicle/DisplayAllVehicle"
import Feature from "../Feature/Feature";
import Offer from "../Offer/Offer"
import DisplayAllOffer from "../Offer/DisplayAllOffer"
import WhyCar from "../WhyCarRental/WhyCar"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PaynRent
          </Typography>
          <Avatar alt="Remy Sharp" src="/car/BMW.jpg" style={{width:75,height:45}} variant='rounded' />
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
       <Grid item xs={2}>
          <SideBar />
      </Grid>
      <Grid item xs={8}>
      <Routes>
         <Route element={<Category/>} path="/category" />
         <Route element={<DisplayAllCategory/>} path="/displayallcategory" />
         <Route element={<Subcategory/>} path="/subcategory" />
         <Route element={<DisplayAllSubcategory/>} path="/displayallsubcategory" />
         <Route element={<Company/>} path="/company" />
         <Route element={<DisplayAllCompany/>} path="/displayallcompany" />
         <Route element={<Model/>} path="/model" />
         <Route element={<DisplayAllModel/>} path="/displayallmodel" />
         <Route element={<Vehicle />} path="/vehicle" />
         <Route element={<DisplayAllVehicle/>} path="/displayallvehicle" />
         <Route element={<Feature/>} path='/feature' />
         <Route element={<Offer/>} path='/offer' />
         <Route element={<DisplayAllOffer/>} path='/displayalloffer' />
         <Route element={<WhyCar/>} path='/whycar' />
      </Routes>
      </Grid>
      </Grid>
    </Box>
  );
}
