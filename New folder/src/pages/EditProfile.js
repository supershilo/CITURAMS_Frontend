import React, { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Divider } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MyProfile from "./MyProfile";
import axios from "axios";

const EditProfile = (props) => {
  const storedUserEmail = sessionStorage.getItem("userEmail");
  const storedUserID = sessionStorage.getItem("userID");
  const [userData, setUserData] = useState(null);
  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [oldPasswordIcon, setOldPasswordIcon] = useState(() => (
    <VisibilityOffIcon />
  ));
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [newPasswordIcon, setNewPasswordIcon] = useState(() => (
    <VisibilityOffIcon />
  ));
  const [newPassword, setNewPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        // Make a GET request to your user details endpoint
        const response = await axios.get(
          `http://localhost:8080/user/getUserData?email=${storedUserEmail}`
        );

        setUserData(response.data); // Assuming the response contains user data
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (storedUserEmail) {
      fetchUserData();
    }
  }, [storedUserEmail]);

  const handleOldPasswordToggle = () => {
    if (oldPasswordType === "password") {
      setOldPasswordType("text");
      setOldPasswordIcon(<VisibilityIcon />);
    } else {
      setOldPasswordType("password");
      setOldPasswordIcon(<VisibilityOffIcon />);
    }
  };

  const handleUpdateUser = async () => {
    try {
      // Prepare the data to send in the request
      const updatedUserData = {
        contactNumber: contactNumber,
        newPassword: newPassword,
        // Add other fields as needed
      };

      // Make a PUT request to update user details
      const response = await axios.put(
        `http://localhost:8080/user/updateUser?userID=${storedUserID}`,
        updatedUserData
      );

      // Handle the response as needed
      console.log("User details updated successfully:", response.data);
      // Reset state variables
      setContactNumber("");
      setOldPassword("");
      setNewPassword("");
      props.handleEditProfileModalClose();
    } catch (error) {
      console.error("Error updating user details", error);
    }
  };

  const handleNewPasswordToggle = () => {
    if (newPasswordType === "password") {
      setNewPasswordType("text");
      setNewPasswordIcon(<VisibilityIcon />);
    } else {
      setNewPasswordType("password");
      setNewPasswordIcon(<VisibilityOffIcon />);
    }
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const isOldPasswordValid = () => {
    // Assuming userData.password and oldPassword are both strings
    return userData.password === oldPassword;
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const isPasswordValid = () => {
    // Define your password requirements here
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>+-]/.test(newPassword);

    // Check if all requirements are met
    return (
      newPassword.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSymbol
    );
  };
  const isContactNumberValid = () => {
    // Assuming the contact number is a string
    return (
      contactNumber &&
      contactNumber.length === 11 &&
      /^\d+$/.test(userData.contactNum)
    );
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="p-8 mr-8 flex flex-col items-center">
        <UserCircleIcon
          className="h-40 w-40 text-gray-300"
          aria-hidden="true"
        />
        <button
          type="button"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-2"
        >
          Change
        </button>
      </div>
      <Divider />
      <div>
        <form className="space-y-4">
          <div className="mt-4 grid gap-x-6 gap-y-8 sm:grid-cols-6">
            {userData && (
              <>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      placeholder={userData.fname}
                      readOnly
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      placeholder={userData.lname}
                      readOnly
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="contact-number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                        contactNumber && !isContactNumberValid(contactNumber)
                          ? "ring-red-500"
                          : contactNumber
                          ? "ring-green-500"
                          : "ring-gray-300"
                      }`}
                    />
                    {contactNumber && !isContactNumberValid(contactNumber) && (
                      <p className="mt-1 text-red-500 text-sm">
                        Contact number does not meet the requirements.
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                        oldPassword
                          ? isOldPasswordValid()
                            ? "ring-green-500"
                            : "ring-red-500"
                          : "ring-gray-300"
                      }`}
                    />
                    <span
                      className="absolute ml-2 mt-1 items-center"
                      onClick={handleOldPasswordToggle}
                    >
                      {oldPasswordIcon}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="newpw"
                      name="newpassword"
                      type={newPasswordType}
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      className={`p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        newPassword
                          ? isPasswordValid()
                            ? "ring-green-500"
                            : "ring-red-500"
                          : "ring-gray-300"
                      }`}
                    />
                    <span
                      className="absolute ml-2 mt-1 items-center"
                      onClick={handleNewPasswordToggle}
                    >
                      {newPasswordIcon}
                    </span>
                  </div>
                  {/* Display password requirements */}
                  <div className="text-sm mt-1 w-96 text-gray-600">
                    Password must be at least 8 characters and contain
                    uppercase, lowercase, number, and symbol.
                  </div>
                  {/* Display password validation status */}
                  {newPassword && (
                    <div
                      className={`text-sm mt-1 ${
                        isPasswordValid() ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isPasswordValid()
                        ? "Password is valid!"
                        : "Password does not meet requirements."}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
