import React, { useState, useEffect } from 'react';
import { Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AdminHomeFrame from "../../components/AdminHomeFrame";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from 'react-router-dom';

import axios from 'axios';

const AdminMyProfile = ({profilePhoto: initialProfilePhoto }) => {
  const navigate = useNavigate();

  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [oldPasswordType, setOldPasswordType] = useState('password');
  const [oldPasswordIcon, setOldPasswordIcon] = useState(() => <VisibilityOffIcon />);
  const [newPasswordType, setNewPasswordType] = useState('password');
  const [newPasswordIcon, setNewPasswordIcon] = useState(() => <VisibilityOffIcon />);
  const [newPassword, setNewPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(initialProfilePhoto);
  const storedUserEmail = sessionStorage.getItem('userEmail');


  const handleEditProfileClick = () => {
    setEditProfileModalOpen(true);
  };

  const handleEditProfileModalClose = () => {
    setEditProfileModalOpen(false);
  };
  const handleSaveChangesClick = () => {
    setConfirmationDialogOpen(true);
  };
  
  const handleConfirmSaveChanges = async () => {
    await handleUpdateUser(handleEditProfileModalClose);
    handleConfirmationDialogClose();
    window.location.reload();
  };
  

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };
  
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
  
  const handleOldPasswordToggle = () => {
    if (oldPasswordType === 'password') {
      setOldPasswordType('text');
      setOldPasswordIcon(<VisibilityIcon />);
    } else {
      setOldPasswordType('password');
      setOldPasswordIcon(<VisibilityOffIcon />);
    }
  };
 
  const handleProfileImageChange = (e) => {
    const selectedImage = e.target.files[0];
    console.log('Selected Image:', selectedImage);
    setProfilePhoto(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Profile Image Result:', reader.result);
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setProfileImage(null);
    }
  };
  
  const handleUpdateUser = async () => {
    try {
      const updatedUserData = new FormData();
      updatedUserData.append('profileImage', profilePhoto);
      updatedUserData.append('contactNum', contactNumber);
      updatedUserData.append('password', newPassword);
      console.log("FormData:", updatedUserData);
  
      const response = await axios.put(`http://localhost:8080/user/updateUser?userID=${userData.userID}`, updatedUserData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
      console.log('User details updated successfully:', response.data);
      handleEditProfileModalClose();
      console.log(profileImage);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error updating user details', error);
          // Check if the error has a response with data
    if (error.response && error.response.data) {
      console.error('Error response data:', error.response.data);
    }
    }
  };
  
  
  const handleNewPasswordToggle = () => {
    if (newPasswordType === 'password') {
      setNewPasswordType('text');
      setNewPasswordIcon(<VisibilityIcon />);
    } else {
      setNewPasswordType('password');
      setNewPasswordIcon(<VisibilityOffIcon />);
    }
  };
  
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  
  const isOldPasswordValid = () => {
    return userData && userData.password === oldPassword;
  };
  
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };
  
  const isPasswordValid = () => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSymbol = /[!@#$%^&*();,.?":{}/|<>+-]/.test(newPassword);
  
    return (
      newPassword.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSymbol
    );
  };
  const isContactNumberValid = () => {
    return contactNumber && /^\d{11}$/.test(contactNumber)
  };
  
  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };
  
  const isContactNumberChanged = () => {
    return contactNumber !== userData.contactNum || contactNumber === '';
  };

  const isButtonDisabled = !isOldPasswordValid() || (isContactNumberChanged() && !isContactNumberValid()) || !isPasswordValid();
  function base64ToDataURL(base64String) {
    return `data:image/png;base64,${base64String}`;
  }
  
  return (
    <div className='mt-24 ml-64'>
    <div className='ml-40 mr-32'>
      <AdminHomeFrame/>
  <div className="p-12">
  <div className="bg-gray-200 p-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 flex justify-left">My Profile</h2>
      <Divider/>
       {/* User Profile Section */}

       <div className="flex items-center mt-6 justify-left ml-12">
               {userData && (
            <>
          <img
            src={userData?.profileImage ? base64ToDataURL(userData.profileImage) : '/user.png'}
            alt="Profile"
            className="rounded-full ring-4 ring-gray-500"
            style={{ borderRadius: '50%', height: '150px', width: '150px', marginRight: '100px' }}
          />
                      </>
          )}
          <div>
          

          {userData && (
            <>
            <div className="text-m mb-2">
              <span className="font-bold">Name:</span> {userData.fname} {userData.lname}
            </div>
            <div className="text-m mb-2">
              <span className="font-bold">Department:</span> {userData.department}
            </div>
            <div className="text-m mb-2">
              <span className="font-bold">Position:</span> {userData.position}
            </div>
            <div className="text-m mb-2">
              <span className="font-bold">Email:</span> {userData.email}
            </div>
            <div className="text-m mb-2">
              <span className="font-bold">Contact Number:</span> {userData.contactNum}
            </div>

            </>
          )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className='mt-2 flex justify-end'>
          <Button variant="contained"
          color="primary"
          onClick={handleEditProfileClick}
          sx={{
            fontFamily: "'Poppins', sans-serif",
            marginTop: 2,
            backgroundColor: '#FC3031',
            '&:hover': {
              backgroundColor: '#bd262a', // Change this to your desired hover color
            },
  }}>
            Edit Profile
          </Button>
        </div>



        {/* Profile Modal */}
        <Dialog open={isEditProfileModalOpen} onClose={handleEditProfileModalClose } maxWidth="xl" >
        <DialogTitle className='bg-gray-200'>Edit Profile</DialogTitle>
        <DialogContent>
        <div className="w-full flex items-center justify-center">
          <div className="p-8 mr-8 flex flex-col items-center">
        {/*<UserCircleIcon className="h-40 w-40 text-gray-300" aria-hidden="true" />*/}
        <div>
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleProfileImageChange}
          />
          <label htmlFor="profileImageInput">
            <img
              src={profileImage || (userData?.profileImage && base64ToDataURL(userData.profileImage)) || '/user.png'}
              alt="Profile"
              className="rounded-full ring-4 ring-gray-500 cursor-pointer"
              style={{ borderRadius: '50%', height: '160px', width: '160px' }}
            />
          </label>
        </div>
        <button
          type="button"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-2"
          onClick={() => document.getElementById('profileImageInput').click()}
        >
          Change
        </button>
      </div>

      <Divider/>
      <div>
        <form className="space-y-4">

            <div className="mt-4 grid gap-x-6 gap-y-8 sm:grid-cols-6">
            {userData && (
            <>
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                placeholder={userData.fname}
                readOnly 
                className="bg-yellow-100 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  placeholder={userData.lname}
                  readOnly 
                  className="bg-yellow-100 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="contact-number" className="block text-sm font-medium leading-6 text-gray-900">
                Contact Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="contact-number"
                  id="contact-number"
                  value={contactNumber}
                  placeholder={userData.contactNum}
                  onChange={handleContactNumberChange}
                  className={`p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    contactNumber && !isContactNumberValid(contactNumber) ? 'ring-red-500' : contactNumber ? 'ring-green-500' : 'ring-gray-300'
                  }`}
                />
              {contactNumber && !isContactNumberValid(contactNumber) && (
                <p className="mt-1 text-red-500 text-sm">Contact number does not meet the requirements.</p>
              )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Old Password
              </label>
              <div className="mt-2">
                <input
                  id="oldpw"
                  name="oldpassword"
                  type={oldPasswordType}
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                  className={`p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    oldPassword ? (isOldPasswordValid() ? 'ring-green-500' : 'ring-red-500') : 'ring-gray-300'
                  }`}
                />
                <span className="absolute ml-2 mt-1 items-center" onClick={handleOldPasswordToggle}>{oldPasswordIcon}</span>
                {oldPassword && isOldPasswordValid(oldPassword) && (
                <p className="mt-1 text-green-600 text-sm">Password matched.</p>
              )}
              
              </div>
            </div>

            <div className="sm:col-span-4">

          <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">
            New Password
          </label>
          <div className="mt-2">
            <input
              id="newpw"
              name="newpassword"
              type={newPasswordType}
              value={newPassword}
              onChange={handleNewPasswordChange}
              readOnly={!isOldPasswordValid()}  
              className={`p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                newPassword ? (isPasswordValid() ? 'ring-green-500' : 'ring-red-500') : 'ring-gray-300'
              }`}
            />
            <span className="absolute ml-2 mt-1 items-center" onClick={handleNewPasswordToggle}>
              {newPasswordIcon}
            </span>
          </div>
          {/* Display password requirements */}
          <div className="text-sm mt-1 w-96 text-gray-600">
            Password must be at least 8 characters and contain uppercase, lowercase, number, and symbol.
          </div>
          {/* Display password validation status */}
          {newPassword && (
            <div className={`text-sm mt-1 ${isPasswordValid() ? 'text-green-600' : 'text-red-600'}`}>
              {isPasswordValid() ? 'Password is valid!' : 'Password does not meet requirements.'}
            </div>
          )}
        </div>
            </>
          )}
            </div>

        </form>
      </div>
    </div>
        </DialogContent>
        <DialogActions>
          <div className="mt-6 mb-2 mr-4 flex items-center justify-end gap-x-6">
            <button onClick={handleEditProfileModalClose } type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              onClick={handleSaveChangesClick}
              disabled={isButtonDisabled}
              type="submit"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              style={{ cursor: isButtonDisabled ? 'not-allowed' : 'pointer' }}
            >
              Save Changes
            </button>
          </div>
        </DialogActions>
    </Dialog>
            {/* Confirmation Dialog */}
            <Dialog open={isConfirmationDialogOpen} onClose={handleConfirmationDialogClose}>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md w-96 h-40">
            
            <div className="bg-red-500 p-2 font-bold text-lg text-white rounded-t-lg">
            <FontAwesomeIcon
          icon={faExclamationCircle}
          className="mr-2 w-5 h-5"
          style={{ color: 'white', fontSize: '1rem', cursor: 'pointer' }}
        />Confirm Save Changes</div>

            <div className="p-4">
            <p className="mb-6">Are you sure you want to apply these changes?</p>
            <Divider/>
            <div className="mt-2 mb-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-3 py-1 w-auto rounded mr-2"
                onClick={handleConfirmSaveChanges}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-3 w-auto py-1 rounded"
                onClick={handleConfirmationDialogClose}
              >
                Cancel
              </button>
            </div>
            </div>
          </div>
        </div>

            </Dialog>
    </div>
  </div>
  </div>
  </div>
  );
};

export default AdminMyProfile;
