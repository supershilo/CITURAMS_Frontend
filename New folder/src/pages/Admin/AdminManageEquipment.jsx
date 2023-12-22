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

const AdminManageEquipment = () => {
  const [equipments, setEquipments] = useState([]);
  const [newEquipmentName, setNewEquipmentName] = useState("");
  const [editEquipmentName, setEditEquipmentName] = useState("");

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

  // Slice the equipments array to display only the items for the current page
  const displayedEquipments = equipments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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

  // State to store the existing equipment name for the selected row
  const [selectedEquipmentName, setSelectedEquipmentName] = useState("");

  const handleOpenCreateEqpmtForm = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    setIsUpdated(!isUpdated);
  };

  const handleOpenEditForm = (equipmentID, equipmentName) => {
    setOpenEditFormId(equipmentID);
    setSelectedEquipmentName(equipmentName);
    setEditEquipmentName(equipmentName);
  };

  const handleOpenDeleteForm = (equipmentID) => {
    setOpenDeleteFormId(equipmentID);
  };

  //fetch all equipment
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/equipment/getAllEquipment`
        );
        setEquipments(response.data);
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

    fetchEquipment();
  }, [isCreated, isUpdated]);

  //create new equipment
  const handleNewEquipmentSubmit = async () => {
    if (newEquipmentName !== "") {
      const equipment = {
        equipmentName: newEquipmentName,
      };

      try {
        const response = await axios.post(
          `http://localhost:8080/equipment/createEquipment`,
          equipment
        );

        // Handle success
        console.log("Equipment posted successfully!", response.data);
        // Reset form field
        setNewEquipmentName("");

        setIsCreated(!isCreated);
        handleClose();
      } catch (err) {
        // Handle error
        console.error("Error posting request:", err);

        setShowErrorAlert(true);

        // Hide the error alert after 4 seconds
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 3000);
      }
    } else {
      setShowErrorAlert(true);

      // Hide the error alert after 4 seconds
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
    }
  };

  //update equipment
  const handleUpdateEquipment = async (eqptID) => {
    try {
      const id = eqptID;

      const response = await axios.get(
        `http://localhost:8080/equipment/getEquipment/${id}`
      );
      const existingEquipment = response.data;

      const updatedEquipmentData = {
        ...existingEquipment,
        equipmentName: selectedEquipmentName,
      };

      const updateResponse = await axios.put(
        `http://localhost:8080/equipment/updateEquipment?id=${id}`,
        updatedEquipmentData
      );

      handleUpdate();
      setOpenEditFormId(null);
      setSelectedEquipmentName("");
      console.log("Equipment updated successfully:", updateResponse.data);
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  //delete equipment
  const handleDeleteEquipment = async (eqptID) => {
    try {
      const id = eqptID;

      const response = await axios.get(
        `http://localhost:8080/equipment/getEquipment/${id}`
      );
      const existingEquipment = response.data;

      const deletedEquipmentData = {
        ...existingEquipment,
        isDeleted: 1,
      };

      const deleteResponse = await axios.put(
        `http://localhost:8080/equipment/updateEquipment?id=${id}`,
        deletedEquipmentData
      );

      handleUpdate();
      setOpenDeleteFormId(null);
      console.log("Equipment deleted successfully:", deleteResponse.data);
    } catch (err) {
      console.error("Error deleting request:", err);
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
                onClick={handleOpenCreateEqpmtForm}
              >
                New Equipment
              </Button>
              <Dialog open={open} onClose={handleClose}>
                {showErrorAlert && (
                  <>
                    <Stack sx={{ width: "100%", marginTop: 2 }} spacing={2}>
                      <Alert severity="error">Please fill the field!</Alert>
                    </Stack>
                  </>
                )}

                <DialogContent
                  sx={{
                    borderTop: "20px solid #FC3031",
                    width: "500px",
                  }}
                >
                  <form action="" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="equipment">
                      Equipment name:&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <input
                      style={inputStyle}
                      type="text"
                      name="equipment"
                      id="equipment"
                      value={newEquipmentName}
                      onChange={(e) => setNewEquipmentName(e.target.value)}
                    />
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
                    onClick={handleNewEquipmentSubmit}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Equipment ID</TableCell>
                      <TableCell>Equipment Name</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedEquipments.map((row) => (
                      <TableRow
                        key={row.equipmentID}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.equipmentID}
                        </TableCell>
                        <TableCell>{row.equipmentName}</TableCell>
                        <TableCell>
                          <Button
                            sx={{
                              marginRight: "20px",
                            }}
                            onClick={() =>
                              handleOpenEditForm(
                                row.equipmentID,
                                row.equipmentName
                              )
                            }
                          >
                            <CreateIcon sx={{ color: "#fc3031" }} />
                          </Button>
                          <Dialog
                            open={openEditFormId === row.equipmentID}
                            onClose={() => {
                              setOpenEditFormId(null);
                              setSelectedEquipmentName("");
                            }}
                          >
                            <DialogContent
                              sx={{
                                borderTop: "20px solid #FC3031",
                                width: "500px",
                              }}
                            >
                              <form
                                action=""
                                onSubmit={(e) => e.preventDefault()}
                              >
                                <label
                                  htmlFor={`equipmentName-${row.equipmentID}`}
                                >
                                  Equipment name:&nbsp;&nbsp;&nbsp;&nbsp;
                                </label>
                                <input
                                  style={inputStyle}
                                  type="text"
                                  name={`equipmentName-${row.equipmentID}`}
                                  id="equipmentNAme"
                                  value={selectedEquipmentName}
                                  onChange={(e) =>
                                    setSelectedEquipmentName(e.target.value)
                                  }
                                />
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
                                onClick={() =>
                                  handleUpdateEquipment(row.equipmentID)
                                }
                              >
                                Submit
                              </Button>
                            </DialogActions>
                          </Dialog>
                          <Button
                            onClick={() =>
                              handleOpenDeleteForm(row.equipmentID)
                            }
                          >
                            <DeleteIcon sx={{ color: "#fc3031" }} />
                          </Button>
                          <Modal
                            open={openDeleteFormId === row.equipmentID}
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
                                Are you sure you want to delete this equipment?
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
                                  onClick={() =>
                                    handleDeleteEquipment(row.equipmentID)
                                  }
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
              count={Math.ceil(equipments.length / rowsPerPage)} // Calculate total pages
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </div>
      </div>
    </CSSTransition>
  );
};

export default AdminManageEquipment;
