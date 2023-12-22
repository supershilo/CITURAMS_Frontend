import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrash,
  faSearch,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import AdminHomeFrame from "../../components/AdminHomeFrame";
import axios from "axios";
import { Divider } from "@mui/material";

const AdminManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRow, setActiveRow] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/getAllUsers");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = (userId) => {
    toggleConfirmationDialog(userId);
  };


  const toggleConfirmationDialog = (userId = null) => {
    setUserToDelete(userId);
    setShowConfirmationDialog(!showConfirmationDialog);
  };

  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/user/deleteUser/${userToDelete}`);
      const updatedUsers = await axios.get("http://localhost:8080/user/getAllUsers");
      setUsers(updatedUsers.data);
      setFilteredUsers(updatedUsers.data);
      toggleConfirmationDialog(); 

    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.userID === userId);
    //console.log(userToEdit.userID);
    setEditingUser(userToEdit);
    setShowEditModal(true);
  };
  
  const handleSelectRow = (userID) => {
    if (activeRow === userID) {
      setActiveRow(null);
    } else {
      setActiveRow(userID);
    }
  };

  const handleCreateUserClick = () => {
    navigate("/manage-users/create-user");
  };


  const handleRoleFilter = (role) => {
    setSelectedRole(role);

    if (role === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user.role === role);
      setFilteredUsers(filtered);
    }
  };

  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.fname.toLowerCase().includes(searchTermLowerCase) ||
        user.lname.toLowerCase().includes(searchTermLowerCase) ||
        user.email.toLowerCase().includes(searchTermLowerCase) ||
        user.department.toLowerCase().includes(searchTermLowerCase) ||
        user.position.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredUsers(filtered);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const EditUserModal = ({ user, onClose }) => {
    const [editedUser, setEditedUser] = useState({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: user.password,
      contactNum: user.contactNum,
      department: user.department,
      role: user.role,
      position: user.position,
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedUser((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleUpdateUser = async () => {
      try {
        await axios.put(`http://localhost:8080/user/admin/updateUser?userID=${user.userID}`, editedUser);
        console.log("User updated successfully");
        const updatedUsers = await axios.get("http://localhost:8080/user/getAllUsers");
        setUsers(updatedUsers.data);
        setFilteredUsers(updatedUsers.data);
  
        onClose();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-5/12">
        <div className="bg-red-500 p-2 font-bold text-lg text-white rounded-t-lg flex justify-between items-center">
          <span>Edit User</span>
        </div>
    
        <div className="p-4">
          <form>
          <div className="mb-4 flex">
            <div className="mr-2 w-1/2">
              <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={editedUser.fname}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
  
            <div className="ml-2 w-1/2">
              <label htmlFor="lname" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={editedUser.lname}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
    
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={editedUser.password}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
    
            <div className="mb-4 flex">
            <div className="mr-2 w-1/2">
              <label htmlFor="contactnumber" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="text"
                id="contactnumber"
                name="contactNum"
                value={editedUser.contactNum}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
  
            <div className="ml-2 w-1/2">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={editedUser.department}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
  
          <div className="mb-4 flex">
            <div className="mr-2 w-1/2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={editedUser.role}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="user" className="hover:bg-red-500 hover:text-white">
                  User
                </option>
                <option value="admin" className="hover:bg-red-500 hover:text-white">
                  Admin
                </option>
              </select>
            </div>
  
            <div className="ml-2 w-1/2">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={editedUser.position}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
    
            <div className="mt-2 mb-4 flex justify-end">
              <button
                type="button"
                className="bg-red-500 text-white px-3 py-1 w-auto rounded mr-2"
                onClick={handleUpdateUser}
              >
                Update
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-3 w-auto py-1 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    );
  };
  

  return (
    <div>
      <AdminHomeFrame />
      <div className="mt-24 ml-64">
        <div className="ml-16">
          <div className="mr-10 mb-4 flex items-center justify-between">
            <div className="ml-4 flex items-center justify-start">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded px-2 py-1 mr-2"
              />
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="mr-2"
                  onClick={handleCreateUserClick}
                  style={{ cursor: "pointer", color: "red", fontSize: "1.3rem" }}
                />
              </div>
            </div>
          </div>

          <div className="mr-10 ml-4 rounded-lg border border-gray-200" style={{ position: 'relative', height:'430px' }}>
            <div className="overflow-x-auto rounded-t-lg">
              <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="text-left">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-large font-bold text-gray-900">Name</th>
                      <th className="whitespace-nowrap px-4 py-2 font-large text-gray-900">Email</th>
                      <th className="whitespace-nowrap px-4 py-2 font-large text-gray-900">Department</th>
                      <th className="whitespace-nowrap px-4 py-2 font-large text-gray-900">Position</th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                <div className="flex items-center">
                                  <span className="mr-2 font-bold">Role</span>
                                  <select
                                    className="px-2 py-1 border rounded"
                                    onChange={(e) => handleRoleFilter(e.target.value)}
                                  >
                                    <option className="font-medium" value="">All</option>
                                    <option className="font-medium" value="user">User</option>
                                    <option className="font-medium" value="admin">Admin</option>
                                  </select>
                                </div>
                              </th>
                      <th className="whitespace-nowrap px-4 py-2 font-large text-gray-900">Contact Number</th>
                      <th className="whitespace-nowrap px-4 py-2 font-large text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayedUsers.map((user) => (
                    <tr
                      key={user.userID}
                      className={`${
                        activeRow === user.userID ? "bg-gray-200" : ""
                      } hover:bg-gray-100 cursor-pointer`}
                      onClick={() => handleSelectRow(user.userID)}
                    >
                  <td className="justify-center whitespace-nowrap px-4 py-2 text-gray-700">{user.fname +' ' +user.lname}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.department}</td>
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.position}</td>
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.role}</td>
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.contactNum}</td>
                              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                                      <div className='flex items-center'>
                                        <FontAwesomeIcon
                                          icon={faUserPen}
                                          className='mr-2'
                                          style={{ color: 'red', fontSize: '1.3rem', cursor: 'pointer'  }}
                                          onClick={() => handleEditUser(user.userID)}
                                        />
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          className='mr-2'
                                          style={{ color: 'red', fontSize: '1.3rem', cursor: 'pointer'  }}
                                          onClick={(e) => {
                                            e.stopPropagation(); // Prevent row click from triggering
                                            handleDeleteUser(user.userID);
                                          }}
                                        />
                                      </div>
                              </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

           
          </div>
          {/* Pagination */}
          <div className="rounded-b-lg mt-2 border-gray-200 px-4 py-2"  style={{ position: 'absolute',display: 'flex', alignItems:'center'}}>
              <ol className="flex justify-end gap-1 text-xs font-medium">
                <li>
                  <a
                    href="#"
                    className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    onClick={handlePrevPage}
                  >
                    <span className="sr-only">Prev Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1}>
                    <a
                      href="#"
                      className={`block h-8 w-8 rounded border ${
                        currentPage === index + 1
                          ? "border-red-500 bg-red-500 text-white"
                          : "border-gray-100 bg-white text-gray-900"
                      } text-center leading-8`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}

                <li>
                  <a
                    href="#"
                    className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    onClick={handleNextPage}
                  >
                    <span className="sr-only">Next Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ol>
            </div>
        </div>
      </div>
      {showConfirmationDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md w-96 h-40">
            
            <div className="bg-red-500 p-2 font-bold text-lg text-white rounded-t-lg">
            <FontAwesomeIcon
          icon={faTrash}
          className="mr-2"
          style={{ color: 'white', fontSize: '1rem', cursor: 'pointer' }}
          onClick={toggleConfirmationDialog}
        />Delete User</div>

            <div className="p-4">
            <p className="mb-6">Are you sure you want to delete this user?</p>
            <Divider/>
            <div className="mt-2 mb-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-3 py-1 w-14 rounded mr-2"
                onClick={confirmDeleteUser}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-3 w-14 py-1 rounded"
                onClick={() => toggleConfirmationDialog()}
              >
                No
              </button>
            </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
              <EditUserModal
                user={editingUser}
                onClose={() => {
                  setEditingUser(null);
                  setShowEditModal(false);
                }}
              />
            )}

      
    </div>

    
  );
};



export default AdminManageUsers;
