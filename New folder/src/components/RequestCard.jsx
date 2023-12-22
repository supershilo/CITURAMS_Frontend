import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
 
function RequestCard({
  uname,
  building,
  room,
  equipment,
  message,
  status,
  staff,
  date,
  remarksDateTime,
  admin,
  isRemarked,
  role,
  reqID,
  remarksMsg,
  onUpdate,
  onDelete,
  inputStaff,
  inputStatus,
  inputRemarks,
}) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
 
  const storedEmail = sessionStorage.getItem("userEmail");
  const [adminFullname, setAdminFullname] = useState("");
 
  const [staffAPI, setStaffAPI] = useState([]);
 
  const isAdmin = role === "admin";
  const isUserWithRemarks = !isAdmin && isRemarked === true;
 
  const inputStyle = {
    width: "50%",
    padding: "8px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    // Add more styles as needed
  };
 
  const textareaStyle = {
    width: "100%",
    padding: "8px",
 
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    height: "100px", // Set specific textarea styles
    resize: "vertical", // Allow vertical resizing
    // Add more textarea-specific styles as needed
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
 
  const remarksStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "0px 3px 50px 30px",
    borderTop: "20px solid #FC3031",
    borderRadius: "8px",
  };
 
  //fetching Admin name
  useEffect(() => {
    const fetchAdminFullname = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/getUserName/${storedEmail}`
        );
        setAdminFullname(response.data);
      } catch (err) {
        //not in 200 response range
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
 
    fetchAdminFullname();
  }, [storedEmail]);
 
  //fetch staff api
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/staff/getAllStaff"
        );
        setStaffAPI(response.data);
        console.log(response.data);
      } catch (err) {
        //not in 200 response range
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
 
    fetchStaff();
  }, []);
 
  const handleOpen = () => {
    setOpen(true);
    console.log("Opening dialog");
  };
  const handleOpenDelete = () => setOpenDelete(true);
 
  const handleClose = () => {
    setOpen(false);
    console.log("Close dialog");
  };
  const handleCloseDelete = () => setOpenDelete(false);
 
  return (
    <Card
      sx={{
        minWidth: 200,
        marginBottom: 2,
        padding: "8px",
        borderRadius: "8px",
        borderTop: "20px solid #FC3031",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography sx={{ paddingBottom: "15px", fontSize: "15px" }}>
                <b>Location: </b>&nbsp; {building} Bldg - {room}
              </Typography>
              <Typography sx={{ paddingBottom: "15px", fontSize: "15px" }}>
                <b>Equipment:</b>&nbsp; {equipment}
              </Typography>
              <Typography sx={{ paddingBottom: "15px", fontSize: "15px" }}>
                <b>Status:</b>&nbsp;{" "}
                <span
                  style={{
                    color:
                      status === "pending"
                        ? "red"
                        : status === "on-going"
                        ? "#ffd700"
                        : status === "resolved"
                        ? "green"
                        : "inherit",
                  }}
                >
                  {status}
                </span>
              </Typography>
              <Typography sx={{ paddingBottom: "15px", fontSize: "15px" }}>
                <b>Message:</b>&nbsp; {message}
              </Typography>
              <Typography sx={{ fontSize: "15px" }}>
                <b>Requested by:</b>&nbsp; {uname}
              </Typography>
            </div>
            <div>
              <Typography sx={{ paddingBottom: "15px", fontSize: "15px" }}>
                <b>Date:</b>&nbsp; {date}
              </Typography>
              <Typography sx={{ fontSize: "15px" }}>
                <b>Handled by:</b>&nbsp; {staff}
              </Typography>
            </div>
          </Box>
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {isUserWithRemarks && (
          <>
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                backgroundColor: "#FC3031",
                "&:hover": {
                  backgroundColor: "#d12525",
                },
                color: "white",
              }}
            >
              View Remarks
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={remarksStyle}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>Date:</b> &nbsp;{remarksDateTime}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>Admin:</b> &nbsp;{admin}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>Message:</b> &nbsp;{remarksMsg}
                </Typography>
              </Box>
            </Modal>
          </>
        )}
 
        {isAdmin && (
          <>
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                backgroundColor: "#FC3031",
                "&:hover": {
                  backgroundColor: "#d12525",
                },
              }}
            >
              Manage Request
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogContent
                sx={{
                  borderTop: "20px solid #FC3031",
                  width: "500px",
                }}
              >
                <form onSubmit={(e) => e.preventDefault()}>
                  <label htmlFor="staff">Assign Staff: &nbsp; </label>
                  <select
                    style={inputStyle}
                    name="staff"
                    id="staff"
                    ref={inputStaff}
                  >
                    <option value="">Select Staff</option>
                    {staffAPI.map((staff) => (
                      <option
                        key={staff.staffID}
                        value={`${staff.fname} ${staff.lname}`}
                      >
                        {staff.fname} {staff.lname}
                      </option>
                    ))}
                  </select>
                  <br />
                  <label htmlFor="status">
                    Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  <select
                    style={inputStyle}
                    name="status"
                    id="status"
                    ref={inputStatus}
                  >
                    <option value="">Select Status</option>
                    <option value="pending">pending</option>
                    <option value="on-going">ongoing</option>
                    <option value="resolved">resolved</option>
                  </select>
                  <br />
 
                  <textarea
                    style={textareaStyle}
                    id="remarksMsg"
                    placeholder=" Enter remarks"
                    required
                    ref={inputRemarks}
                  ></textarea>
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
                  onClick={() => handleClose()}
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
                  onClick={() => onUpdate(reqID)}
                >
                  Update
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
 
        <Button
          sx={{
            backgroundColor: "#FC3031",
            "&:hover": {
              backgroundColor: "#d12525",
            },
          }}
          variant="contained"
          onClick={handleOpenDelete}
        >
          Delete
        </Button>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
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
              Are you sure you want to delete this request?
            </Typography>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#FC3031",
                  "&:hover": {
                    backgroundColor: "#d12525",
                  },
                  marginRight: "10px",
                }}
                variant="contained"
                onClick={() => onDelete(reqID)}
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
                onClick={() => handleCloseDelete()}
              >
                No
              </Button>
            </Box>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
}
 
export default RequestCard;