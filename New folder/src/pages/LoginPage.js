import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import {
  Card,
  TextField,
  Button,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import axios from "axios";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [PasswordType, setPasswordType] = useState('password');
	const [PasswordIcon, setPasswordIcon] = useState(() => <VisibilityOffIcon />);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSubmitClick = async () => {
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email: email,
        password: password,
      });
  
      if (response.status === 200) {
      const userRole = response.data.role;
      const userProfileImage = response.data.profileImage;
      sessionStorage.setItem('userEmail', email);
      sessionStorage.setItem('userRole', userRole);
      sessionStorage.setItem('userProfileImage', userProfileImage);

      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }
      } else {
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (error) {
      setError("Authentication failed. Please check your credentials");
    }
  };

  const handlePasswordToggle = () => {
		if (PasswordType === 'password') {
		  setPasswordType('text');
		  setPasswordIcon(<VisibilityIcon />);
		} else {
		  setPasswordType('password');
		  setPasswordIcon(<VisibilityOffIcon />);
		}
		};
	
  

  return (
    <div className="login-page">
      <div className="left-side">
        <div className="wildcat-login">
          <img src="/LoginPage/wildcat.png" alt="Logo" className="wildcat" />
        </div>
      </div>
      <div className="right-side">
        <div className="logo-container">
          <img
            src="/LoginPage/CITURAMS.png"
            alt="Logo"
            className="logo"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="login-form-container">
          <Typography
            className="login-heading"
            variant="h4"
            style={{
              fontFamily: "'Poppins', sans-serif",
              marginBottom: "1.5rem",
              color: "#7D7C7C",
            }}
          >
            Login
          </Typography>
          <Card sx={{ p: 2 }}>
            <form onSubmit={handleSubmitClick}>
              <TextField
                placeholder="Institutional Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <EmailIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                sx={{ maxWidth: 500 }}
              />
              <TextField
                type={PasswordType}
                placeholder="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <LockIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                sx={{ maxWidth: 500, marginTop: 2 }}
              />
              <span className="absolute -ml-8 mt-7 items-center" onClick={handlePasswordToggle}>{PasswordIcon}</span>
              {error && (
                <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
                  {error}
                </Typography>
              )}
            </form>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmitClick}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "18px",
                marginTop: 2,
                width: "100%",
                height: "50px",
                backgroundColor: "#FC3031",
                "&:hover": {
                  backgroundColor: "#bd262a", 
                },
              }}
            >
              Log in
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
