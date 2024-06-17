import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getData, postData } from '../../Services/FetchNodeServices';
import UserSignupDrawer from './UserSignupDrawer';
import UserDetailsDrawer from './UserDetailsDrawer';
import { json, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header(props) {
  
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [signup, setSignup] = useState("Login/SignUp")
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl);
  const [status, setStatus] = useState(false)
  const [login,setLogin]=useState(false)
  const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem("userDetails")))
  const [user,setUser] = useState(false)
  const navigate = useNavigate()
  
  
  console.log(userInfo) 

 
  const fetchAllCategory = async () => {
    var response = await getData('user/display_all_category')
    setCategories(response.data)
  }
  useEffect(function () {
    fetchAllCategory()
    if(userInfo)
    {
      setSignup(userInfo.fullname)
      setLogin(true)
    }
  }, [])

  const fetchAllsubcategory = async (cid) => {
    var body = { categoryid: cid }
    var response = await postData('user/fetch_all_subcategory_by_category', body)
    setSubcategories(response.data)
  }

  const handleClick = (event) => {
    fetchAllsubcategory(event.currentTarget.value)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const showMainMenu = () => {
    return categories.map((item) => {
      return <Button value={item.categoryid} onClick={handleClick}>{item.categoryname}</Button>
    })
  }

  const showSubMenu = () => {
    return subcategories.map((item) => {
      return <MenuItem value={item.subcategoryid} onClick={handleClose}>{item.subcategoryname}</MenuItem>
    })
  }

  const handleLogin = () => {
    
   if(userInfo ==null||undefined)
   {  
    setStatus(true)
    setUser(true)
   }
    else{
      console.log(userInfo)
      setSignup(userInfo.fullname)
      setLogin(true)
    }
    
  }

  const handleLogout = () => {
    localStorage.removeItem("userDetails")
    navigate('/home')
    window.location.reload()
    setLogin(false)
    setSignup("Login/SignUp")
  }

  const handleStatus = () => {
    setStatus(false)
  }

console.log(signup)
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='inherit' >
          <Toolbar>
            <img src='/car/Logo1.png' style={{ width: 80, height: 50 }} />
            <Box component="div" sx={{ flexGrow: 1 }}>
            </Box>
            <Box>
              {showMainMenu()}

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {showSubMenu()}

              </Menu>
            </Box>

          
          <Button onClick={handleLogin} color="inherit">{signup}</Button>
          {login?
          <Button onClick={handleLogout} color="inherit">Logout</Button>:<></>} 
           
          </Toolbar>
        </AppBar>
      </Box>
      <UserSignupDrawer status={status} handleStatus={handleStatus} user={user}/>
      <UserDetailsDrawer />
    </div>
  )
}