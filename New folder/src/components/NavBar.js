import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavBar(){
    const navigate = useNavigate();

    const handleAboutUsClick = () => {
        navigate('/about-us');
      };
    
    const handleLogoClick = () => {
        navigate('/');
      };

    const handleGetStartedClick = () => {
        navigate('/login');
      };

    return(
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'white' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
            <img
            src="/LoginPage/CITURAMS.png"
            alt="Logo"
            onClick={handleLogoClick}
            style={{ height: '55px', cursor: 'pointer' }}
            />
        </div>
        <div>
            <Button
            color="inherit"
            onClick={handleLogoClick}
            sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '14px',
                width: 'auto',
                height: 'auto',
                color: 'black'
            }}
            >
            Home
            </Button>
            <Button
            color="inherit"
            onClick={handleAboutUsClick}
            sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '14px',
                width: 'auto',
                height: 'auto',
                color: 'black'
            }}
            >
            About Us
            </Button>
            <Button
            variant="contained"
            color="primary"
            onClick={handleGetStartedClick}
            sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '14px',
                width: 'auto',
                height: 'auto',
                backgroundColor: '#FC3031',
                '&:hover': {
                backgroundColor: '#bd262a',
                },
            }}
            >
            Login
            </Button>
        </div>
        </Toolbar>
        </AppBar>
      );


}

export default NavBar;
