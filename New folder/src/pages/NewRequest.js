import React, { useEffect, useState } from "react";
import HomeFrame from "../components/HomeFrame";
import { Divider, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import axios from "axios";

const Dropdown = ({ label, options, selectedOption, onChange }) => {
  let renderedOptions = null;

  if (label === "Building") {
    renderedOptions = [
      <option key="default" value="">
        Select Building
      </option>,
      ...options.map((option, index) => (
        <option key={index} value={option.building_id}>
          {option.buildingName}
        </option>
      )),
    ];
  } else if (label === "Room") {
    renderedOptions = [
      <option key="default" value="">
        Select Room
      </option>,
      ...options.map((option, index) => (
        <option key={index} value={option.roomID}>
          {option.roomName}
        </option>
      )),
    ];
  } else if (label === "Equipment") {
    renderedOptions = [
      <option key="default" value="">
        Select Equipment
      </option>,
      ...options.map((option, index) => (
        <option key={index} value={option.equipmentName}>
          {option.equipmentName}
        </option>
      )),
    ];
  }

  return (
    <div className="mb-4 mr-40">
      <label
        className="block font-bold text-lg mb-2 text-gray-700"
        htmlFor={label}
      >
        {label}:
      </label>
      <select
        style={{ color: "#333333" }}
        className="block w-44 p-2 bg-white text-base border rounded-md shadow-sm focus:outline-none focus:border-blue-300"
        id={label}
        value={selectedOption}
        onChange={onChange}
        required
      >
        {renderedOptions}
      </select>
    </div>
  );
};

const NewRequest = () => {
  const [building, setBuilding] = useState([]);
  const [room, setRoom] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const storedEmail = sessionStorage.getItem("userEmail");
  const [fullname, setFullname] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [loggedID, setLoggedID] = useState(0);
  const [isBuildingSelected, setIsBuildingSelected] = useState(false);
  const [isRoomSelected, setIsRoomSelected] = useState(false);
  const [isEquipmentSelected, setIsEquipmentSelected] = useState(false);
  const [isMessageSelected, setIsMessageSelected] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  //fetching buildings from api
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/building/getAllBuildings"
        );
        setBuilding(response.data);
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

    const fetchEquipments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/equipment/getAllEquipment"
        );
        setEquipment(response.data);
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

    const fetchFullname = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/getUserName/${storedEmail}`
        );
        setFullname(response.data);
        console.log("Full Name: " + response.data);
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

    fetchBuildings();
    fetchEquipments();
    fetchId();
    fetchFullname();
  }, [isSubmit]);

  //fetch room
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/room/getRoomsByBldgID/${selectedBuilding}`
        );
        setRoom(response.data);
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

    if (selectedBuilding) {
      fetchRooms();
    }
  }, [selectedBuilding]);

  //fetch Building name
  useEffect(() => {
    const fetchBuildingName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/building/getBuildingNameByID/${selectedBuilding}`
        );
        setBuildingName(response.data);
        console.log("Building Name: " + response.data);
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

    fetchBuildingName();
    console.log(buildingName);
  }, [selectedBuilding]);

  //fetch room name
  useEffect(() => {
    const fetchRoomName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/room/getRoomNameByID/${selectedRoom}`
        );
        setRoomName(response.data);
        console.log("Room Name: " + response.data);
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

    fetchRoomName();
    console.log(roomName);
  }, [selectedRoom]);

  function handleChangeBuilding(event) {
    const selectedValue = event.target.value;

    if (selectedValue === "") {
      setRoom([]);
      setSelectedBuilding("");
      setSelectedRoom("");
      setIsBuildingSelected(false);
    } else {
      setSelectedBuilding(selectedValue);
      setSelectedRoom("");
      setIsBuildingSelected(true);
    }
  }

  function handleChangeRoom(event) {
    setSelectedRoom(event.target.value);
    setIsRoomSelected(!!event.target.value);
  }

  function handleChangeEquipment(event) {
    setSelectedEquipment(event.target.value);
    setIsEquipmentSelected(!!event.target.value);
  }

  function handleChangeMessage(event) {
    setMessage(event.target.value);
    setIsMessageSelected(!!event.target.value.trim());
  }

  function handleSubmit(event) {
    event.preventDefault();

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

    if (
      isBuildingSelected &&
      isRoomSelected &&
      isEquipmentSelected &&
      isMessageSelected
    ) {
      const request = {
        userName: fullname,
        building: buildingName,
        room: roomName,
        equipment: selectedEquipment,
        message: message,
        date: currentDateTime,
        reqUserID: loggedID,
      };

      axios
        .post("http://localhost:8080/request/createRequest", request)
        .then((response) => {
          // Handle success
          console.log("Request posted successfully!", response.data);
          // Reset form fields or perform any other actions
          setBuilding([]);
          setRoom([]);
          setEquipment([]);
          setMessage("");
          setSelectedBuilding("");
          setSelectedRoom("");
          setBuildingName("");
          setRoomName("");
          setLoggedID(0);
        })
        .catch((error) => {
          // Handle error
          console.error("Error posting request:", error);
        });
      setIsSubmit(true);
    } else {
      setShowErrorAlert(true);

      // Hide the error alert after 4 seconds
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSubmit(false);
  };

  return (
    <div>
      <HomeFrame />
      <div className="mt-16 ml-48 ">
        <div className="ml-16">
          <div className="mt-0 -ml-12">
            <div className="ml-12">
              <div className="ml-12">
                <div className="p-12">
                  <div className="bg-gray-200 p-8 rounded-lg mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex justify-left">
                      Make a Request
                    </h2>
                    <Divider />
                    <hr />
                    {showErrorAlert && (
                      <>
                        <Stack sx={{ width: "100%", marginTop: 2 }} spacing={2}>
                          <Alert severity="error">
                            Please fill in all required fields!
                          </Alert>
                        </Stack>
                      </>
                    )}
                    <div
                      style={{ marginTop: "22px" }}
                      className="flex justify-center items-center mt-8"
                    >
                      <Dropdown
                        label="Building"
                        options={building}
                        selectedOption={selectedBuilding}
                        onChange={handleChangeBuilding}
                      />
                      <Dropdown
                        label="Room"
                        options={room}
                        selectedOption={selectedRoom}
                        onChange={handleChangeRoom}
                      />
                      <Dropdown
                        label="Equipment"
                        options={equipment}
                        selectedOption={selectedEquipment}
                        onChange={handleChangeEquipment}
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        className="ml-8 block font-bold text-lg mb-2 text-gray-700"
                        htmlFor="requestDescription"
                      >
                        Request Description:
                      </label>
                      <div className="overflow-hidden rounded-lg ml-8 mr-4 border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                        <textarea
                          id="requestMessage"
                          value={message}
                          className="p-2 w-full h-72 resize-none border-none align-top focus:ring-0 sm:text-sm"
                          rows="4"
                          placeholder=" Enter any request description..."
                          onChange={handleChangeMessage}
                        ></textarea>
                      </div>
                      <div className="mt-2 mr-4 flex justify-end">
                        <Stack spacing={2} sx={{ width: "10%", marginTop: 1 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{
                              fontFamily: "'Poppins', sans-serif",
                              marginTop: 2,
                              backgroundColor: "#FC3031",
                              "&:hover": {
                                backgroundColor: "#bd262a", // Change this to your desired hover color
                              },
                            }}
                          >
                            SUBMIT
                          </Button>

                          <Snackbar
                            open={isSubmit}
                            autoHideDuration={6000}
                            onClose={handleClose}
                          >
                            <Alert
                              onClose={handleClose}
                              severity="success"
                              sx={{ width: "100%" }}
                            >
                              Request Submitted Successfully!
                            </Alert>
                          </Snackbar>
                        </Stack>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRequest;
