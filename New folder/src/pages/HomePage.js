import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { styled } from '@mui/system';
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
import DashboardIcon from '@mui/icons-material/Dashboard';
import '../styles/HomePage.css';
import axios from 'axios';

const drawerWidth = 300;

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
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


const HomePage = () => {
  const navigate = useNavigate();
  const storedUserEmail = sessionStorage.getItem('userEmail');
  const [userData, setUserData] = useState(null);
  
  const handleLogoutClick = () => {

    sessionStorage.removeItem('userEmail');
		navigate("/");
    

	};



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/getUserData?email=${storedUserEmail}`);
        setUserData(response.data); 
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    if (storedUserEmail) {
      fetchUserData();
    }
  }, [storedUserEmail]);

  function base64ToDataURL(base64String) {
    return `data:image/png;base64,${base64String}`;
  }
  return (
    <Root>
      {/* App Bar */}
      <MainAppBar position="fixed" sx={{ backgroundColor: 'white', color: 'white' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
      <Divider />

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
                <div className={`text-white font-bold ${userData ? 'fade-in' : 'fade-out'}`}>{userData.fname +' ' +userData.lname}</div>
                <div className={`text-white ${userData ? 'fade-in' : 'fade-out'}`}>{userData.email}</div>
              </>
            )}
          </div>

          <List>
            {/* Add items for the navigation drawer */}
            <ListItem component={Link} to="/dashboard" button>
              <ListItemIcon style={{ color: 'white' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" style={{ fontFamily: "'Poppins', sans-serif" }} />
            </ListItem>
            <ListItem component={Link} to="/new-request" button>
              <ListItemIcon style={{ color: 'white' }}>
                <PostAddOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="New Request" style={{ fontFamily: "'Poppins', sans-serif" }} />
            </ListItem>
            <ListItem component={Link} to="/my-request" button style={{ marginBottom: '150px' }}>
              <ListItemIcon style={{ color: 'white' }}>
                <ArticleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="My Request" />
            </ListItem>
            <ListItem onClick={handleLogoutClick} button>
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
              onClick={handleLogoutClick}
              style={{
                marginLeft: '-35%',
                width: '120%',
                height: 'auto',
              }}
            />
          </div>
        </DrawerPaper>
      </MainDrawer>

      {/* Main Content */}
      <div className='mt-24 -ml-12'>
        <div className='ml-12'>
          <div className='ml-12'>
            {userData && (
              <>
                <p>Hello {userData.fname},</p>
                <p>Welcome to CIT-U Repair & Assets Management System</p>
              </>
            )}
          </div>
          <div className="p-12">
            <div className="bg-gray-200 p-16 rounded-lg mb-6">
              <h2 className="text-2xl font-bold mb-4 flex justify-center">Request Guide</h2>

              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">REQUEST STEPS:</h3>

                <div className="mb-4">
                  <p className="font-bold">Step 1: Navigate to New Request Page</p>
                  <p>Click on the New Request button, located on the left side of the screen.</p>
                </div>

                <div className="mb-4">
                  <p className="font-bold">Step 2: Filling out the Request Form</p>
                  <p>On the Request page, you'll find a form to submit your request. Fill in the necessary details in the form.</p>
                </div>

                <div className="mb-4">
                  <p className="font-bold">Step 3: Submitting your Request</p>
                  <p>After completing the form, click the Submit button to send your request.</p>
                </div>

                <div className="mb-4">
                  <p className="font-bold">Step 4: Viewing your Requests</p>
                  <p>After completing the form, you'll be directed to the "My Request" tab. Here, you can view all your submissions, check their status, and see any associated remarks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
};

export default HomePage;
