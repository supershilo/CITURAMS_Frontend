import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import HomeFrame from "../components/HomeFrame";
import { CSSTransition } from "react-transition-group";
import RequestCard from "../components/RequestCard";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

import axios from "axios";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  transition: "opacity 5s ease", // Apply transition to opacity
}));

const MyRequest = () => {
  const [ongoingRequestList, setOngoingRequestList] = useState([]);
  const [resolvedRequestList, setResolvedRequestList] = useState([]);
  const [value, setValue] = useState(0);
  const storedEmail = sessionStorage.getItem("userEmail");
  const [loggedID, setLoggedID] = useState(0);
  const [role, setRole] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  //fetch role by email
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/getRole/${storedEmail}`
        );
        setRole(response.data);
        console.log(response.data);
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

  //fetch ongoing request from api
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
  }, [isDeleted]);

  //fetch resolved request from api
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
  }, [isDeleted]);

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

  //filter ongoing request list
  const filteredOngoingRequestList = ongoingRequestList.filter(
    (request, index) => {
      return request.reqUserID === loggedID;
    }
  );

  //filter resolved request list
  const filterResolvedRequestList = resolvedRequestList.filter(
    (request, index) => {
      return request.reqUserID === loggedID;
    }
  );

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

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleDeleted() {
    setIsDeleted((prevDeleted) => !prevDeleted);
  }

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames="fade" // CSS class prefix for transition styles
    >
      <div>
        <HomeFrame />
        <div
          className="mt-24 ml-64"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                    label="Ongoing Request"
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
                    label="Resolved Request"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                {filteredOngoingRequestList.map((request, index) => {
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
                      remarksDateTime={request.remarksDateTime}
                      admin={request.adminName}
                      remarksMsg={request.remarksMsg}
                      role={role}
                      reqID={request.requestID}
                      isRemarked={request.remarked}
                      onDelete={handleDeleteRequest}
                    />
                  );
                })}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                {filterResolvedRequestList.map((request, index) => {
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
                      remarksDateTime={request.remarksDateTime}
                      admin={request.adminName}
                      role={role}
                      reqID={request.requestID}
                      remarksMsg={request.remarksMsg}
                      isRemarked={request.remarked}
                      onDelete={handleDeleteRequest}
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

export default MyRequest;
