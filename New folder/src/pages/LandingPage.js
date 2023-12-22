import React, { useEffect } from 'react';
import {
  Typography,
  Button,
  IconButton,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import NavBar from '../components/NavBar';
import FeatureSection from '../components/FeatureSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    const handlePopState = () => {
      // Use the history API to navigate to the same page, triggering a reload
      window.history.pushState({ page: 'landing' }, '', window.location.pathname);
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const containerStyle = {
    backgroundImage: 'url("building.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxHeight: '100h',
    height: '100vh',
    marginLeft: '5%',
    padding: '2rem',
  };

  const titleStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const bodyTextStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.2rem',
    color: '#FFF6F6',
    textAlign: 'left',
  };

  const buttonStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '16px',
    width: 'auto',
    height: 'auto',
    backgroundColor: '#FC3031',
    '&:hover': {
      backgroundColor: '#bd262a',
    },
  };

  return (
    <div style={containerStyle}>
      <NavBar />
      <Container sx={contentStyle}>
        <Typography variant="h2" component="div" gutterBottom style={titleStyle}>
          Repair and Assets <br />Management System
        </Typography>
        <Typography variant="body1" paragraph style={bodyTextStyle}>
          Effortless asset care made simple. <br /> Streamline repairs, manage with ease.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGetStartedClick} sx={buttonStyle}>
          Get Started
          <IconButton color="inherit">
            <ArrowCircleRightIcon />
          </IconButton>
        </Button>
      </Container>

      <FeatureSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
