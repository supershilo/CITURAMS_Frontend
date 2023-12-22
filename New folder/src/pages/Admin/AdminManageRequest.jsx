import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import AdminHomeFrame from "../../components/AdminHomeFrame";
import { CSSTransition } from "react-transition-group";
import RequestCard from "../../components/RequestCard";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import axios from "axios";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  transition: "opacity 5s ease", // Apply transition to opacity
}));

const AdminManageRequest = () => {
  const [ongoingRequestList, setOngoingRequestList] = useState([]);
  const [resolvedRequestList, setResolvedRequestList] = useState([]);
  const [allRequest, setAllRequest] = useState([]);
  const [value, setValue] = useState(0);
  const storedEmail = sessionStorage.getItem("userEmail");
  const [role, setRole] = useState("");
  const [loggedID, setLoggedID] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  //update states
  const inputStaff = useRef();
  const inputStatus = useRef();
  const inputRemarks = useRef();
  const [adminFullname, setAdminFullname] = useState("");

  // Add state for selected building and building options
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const buildingOptions = [
    "NGE",
    "GLE",
    "ACAD",
    "ALLIED",
    "RTL",
    "LINK",
    "G-PHYSLAB",
    "G-LECROOM",
  ];

  const filterRequestsByBuilding = (requests, building) => {
    if (building === "") {
      return requests; // Return all requests if no building is selected
    }
    return requests.filter((request) => request.building === building);
  };

  const filteredOngoingRequests = filterRequestsByBuilding(
    ongoingRequestList,
    selectedBuilding
  );
  const filteredResolvedRequests = filterRequestsByBuilding(
    resolvedRequestList,
    selectedBuilding
  );

  // Handle building selection change
  const handleBuildingChange = (event) => {
    setSelectedBuilding(event.target.value);
  };

  //fetch role by email
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/getRole/${storedEmail}`
        );
        setRole(response.data);
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

    fetchRole();
  }, []);

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

  //fetch userID by email
  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/getUserID/${storedEmail}`
        );
        setLoggedID(response.data);
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

    fetchId();
  }, []);

  //fetch all ongoing request from api
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/request/getAllOngoingRequest"
        );
        setOngoingRequestList(response.data);
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

    fetchRequests();
  }, [isUpdated, isDeleted]);

  //fetch all resolved request from api
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/request/getAllResolvedRequest"
        );
        setResolvedRequestList(response.data);
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

    fetchRequests();
  }, [isUpdated, isDeleted]);

  //fetch all request
  useEffect(() => {
    const fetchAllRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/request/getAllRequest`
        );
        setAllRequest(response.data);
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

    fetchAllRequest();
  }, []);

  //update request
  const handleUpdateRequest = async (reqID) => {
    try {
      const id = reqID;
      //fetch existing request data
      const response = await axios.get(
        `http://localhost:8080/request/getRequest/${id}`
      );
      const existingRequestData = response.data;

      const getCurrentDateTime = () => {
        return new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      };

      const currentDateTime = getCurrentDateTime();

      const inputtedStaff = inputStaff.current.value;
      const inputtedStatus = inputStatus.current.value;
      const inputtedRemarks = inputRemarks.current.value;

      const updatedRequestData = {
        ...existingRequestData,
        adminName: adminFullname,
        remarked: true,
        remarksDateTime: currentDateTime,
        staff: inputtedStaff,
        status: inputtedStatus,
        remarksMsg: inputtedRemarks,
      };

      const updateResponse = await axios.put(
        `http://localhost:8080/request/updateRequest?id=${id}`,
        updatedRequestData
      );

      handleUpdated();
      console.log("Request updated successfully:", updateResponse.data);
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  //delete request
  const handleDeleteRequest = async (reqID) => {
    try {
      const id = reqID;

      //fetch existing request data
      const response = await axios.get(
        `http://localhost:8080/request/getRequest/${id}`
      );
      const existingRequestData = response.data;

      const deletedRequestData = {
        ...existingRequestData,
        isDeleted: 1,
      };

      const deleteResponse = await axios.put(
        `http://localhost:8080/request/updateRequest?id=${id}`,
        deletedRequestData
      );

      handleDeleted();
      console.log("Request deleted successfully:", deleteResponse.data);
    } catch (err) {
      console.error("Error deleting request:", err);
    }
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{
          height: "75vh",
          backgroundColor: "#EDEDED",
          overflow: "auto",
        }}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function handleUpdated() {
    setIsUpdated(!isUpdated);
  }

  function handleDeleted() {
    setIsDeleted(!isDeleted);
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          className="mt-24 ml-64"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputLabel
            htmlFor="building-select"
            sx={{
              position: "absolute",
              top: 100, // Adjust to align label properly
              right: 260, // Adjust to position label properly
              background: "#fff", // Adjust as needed
              padding: "0 4px", // Adjust as needed
            }}
          >
            Filter by Building:
          </InputLabel>
          <Select
            id="building-select"
            sx={{
              position: "absolute",
              top: 98,
              right: 130,
              zIndex: 1,
              fontSize: "0.8rem",
              padding: "0px 0px",
              minWidth: "130px",
              height: "30px",
            }}
            value={selectedBuilding}
            onChange={handleBuildingChange}
          >
            <MenuItem value="">All Buildings</MenuItem>
            {buildingOptions.map((building, index) => (
              <MenuItem key={index} value={building}>
                {building}
              </MenuItem>
            ))}
          </Select>
          <div className="ml-16" style={{ width: "75%" }}>
            <Box
              sx={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#ededed",
              }}
            >
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  indicatorColor="transparent"
                  textColor="inherit"
                >
                  <Tab
                    sx={{
                      backgroundColor: value === 0 ? "#EDEDED" : "#B4B4B4",
                      marginRight: "10px",
                      borderRadius: "10px 10px 0px 0px",
                      fontWeight: "bold",
                      color: "#45474B",
                      padding: "0px 20px 0px 20px",
                    }}
                    label="Ongoing"
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{
                      backgroundColor: value === 1 ? "#EDEDED" : "#B4B4B4",
                      borderRadius: "10px 10px 0px 0px",
                      fontWeight: "bold",
                      color: "#45474B",
                      padding: "0px 20px 0px 20px",
                    }}
                    label="Resolved"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                {filteredOngoingRequests.map((request, index) => {
                  return (
                    <RequestCard
                      key={index}
                      uname={request.userName}
                      building={request.building}
                      room={request.room}
                      equipment={request.equipment}
                      message={request.message}
                      status={request.status}
                      staff={request.staff}
                      date={request.date}
                      admin={request.adminName}
                      isRemarked={request.remarked}
                      role={role}
                      reqID={request.requestID}
                      remarksDateTime={request.remarksDateTime}
                      remarkMsg={request.remarkMsg}
                      onUpdate={handleUpdateRequest}
                      onDelete={handleDeleteRequest}
                      inputStaff={inputStaff}
                      inputStatus={inputStatus}
                      inputRemarks={inputRemarks}
                    />
                  );
                })}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                {filteredResolvedRequests.map((request, index) => {
                  return (
                    <RequestCard
                      key={index}
                      uname={request.userName}
                      building={request.building}
                      room={request.room}
                      equipment={request.equipment}
                      message={request.message}
                      status={request.status}
                      staff={request.staff}
                      date={request.date}
                      admin={request.adminName}
                      isRemarked={request.remarked}
                      role={role}
                      reqID={request.requestID}
                      remarksDateTime={request.remarksDateTime}
                      onUpdate={handleUpdateRequest}
                      onDelete={handleDeleteRequest}
                      inputStaff={inputStaff}
                      inputStatus={inputStatus}
                      inputRemarks={inputRemarks}
                    />
                  );
                })}
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default AdminManageRequest;
