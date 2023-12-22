import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { styled} from '@mui/system';
import {
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

const drawerWidth = 300;

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  transition: 'opacity 5s ease', // Apply transition to opacity
}));

const MainAppBar = styled(AppBar)(({ theme }) => ({
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: drawerWidth,
}));

const MainDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: '#FC3031', 
    color: 'white',
    
  },
});

const DrawerPaper = styled('div')({
  width: drawerWidth,
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: '#FC3031',
  color: 'white',
});

const HomeFrame = () => {
  const navigate = useNavigate();
  const storedUserEmail = sessionStorage.getItem('userEmail');
  const [userData, setUserData] = useState(null);
  function base64ToDataURL(base64String) {
    return `data:image/png;base64,${base64String}`;
  }
  
  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        // Make a GET request to your user details endpoint
        const response = await axios.get(`http://localhost:8080/user/getUserData?email=${storedUserEmail}`);
        setUserData(response.data); // Assuming the response contains user data
        console.log('User Data Response:', response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    if (storedUserEmail) {
      fetchUserData();
    }
  }, [storedUserEmail]);

  const handleLogoutClick = () => {
    sessionStorage.removeItem('userEmail');
		navigate("/");
	};


  return (
    <CSSTransition
    in={true}
    appear={true}
    timeout={300}
    classNames="fade" // CSS class prefix for transition styles
  >
    <Root>
      {/* App Bar */}
      <MainAppBar position="fixed" sx={{ backgroundColor: 'white', color: 'white' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end'  }}>
          <div>
          <Link to="/home">
              <img
                src="/LoginPage/CITURAMS.png"
                alt="Logo"
                style={{ height: '55px', cursor: 'pointer' }}
              />
          </Link>
          </div>

        </Toolbar>
      </MainAppBar>
      <Divider/>
      

      {/* Left Drawer (Navigation Drawer) */}
      <MainDrawer variant="permanent" component="nav" position="fixed">

        <DrawerPaper>
          {/* User Profile Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', marginTop: '10px' }}>
          <Link to="/my-profile" style={{ textDecoration: 'none' }}>
            <div style={{ cursor: 'pointer' }}>
              <img
                src={userData?.profileImage ? base64ToDataURL(userData.profileImage) : '/user.png'}
                alt="Profile"
                className="rounded-full ring-4 ring-white"
                style={{ borderRadius: '50%', height: '70px', width: '70px', marginBottom: '10px' }}
              />
            </div>
          </Link>
            {/* Use userData to display user name and email */}
            {userData && (
              <>
                <div className='text-white font-bold'>{userData.fname +' ' +userData.lname}</div>
                <div className='text-white '>{userData.email}</div>
              </>
            )}
          </div>

          <List>
            {/* Add items for the navigation drawer */}
            <ListItem component={Link} to="/dashboard">
              <ListItemIcon style={{ color: 'white' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" style={{ fontFamily: "'Poppins', sans-serif" }} />
            </ListItem>
            <ListItem component={Link} to="/new-request">
              <ListItemIcon style={{ color: 'white' }}>
                <PostAddOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="New Request" style={{ fontFamily: "'Poppins', sans-serif" }} />
            </ListItem>
            <ListItem component={Link} to="/my-request" style={{ marginBottom: '150px' }}>
              <ListItemIcon style={{ color: 'white' }}>
                <ArticleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="My Request" />
            </ListItem>
            <ListItem onClick={handleLogoutClick} style={{cursor: "pointer" }}>
              <ListItemIcon style={{ color: 'white' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>

          {/* Image at the bottom */}
          <div
            style={{
              marginTop: 'auto',
              textAlign: 'left',
              overflow: 'hidden',
            }}
          >
            <img
              src="/LoginPage/wildcat.png"
              alt="wildcat logo"
              style={{
                marginLeft: '-35%',
                width: '120%',
                height: 'auto',
              }}
            />
          </div>
        </DrawerPaper>
      </MainDrawer>


    </Root>
    </CSSTransition>
  );
};

export default HomeFrame;