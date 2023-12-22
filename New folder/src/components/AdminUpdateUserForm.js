import React, { useState, useEffect } from 'react';
import { styled } from "@mui/system";
import {
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
    Typography
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";


const FormHeader = styled("div")({
	display: "flex",
	alignItems: "center",
	marginBottom: "20px",
    marginTop: "-30px",
});

const HeaderIcon = styled(AccountCircleIcon)({
	fontSize: 30,
	marginRight: "10px",
    color: '#FC3031',
});

const FormContainer = styled("div")({
	width: "40%",
	margin: "auto",
	marginTop: "35px",
});

const AdminUpdateUserForm = () => {
	const [PasswordType, setPasswordType] = useState('password');
	const [PasswordIcon, setPasswordIcon] = useState(() => <VisibilityOffIcon />);
	const storedUserEmail = sessionStorage.getItem('userEmail');
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
		  try {
			const response = await axios.get(`http://localhost:8080/user/getUserData?email=${storedUserEmail}`);
			setUserData(response.data); 
			console.log(response.data.userID);
	  
		  } catch (error) {
			console.error('Error fetching user data', error);
		  }
		};
	
		if (storedUserEmail) {
		  fetchUserData();
		}
	  }, [storedUserEmail]);
    
	const [formData, setFormData] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		department: "",
		position: "",
		role: "",
		contactNum: "",
	  });
	
	  const [formErrors, setFormErrors] = useState({
		fname: false,
		lname: false,
		email: false,
		password: false,
		department: false,
		position: false,
		role: false,
		contactNum: false,
	  });
	
	  const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
		  ...prevData,
		  [name]: value,
		}));
	  };
	
	  const validateForm = () => {
		const errors = {};
		let isValid = true;
	
		Object.keys(formData).forEach((key) => {
		  if (key !== "role" && formData[key] === "") {
			errors[key] = true;
			isValid = false;
		  } else {
			errors[key] = false;
		  }
		});
	
		setFormErrors(errors);
		return isValid;
	  };
	
	  const handleSubmit = async (event) => {
		event.preventDefault();
	
		if (!validateForm()) {
		  // If the form is not valid, prevent submission
		  return;
		}
	
		try {
		  const response = await axios.post(
			`http://localhost:8080/user/updateUser?userID=${userData.userID}`,
			formData
		  );
		  console.log(response.data); // Log the response from the server
		  window.location.reload();
		} catch (error) {
		  console.error("Error updating user:", error);
		  // Add logic to handle errors, e.g., displaying an error message
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
		<div className="mb-4 -mt-10">
		<FormContainer className="p-4">
			<FormHeader>
				<HeaderIcon />
				<Typography variant="h5" component="div" sx={{ fontFamily: "Poppins" }}>
					Update User Account
				</Typography>
			</FormHeader>
			<form onSubmit={handleSubmit}>
				<TextField
					label="First Name"
					name="fname"
					fullWidth
					margin="dense"
					variant="outlined"
					value={formData.fname}
					onChange={handleChange}
					required
					error={formErrors.fname}
				/>
				<TextField
					label="Last Name"
					name="lname"
					fullWidth
					margin="dense"
					variant="outlined"
					value={formData.lname}
					onChange={handleChange}
					required
					error={formErrors.lname}
				/>
				<TextField
					label="Institutional Email"
					name="email"
					fullWidth
					margin="dense"
					variant="outlined"
					value={formData.email}
					onChange={handleChange}
					required
					error={formErrors.email}
				/>
	
				<TextField
					label="Password"
					name="password"
					type={PasswordType}
					fullWidth
					margin="dense"
					variant="outlined" 
					value={formData.password}
					onChange={handleChange}
					required
					error={formErrors.password}
				/>
				<span className="absolute ml-2 mt-5 items-center" onClick={handlePasswordToggle}>{PasswordIcon}</span>

				<TextField
					label="Department"
					name="department"
					fullWidth
					margin="dense"
					variant="outlined"
					value={formData.department}
					onChange={handleChange}
					required
					error={formErrors.department}
				/>
				<TextField
					label="Position"
					name="position"
					fullWidth
					margin="dense"
					variant="outlined"
					value={formData.position}
					onChange={handleChange}
					required
					error={formErrors.position}
				/>
				<FormControl fullWidth variant="outlined" margin="dense">
					<InputLabel id="role-label">Role</InputLabel>
					<Select
						label="Role"
						labelId="role-label"
						name="role"
						value={formData.role}
						onChange={handleChange}
						required
						error={formErrors.role}
                        
					>
						<MenuItem value="user"  sx={{ "&:hover": { backgroundColor: "#FC3031", color: "white" } }}>User</MenuItem>
						<MenuItem value="admin" sx={{ "&:hover": { backgroundColor: "#FC3031", color: "white" } }}>Admin</MenuItem>
					</Select>
				</FormControl>
				<TextField
					label="Contact Number"
					name="contactNum"
					fullWidth
					margin="dense"
					variant="outlined"
					value={formData.contactNum}
					onChange={handleChange}
					required
					error={formErrors.contactNum}
				/>
				<Button
					type="submit"
					variant="contained"
					sx={{
					marginTop: "10px", // Add margin to match the form fields
					backgroundColor: "#FC3031",
					fontSize: "15px",
					fontFamily: "'Poppins', san-serif",
					width: "100%",
					padding: "10px",
					color: "white",
					textTransform: "capitalize",
					"&:hover": {
						backgroundColor: "#D83131",
					},
					}}
				>
					Update Account
          </Button>
			</form>
		</FormContainer>
		</div>
	);
};

export default AdminUpdateUserForm;