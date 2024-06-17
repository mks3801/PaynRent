import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CommuteIcon from '@mui/icons-material/Commute';
import { useNavigate } from 'react-router-dom';

export default function SideBar(){
const navigate=useNavigate()
 return(<div>
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/dashboard/displayallsubcategory')}>
      <ListItemIcon>
      <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Subcategory" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/dashboard/displayallcompany')}>
      <ListItemIcon>
        <CorporateFareIcon />
      </ListItemIcon>
      <ListItemText primary="Company" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/dashboard/displayallmodel')}>
      <ListItemIcon>
        <DriveEtaIcon />
      </ListItemIcon>
      <ListItemText primary="Model" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/dashboard/displayallvehicle')}>
      <ListItemIcon>
        <CommuteIcon />
      </ListItemIcon>
      <ListItemText primary="Vehicle" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/dashboard/feature')}>
      <ListItemIcon>
        <FeaturedPlayListIcon/>
      </ListItemIcon>
      <ListItemText primary="Feature" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/dashboard/displayalloffer')}>
      <ListItemIcon>
      <LocalOfferIcon />
      </ListItemIcon>
      <ListItemText primary="Offer" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/dashboard/whycar')}>
      <ListItemIcon>
      <CommuteIcon />
      </ListItemIcon>
      <ListItemText primary="Why Car Rental" />
    </ListItemButton>

    
  </React.Fragment>
</div>)
}