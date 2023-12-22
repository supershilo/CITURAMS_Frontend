import React, { useState, useEffect } from 'react';
import { styled } from "@mui/system";
import {
	AppBar,
	Toolbar,
	Drawer,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import EngineeringIcon from '@mui/icons-material/Engineering';
import axios from 'axios';

const drawerWidth = 300;

const Root = styled("div")(({ theme }) => ({
	display: "flex",
}));

const MainAppBar = styled(AppBar)(({ theme }) => ({
	width: `calc(100% - ${drawerWidth}px)`,
	marginLeft: drawerWidth,
}));

const MainDrawer = styled(Drawer)({
	width: drawerWidth,
	flexShrink: 0,
	"& .MuiDrawer-paper": {
		width: drawerWidth,
		backgroundColor: "#FC3031",
		color: "white",
	},
});

const DrawerPaper = styled("div")({
	width: drawerWidth,
	position: "fixed",
	display: "flex",
	flexDirection: "column",
	height: "100%",
	backgroundColor: "#FC3031",
	color: "white",
});

const AdminHomeFrame = () => {
	const storedUserEmail = sessionStorage.getItem('userEmail');
	const storedUserProfileImage = sessionStorage.getItem('userProfileImage');
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	const handleLogoClick = () => {
		navigate("/admin-dashboard");
	};

	const handleManageUserClick = () => {
		navigate("/manage-users");
	};

	const handleManageRequestClick = () => {
		navigate("/manage-request");
	};

	const handleDashboardClick = () => {
		navigate("/admin-dashboard");
	};

	const handleManageFacilitiesClick = () => {
		navigate("/manage-facilities");
	};

	const handleManageStaffClick = () => {
		navigate("/manage-staff");
	};

	const handleLogoutClick = () => {
		sessionStorage.removeItem('userEmail');
		navigate("/");
	};

	const handleEditProfileClick = ()=>{
		navigate('/admin/my-profile');
	  }
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
		  } catch (error) {
			console.error('Error fetching user data', error);
		  }
		};
	
		if (storedUserEmail) {
		  fetchUserData();
		}
	  }, [storedUserEmail]);

	return (
		<Root>
			{/* App Bar */}
			<MainAppBar
				position="fixed"
				sx={{ backgroundColor: "white", color: "white" }}
			>
				<Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
					<div>
						<img
							src="/LoginPage/CITURAMS.png"
							alt="Logo"
							onClick={handleLogoClick}
							style={{ height: "55px", cursor: "pointer" }}
						/>
					</div>
				</Toolbar>
			</MainAppBar>
			<Divider />

			{/* Left Drawer (Navigation Drawer) */}
			<MainDrawer variant="permanent" component="nav" position="fixed">
				<DrawerPaper>
          {/* User Profile Section */}
          <div position="fixed" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', marginTop: '10px' }}>
            <div  onClick={handleEditProfileClick} style={{ cursor: 'pointer'}}>
            <img
              src={userData?.profileImage ? base64ToDataURL(userData.profileImage) : '/user.png'}
              alt="Profile"
              className="rounded-full ring-4 ring-white"
              style={{ borderRadius: '50%', height: '70px', width: '70px', marginBottom: '10px' }}
            />
            </div>
            {/* Use userData to display user name and email */}
            {userData && (
              <>
                <div className='text-white font-bold'>{userData.fname +' ' +userData.lname}</div>
                <div className='text-white '>{userData.email}</div>
              </>
            )}
          </div>

					<List>
						<ListItem button>
							<ListItemIcon style={{ color: "white" }}>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText
								primary="Dashboard"
								onClick={handleDashboardClick}
								style={{ fontFamily: "'Poppins', sans-serif" }}
							/>
						</ListItem>
						<ListItem button>
							<ListItemIcon style={{ color: "white" }}>
								<AssignmentIcon />
							</ListItemIcon>
							<ListItemText
								primary="Manage Requests"
								onClick={handleManageRequestClick}
								style={{ fontFamily: "'Poppins', sans-serif" }}
							/>
						</ListItem>
						<List>
							<ListItem button style={{ marginBottom: "10px" }}>
								<ListItemIcon style={{ color: "white" }}>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText
									primary="Manage Users"
									onClick={handleManageUserClick}
								/>
							</ListItem>
							<ListItem button style={{ marginBottom: "10px" }}>
								<ListItemIcon style={{ color: "white" }}>
									<BusinessIcon />
								</ListItemIcon>
								<ListItemText
									primary="Manage Facilities"
									onClick={handleManageFacilitiesClick}
								/>
							</ListItem>
							<ListItem button>
								<ListItemIcon style={{ color: "white" }}>
									<EngineeringIcon />
								</ListItemIcon>
								<ListItemText
									primary="Manage Staff"
									onClick={handleManageStaffClick}
								/>
							</ListItem>
						</List>

						<ListItem button style={{ marginTop: "50px" }}>
							<ListItemIcon style={{ color: "white" }}>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary="Logout" onClick={handleLogoutClick} />
						</ListItem>
					</List>

					{/* Image at the bottom */}
					<div
						style={{
							marginTop: "-20px",
							textAlign: "left",
							overflow: "hidden",
						}}
					>
						<img
							src="/LoginPage/wildcat.png"
							alt="wildcat logo"
							style={{
								marginLeft: "-35%",
								width: "120%",
								height: "auto",
							}}
						/>
					</div>
				</DrawerPaper>
			</MainDrawer>
		</Root>
	);
};

export default AdminHomeFrame;