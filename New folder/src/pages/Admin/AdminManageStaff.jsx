import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import AdminHomeFrame from "../../components/AdminHomeFrame";
import { CSSTransition } from "react-transition-group";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Pagination from "@mui/material/Pagination";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
 
import axios from "axios";
 
const Root = styled("div")(({ theme }) => ({
  display: "flex",
  transition: "opacity 5s ease", // Apply transition to opacity
}));
 
const inputStyle = {
  width: "65%",
  padding: "8px",
  marginBottom: "5px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  // Add more styles as needed
};
 
const AdminManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [newFName, setNewFname] = useState("");
  const [newLName, setNewLname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newStatus, setNewStatus] = useState("");
 
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
 
  const [page, setPage] = useState(1);
  const rowsPerPage = 7; // Number of rows to display per page
 
  // Calculate the index of the first and last item to display based on the current page
  const indexOfLastItem = page * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
 
  // Slice the staff array to display only the items for the current page
  const displayedStaff = staff.slice(indexOfFirstItem, indexOfLastItem);
 
  // Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2.5,
    borderTop: "20px solid #FC3031",
    borderRadius: "8px",
  };
 
  // Create a state to hold the ID of the row whose edit form is open
  const [openEditFormId, setOpenEditFormId] = useState(null);
  const [openDeleteFormId, setOpenDeleteFormId] = useState(null);
 
  // State to store the existing staff name for the selected row
  const [selectedFName, setSelectedFName] = useState("");
  const [selectedLName, setSelectedLName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedContact, setSelectedContact] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
 
  const handleOpenCreateStaffForm = () => {
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
  };
 
  const handleUpdate = () => {
    setIsUpdated(!isUpdated);
  };
 
  const handleOpenEditForm = (
    staffID,
    fname,
    lname,
    email,
    contact,
    status
  ) => {
    setOpenEditFormId(staffID);
    setSelectedFName(fname);
    setSelectedLName(lname);
    setSelectedEmail(email);
    setSelectedContact(contact);
    setSelectedStatus(status);
  };
 
  const handleOpenDeleteForm = (staffID) => {
    setOpenDeleteFormId(staffID);
  };
 
  //fetch all staff
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/staff/getAllStaff`
        );
        setStaff(response.data);
      } catch (err) {
        if (err.response) {
          //not in 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
 
    fetchStaff();
  }, [isCreated, isUpdated]);
 
  //create new staff
  const handleNewStaffSubmit = async () => {
    if (newFName !== "") {
      const staff = {
        fname: newFName,
        lname: newLName,
        email: newEmail,
        contactNum: newContact,
        status: newStatus,
      };
 
      try {
        const response = await axios.post(
          `http://localhost:8080/staff/createStaff`,
          staff
        );
 
        // Handle success
        console.log("Staff posted successfully!", response.data);
        // Reset form field
        setNewFname("");
        setNewLname("");
        setNewEmail("");
        setNewContact("");
        setNewStatus("");
 
        setIsCreated(!isCreated); // Trigger the state update after successful API call
        handleClose();
      } catch (err) {
        // Handle error
        console.error("Error posting staff:", err);
      }
    } else {
      setShowErrorAlert(true);
 
      // Hide the error alert after 4 seconds
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
    }
  };
 
  //update staff
  const handleUpdateStaff = async (staffID) => {
    try {
      const id = staffID;
 
      const response = await axios.get(
        `http://localhost:8080/staff/getStaff/${id}`
      );
      const existingStaff = response.data;
 
      const updatedStaffData = {
        ...existingStaff,
        fname: selectedFName,
        lname: selectedLName,
        email: selectedEmail,
        contactNum: selectedContact,
        status: selectedStatus,
      };
 
      const updateResponse = await axios.put(
        `http://localhost:8080/staff/updateStaff?id=${id}`,
        updatedStaffData
      );
 
      handleUpdate();
      setOpenEditFormId(null);
      setSelectedFName("");
      setSelectedLName("");
      setSelectedEmail("");
      setSelectedContact("");
      setSelectedStatus("");
      console.log("Staff updated successfully:", updateResponse.data);
    } catch (err) {
      console.error("Error updating staff:", err);
    }
  };
 
  //delete staff
  const handleDeleteStaff = async (staffID) => {
    try {
      const id = staffID;
 
      const response = await axios.get(
        `http://localhost:8080/staff/getStaff/${id}`
      );
      const existingStaff = response.data;
 
      const deletedStaffData = {
        ...existingStaff,
        isDeleted: 1,
      };
 
      const deleteResponse = await axios.put(
        `http://localhost:8080/staff/updateStaff?id=${id}`,
        deletedStaffData
      );
 
      handleUpdate();
      setOpenDeleteFormId(null);
      console.log("Staff deleted successfully:", deleteResponse.data);
    } catch (err) {
      console.error("Error deleting staff:", err);
    }
  };
 
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames="fade" // CSS class prefix for transition styles
    >
      <div>
        <AdminHomeFrame />
        <div
          style={{
            height: "90vh",
            marginTop: "70px",
          }}
          className="mt-24 ml-64"
        >
          <div className="ml-16" sx={{ paddingTop: "40px" }}>
            <Box sx={{ width: "98%", height: "83vh" }}>
              <Button
                sx={{
                  margin: "12px 0px 12px 0px",
                  backgroundColor: "#FC3031",
                  "&:hover": {
                    backgroundColor: "#d12525",
                  },
                }}
                variant="contained"
                onClick={handleOpenCreateStaffForm}
              >
                New Staff
              </Button>
              <Dialog open={open} onClose={handleClose}>
                {showErrorAlert && (
                  <>
                    <Stack sx={{ width: "100%", marginTop: 2 }} spacing={2}>
                      <Alert severity="error">
                        Please fill all the fields!
                      </Alert>
                    </Stack>
                  </>
                )}
 
                <DialogContent
                  sx={{
                    borderTop: "20px solid #FC3031",
                    width: "500px",
                  }}
                >
                  {/* New Staff Form */}
                  <form action="" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="firstname">
                      Firstname:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <input
                      style={inputStyle}
                      type="text"
                      name="firstname"
                      id="firstname"
                      value={newFName}
                      onChange={(e) => setNewFname(e.target.value)}
                    />
                    <br />
                    <label htmlFor="lastname">
                      Lastname:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <input
                      style={inputStyle}
                      type="text"
                      name="lastname"
                      id="lastname"
                      value={newLName}
                      onChange={(e) => setNewLname(e.target.value)}
                    />
                    <br />
                    <label htmlFor="Email">
                      Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <input
                      style={inputStyle}
                      type="text"
                      name="Email"
                      id="Email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <br />
                    <label htmlFor="Mobile">
                      Mobile:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <input
                      style={inputStyle}
                      type="text"
                      name="Mobile"
                      id="Mobile"
                      value={newContact}
                      onChange={(e) => setNewContact(e.target.value)}
                    />
                    <br />
                    <label htmlFor="staff">
                      Status:
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
 
                    <select
                      style={inputStyle}
                      name="status"
                      id="status"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                    </select>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button
                    sx={{
                      backgroundColor: "#FC3031",
                      "&:hover": {
                        backgroundColor: "#d12525",
                      },
                      color: "white",
                    }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#FC3031",
                      "&:hover": {
                        backgroundColor: "#d12525",
                      },
                      color: "white",
                    }}
                    onClick={handleNewStaffSubmit}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Staff ID</TableCell>
                      <TableCell>Firstname</TableCell>
                      <TableCell>Lastname</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedStaff.map((row) => (
                      <TableRow
                        key={row.staffID}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.staffID}
                        </TableCell>
                        <TableCell>{row.fname}</TableCell>
                        <TableCell>{row.lname}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.contactNum}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>
                          <Button
                            sx={{
                              marginRight: "0px",
                            }}
                            onClick={() =>
                              handleOpenEditForm(
                                row.staffID,
                                row.fname,
                                row.lname,
                                row.email,
                                row.contactNum,
                                row.status
                              )
                            }
                          >
                            <CreateIcon sx={{ color: "#fc3031" }} />
                          </Button>
                          <Dialog
                            open={openEditFormId === row.staffID}
                            onClose={() => {
                              setOpenEditFormId(null);
                              setSelectedFName("");
                              setSelectedLName("");
                              setSelectedEmail("");
                              setSelectedContact("");
                              setSelectedStatus("");
                            }}
                          >
                            <DialogContent
                              sx={{
                                borderTop: "20px solid #FC3031",
                                width: "500px",
                              }}
                            >
                              {/* staff update form */}
                              <form
                                action=""
                                onSubmit={(e) => e.preventDefault()}
                              >
                                <label htmlFor={`staffFName-${row.staffID}`}>
                                  Firstname:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </label>
                                <input
                                  style={inputStyle}
                                  type="text"
                                  name={`staffFName-${row.staffID}`}
                                  id="staffFName"
                                  value={selectedFName}
                                  onChange={(e) =>
                                    setSelectedFName(e.target.value)
                                  }
                                />
                                <br />
                                <label htmlFor={`staffLName-${row.staffID}`}>
                                  Lastname:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </label>
                                <input
                                  style={inputStyle}
                                  type="text"
                                  name={`staffLName-${row.staffID}`}
                                  id="staffLName"
                                  value={selectedLName}
                                  onChange={(e) =>
                                    setSelectedLName(e.target.value)
                                  }
                                />
                                <br />
                                <label htmlFor={`staffEmail-${row.staffID}`}>
                                  Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </label>
                                <input
                                  style={inputStyle}
                                  type="text"
                                  name={`staffEmail-${row.staffID}`}
                                  id="staffEmail"
                                  value={selectedEmail}
                                  onChange={(e) =>
                                    setSelectedEmail(e.target.value)
                                  }
                                />
                                <br />
                                <label
                                  htmlFor={`staffContactNum-${row.staffID}`}
                                >
                                  Mobile:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </label>
                                <input
                                  style={inputStyle}
                                  type="text"
                                  name={`staffContactNum-${row.staffID}`}
                                  id="staffContactNum"
                                  value={selectedContact}
                                  onChange={(e) =>
                                    setSelectedContact(e.target.value)
                                  }
                                />
                                <br />
                                <label htmlFor={`staffStatus-${row.staffID}`}>
                                  Status:
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </label>
                                <select
                                  style={inputStyle}
                                  name={`staffStatus-${row.staffID}`}
                                  id="staffStatus"
                                  value={selectedStatus}
                                  onChange={(e) => {
                                    setSelectedStatus(e.target.value);
                                  }}
                                >
                                  <option value="">Select Staff</option>
                                  <option value="Available">Available</option>
                                  <option value="Occupied">Occupied</option>
                                </select>
                              </form>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                sx={{
                                  backgroundColor: "#FC3031",
                                  "&:hover": {
                                    backgroundColor: "#d12525",
                                  },
                                  color: "white",
                                }}
                                onClick={() => setOpenEditFormId(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                sx={{
                                  backgroundColor: "#FC3031",
                                  "&:hover": {
                                    backgroundColor: "#d12525",
                                  },
                                  color: "white",
                                }}
                                onClick={() => handleUpdateStaff(row.staffID)}
                              >
                                Submit
                              </Button>
                            </DialogActions>
                          </Dialog>
                          <Button
                            onClick={() => handleOpenDeleteForm(row.staffID)}
                          >
                            <DeleteIcon sx={{ color: "#fc3031" }} />
                          </Button>
                          <Modal
                            open={openDeleteFormId === row.staffID}
                            onClose={() => setOpenDeleteFormId(null)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box
                              sx={{
                                ...style,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                id="modal-modal-description"
                                sx={{ paddingBottom: "25px" }}
                              >
                                Are you sure you want to delete this staff?
                              </Typography>
                              <Box
                                sx={{
                                  width: "90%",
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "#FC3031",
                                    "&:hover": {
                                      backgroundColor: "#d12525",
                                    },
                                    marginRight: "10px",
                                  }}
                                  onClick={() => handleDeleteStaff(row.staffID)}
                                >
                                  Yes
                                </Button>
                                <Button
                                  sx={{
                                    backgroundColor: "#FC3031",
                                    "&:hover": {
                                      backgroundColor: "#d12525",
                                    },
                                  }}
                                  variant="contained"
                                  onClick={() => setOpenDeleteFormId(null)}
                                >
                                  No
                                </Button>
                              </Box>
                            </Box>
                          </Modal>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </div>
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Pagination
              count={Math.ceil(staff.length / rowsPerPage)} // Calculate total pages
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </div>
      </div>
    </CSSTransition>
  );
};
 
export default AdminManageStaff;
 