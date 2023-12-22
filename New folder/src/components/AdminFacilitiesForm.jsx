import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	IconButton,
	Modal,
	TextField,
	Grid,
	Snackbar,
	SnackbarContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EquipmentIcon from '@mui/icons-material/Build';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:hover": {
		backgroundColor: "#eeeeee",
	},
	"&.active": {
		backgroundColor: "#FC3031",
		color: "white",
		"& .editIcon": {
			visibility: "visible",
		},
	},
}));

const ManageFacilitiesTable = () => {
	const navigate = useNavigate();
	const [selectedBuilding, setSelectedBuilding] = useState("");
	const [selectedRow, setSelectedRow] = useState(null);
	const [selectedRowIndex, setSelectedRowIndex] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [updatedBuildingName, setUpdatedBuildingName] = useState("");
	const [allData, setAllData] = useState([]);
	const [buildingData, setBuildingData] = useState([]);
	const [CreateBuildingModalOpen, setCreateBuildingModalOpen] = useState(false);
	const [newBuildingName, setNewBuildingName] = useState("");
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [updateSuccessOpen, setUpdateSuccessOpen] = useState(false);
	const [updated, setUpdate] = useState(false);
	const [newRoomName, setNewRoomName] = useState("");
	const [selectedBuildingForRoom, setSelectedBuildingForRoom] = useState("");
	const [createRoomOpen, setCreateRoomOpen] = useState(false);
	const [roomSnackbarOpen, setRoomSnackbarOpen] = useState(false);
	const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
	const [roomDeleteId, setRoomDeleteId] = useState(null);
	const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
	const [deleteBuildingConfirmationOpen, setDeleteBuildingConfirmationOpen] =
		useState(false);
	const [buildingDeleteId, setBuildingDeleteId] = useState(null);
	const [deleteBuildingSnackbarOpen, setDeleteBuildingSnackbarOpen] =
		useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editedRoomName, setEditedRoomName] = useState("");
	const [editedRoomId, setEditedRoomId] = useState(null);
	const [roomUpdatedSb, setRoomUpdatedSb] = useState(false);

	useEffect(() => {
		// Fetch rooms in the database via API
		axios
			.get("http://localhost:8080/room/getAllRooms")
			.then((response) => {
				setAllData(response.data);
			})
			.catch((error) => {
				console.error("Error fetching rooms:", error);
			});

		axios
			.get("http://localhost:8080/building/getAllBuildings")
			.then((response) => {
				setBuildingData(response.data);
			})
			.catch((error) => {
				console.error("Error fetching buildings:", error);
			});
	}, [updated]);
	console.log(buildingData);

	const handleSaveUpdate = () => {
		const buildingId = filteredData[selectedRowIndex]?.buildingID;

		axios
			.put(`http://localhost:8080/building/updateBuilding?id=${buildingId}`, {
				buildingName: updatedBuildingName,
			})
			.then((response) => {
				console.log("Building updated successfully:", response.data);
				setUpdate(!updated);
				setUpdateSuccessOpen(true);
			})
			.catch((error) => {
				console.error("Error updating building:", error);
			});

		setIsModalOpen(false);
	};

	/*UPDATE ROOM NAME */
	const handleSaveEdit = (event) => {
		event.preventDefault();
		axios
			.put(`http://localhost:8080/room/updateRoom?id=${editedRoomId}`, {
				roomName: editedRoomName,
			})
			.then((response) => {
				console.log("Room updated successfully:", response.data);
				setUpdate(!updated);
				setRoomUpdatedSb(true);
			})
			.catch((error) => {
				console.error("Error updating room:", error);
			});

		setIsEditModalOpen(false);
	};
	const handleEditClick = (id, roomName) => {
		setEditedRoomId(id);
		setEditedRoomName(roomName);
		setIsEditModalOpen(true);
	};

	const handleDeleteBuildingClick = (id) => {
		setBuildingDeleteId(id);
		setDeleteBuildingConfirmationOpen(true);
	};

	const handleCancelDeleteBuilding = () => {
		setDeleteBuildingConfirmationOpen(false);
		setBuildingDeleteId(null);
	};

	const handleConfirmDeleteBuilding = () => {
		axios
			.delete(
				`http://localhost:8080/building/deleteBuilding/${buildingDeleteId}`
			)
			.then((response) => {
				console.log(response.data);
				setUpdate(!updated);
				setDeleteBuildingSnackbarOpen(true);
			})
			.catch((error) => {
				console.error("Error deleting Building:", error);
			})
			.finally(() => {
				setDeleteBuildingConfirmationOpen(false);
			});
	};
	const handleConfirmDelete = () => {
		axios
			.delete(`http://localhost:8080/room/deleteRoom/${roomDeleteId}`)
			.then((response) => {
				console.log(response.data);
				setUpdate(!updated);
				setDeleteSnackbarOpen(true);
			})
			.catch((error) => {
				console.error("Error deleting Room:", error);
			})
			.finally(() => {
				setDeleteConfirmationOpen(false);
			});
	};

	const handleDeleteClick = (id) => {
		setRoomDeleteId(id);
		setDeleteConfirmationOpen(true);
	};

	const handleCancelDelete = () => {
		setDeleteConfirmationOpen(false);
		setRoomDeleteId(null);
	};

	const handleSaveCreate = (event) => {
		event.preventDefault();
		axios
			.post("http://localhost:8080/building/createBuilding", {
				buildingName: newBuildingName,
			})
			.then((response) => {
				console.log("Building created successfully:", response.data);
				axios
					.get("http://localhost:8080/building/getAllBuildings")
					.then((response) => {
						setBuildingData(response.data);
					})
					.catch((error) => {
						console.error("Error fetching buildings:", error);
					});
				setSnackbarOpen(true);
			})
			.catch((error) => {
				console.error("Error creating building:", error);
			});

		handleCreateBuildingModalClose();
		setNewBuildingName("");
	};

	const handleCreateRoom = (event) => {
		event.preventDefault();
		axios
			.post("http://localhost:8080/room/createRoom", {
				roomName: newRoomName,
				buildingID: selectedBuildingForRoom,
			})
			.then((response) => {
				console.log("Room created successfully:", response.data);
				setUpdate(!updated);
				setRoomSnackbarOpen(true);
			})
			.catch((error) => {
				console.error("Error creating room:", error);
			});
		setCreateRoomOpen(false);
		setNewRoomName("");
	};

	const filteredData = selectedBuilding
		? allData.filter(
				(item) =>
					item.buildingID ===
					buildingData.find((b) => b.buildingName === selectedBuilding)
						?.building_id
		  )
		: allData;

	const handleFilterChange = (event) => {
		setSelectedBuilding(event.target.value);
		setSelectedRow(null); // Reset selected row when changing the filter
	};

	const handleCreateRoomModal = () => {
		setCreateRoomOpen(true);
	};

	const handleRoomModalClose = () => {
		setCreateRoomOpen(false);
	};

	const handleTableRowClick = (index) => {
		setSelectedRow(index);
		setSelectedRowIndex(index);
		console.log(allData);
		console.log(buildingData);
		setUpdatedBuildingName(filteredData[index]?.buildingName || "");
	};
	// <-UPDATE BUILDING NAME ->
	const handleUpdateClick = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	

	//<- BUILDING MODAL ->
	const handleCreateBuilding = () => {
		setCreateBuildingModalOpen(true);
	};

	const handleCreateBuildingModalClose = () => {
		setCreateBuildingModalOpen(false);
	};

	const handleCreateEquipment = () => {
		navigate("/manage-facilities/manage-equipment")
	};

	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<FormControl
						style={{
							marginBottom: "16px",
							borderRadius: "4px",
							width: "35%",
							marginLeft: "20px",
						}}
					>
						<InputLabel id="building-label">Select Building</InputLabel>
						<Select
							value={selectedBuilding}
							onChange={handleFilterChange}
							variant="standard"
						>
							<MenuItem key="all">All Building</MenuItem>
							{buildingData.map((building) => (
								<MenuItem
									key={building.building_id}
									value={building.buildingName}
								>
									{building.buildingName}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid
					item
					xs={2}
					style={{ display: "flex", justifyContent: "flex-end" }}
				>
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddIcon />}
						onClick={handleCreateBuilding}
						style={{
							height: "35px",
							textTransform: "none",
							marginTop: "15px",
							fontSize: "10px",
							fontFamily: "'Poppins'",
							backgroundColor: "#FC3031",
						}}
					>
						Building
					</Button>
				</Grid>
				<Grid
					item
					xs={2}
					style={{ display: "flex", justifyContent: "flex-end" }}
				>
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddIcon />}
						onClick={handleCreateRoomModal}
						style={{
							height: "35px",
							textTransform: "none",
							marginTop: "15px",
							paddingLeft: "5px",
							marginRight: "53px",
							fontSize: "10px",
							fontFamily: "'Poppins'",
							backgroundColor: "#FC3031",
							width: "100%",
						}}
					>
						Room
					</Button>
				</Grid>
				<Grid
					item
					xs={2}
					style={{ display: "flex", justifyContent: "flex-start" }}
				>
					<Button
						variant="contained"
						color="primary"
						startIcon={<EquipmentIcon style={{ fontSize: "15px" }} />}
						onClick={handleCreateEquipment}
						style={{
							height: "35px",
							textTransform: "none",
							marginTop: "15px",
							fontSize: "10px",
							fontFamily: "'Poppins'",
							backgroundColor: "#FC3031",
						}}
					>
						Equipments
					</Button>
				</Grid>
			</Grid>

			{/* Table */}
			<TableContainer
				component={Paper}
				style={{
					width: "100%",
					overflowX: "auto",
					boxShadow: "none",
				}}
			>
				<Table
					sx={{
						minWidth: 650,
						"& .MuiTableCell-root": { height: "50px" },
					}}
					aria-label="simple table"
					size="small"
				>
					<TableHead>
						<TableRow>
							<TableCell
								style={{
									fontWeight: "bold",
									fontFamily: "'Poppins',san-serif",
									fontSize: "18px",
								}}
							>
								Building Name
							</TableCell>
							<TableCell
								style={{
									fontWeight: "bold",
									fontFamily: "'Poppins',san-serif",
									fontSize: "18px",
									paddingLeft: "70px",
								}}
							>
								Room #
							</TableCell>
							<TableCell style={{ paddingRight: "10px" }}></TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{filteredData.map((item, index) => (
							<StyledTableRow
								key={index}
								onClick={() => handleTableRowClick(index)}
								className={selectedRow === index ? "active" : ""}
							>
								<TableCell
									type="small"
									style={{
										paddingLeft: "50px",
										color: selectedRow === index ? "white" : "inherit",
										fontSize: "17px",
										width: "50%",
									}}
								>
									{buildingData.find(
										(building) => building.building_id === item.buildingID
									)?.buildingName || ""}

									<IconButton
										size="small"
										className="editIcon"
										onClick={handleUpdateClick}
										disabled={selectedRow === null}
										style={{
											visibility: selectedRow === index ? "visible" : "hidden",
											color: "white",
											marginLeft: "50%",
										}}
									>
										<EditIcon />
									</IconButton>
									<IconButton
										size="small"
										onClick={() => handleDeleteBuildingClick(item.buildingID)}
										disabled={selectedRow === null}
										style={{
											visibility: selectedRow === index ? "visible" : "hidden",
											color: "white",
										}}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
								<TableCell
									type="small"
									style={{
										paddingLeft: "80px",
										color: selectedRow === index ? "white" : "inherit",
										fontSize: "17px",
										width: "50%",
									}}
								>
									{item.roomName}
									<IconButton // EDIT BUTTON
										size="small"
										className="editIcon"
										onClick={() => handleEditClick(item.roomID, item.roomName)}
										disabled={selectedRow === null}
										style={{
											visibility: selectedRow === index ? "visible" : "hidden",
											color: "white",
											marginLeft: "40%",
										}}
									>
										<EditIcon />
									</IconButton>

									<IconButton // DELETE BUTTON
										size="small"
										className="deleteIcon"
										onClick={() => handleDeleteClick(item.roomID)}
										disabled={selectedRow === null}
										style={{
											visibility: selectedRow === index ? "visible" : "hidden",
											color: "white",
										}}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
								<TableCell
									style={{
										width: "10%",
									}}
								></TableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{/*MODALS*/}

			<Modal
				open={CreateBuildingModalOpen}
				onClose={handleCreateBuildingModalClose}
				aria-labelledby="create-building-modal-title"
				aria-describedby="create-building-modal-description"
			>
				<form onSubmit={handleSaveCreate}>
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: "500px",
							height: "200px",
							background: "white",
							padding: "16px 20px 16px 20px",
							borderRadius: "8px",
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "10px",
								fontWeight: "bold",
								fontSize: "25px",
							}}
						>
							<ApartmentIcon style={{ marginRight: "8px", color: "#FC3031" }} />
							Create Building
						</div>
						<TextField
							required
							label="Enter Building Name"
							variant="outlined"
							fullWidth
							value={newBuildingName}
							onChange={(e) => setNewBuildingName(e.target.value)}
						/>
						<div
							style={{
								marginTop: "16px",
								display: "flex",
								justifyContent: "flex-end",
							}}
						>
							<Button
								variant="text"
								onClick={handleCreateBuildingModalClose}
								sx={{
									color: "#000000",
									marginRight: "5px",
									width: "70px",
									fontSize: "14px",
									fontFamily: "'Poppins'",
									textTransform: "none",
									backgroundColor: "#dddddd",
									"&:hover": {
										backgroundColor: "#d5d5d5",
									},
								}}
							>
								Cancel
							</Button>
							<Button
								variant="contained"
								type="submit"
								color="success"
								sx={{
									backgroundColor: "#0be362",
									width: "70px",
									textTransform: "none",
									fontSize: "14px",
									fontFamily: "'Poppins'",
									"&:hover": {
										backgroundColor: "#2ad452",
									},
								}}
							>
								Save
							</Button>
						</div>
					</div>
				</form>
			</Modal>
			{/* DELETE CONFIRMATION MODAL */}
			<Modal
				open={deleteConfirmationOpen}
				onClose={handleCancelDelete}
				aria-labelledby="delete-confirmation-modal-title"
				aria-describedby="delete-confirmation-modal-description"
			>
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "400px",
						height: "150px",
						background: "white",
						padding: "16px 20px 16px 20px",
						borderRadius: "8px",
					}}
				>
					<div
						style={{
							fontWeight: "bold",
							fontSize: "20px",
							marginBottom: "10px",
						}}
					>
						<DeleteIcon style={{ marginRight: "8px", color: "#FC3031" }} />
						Confirm Delete
					</div>
					<div>Are you sure you want to delete this room?</div>
					<div
						style={{
							marginTop: "20px",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Button
							variant="text"
							onClick={handleCancelDelete}
							sx={{
								color: "#000000",
								marginRight: "5px",
								width: "70px",
								fontSize: "14px",
								fontFamily: "'Poppins'",
								textTransform: "none",
								backgroundColor: "#dddddd",
								"&:hover": {
									backgroundColor: "#d5d5d5",
								},
							}}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							onClick={handleConfirmDelete}
							color="error"
							sx={{
								backgroundColor: "#FC3031",
								width: "70px",
								textTransform: "none",
								fontSize: "14px",
								fontFamily: "'Poppins'",
								"&:hover": {
									backgroundColor: "#dd453a",
								},
							}}
						>
							Delete
						</Button>
					</div>
				</div>
			</Modal>
			{/* Update Modal */}
			<Modal
				open={isModalOpen}
				onClose={handleModalClose}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<form onSubmit={handleSaveUpdate}>
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: "500px",
							height: "200px",
							background: "white",
							padding: "16px 20px 16px 20px",
							borderRadius: "8px",
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "10px",
								fontWeight: "bold",
								fontSize: "25px",
							}}
						>
							<ApartmentIcon style={{ marginRight: "8px", color: "#FC3031" }} />
							Update Building
						</div>

						<TextField
							required
							label="Building Name"
							variant="outlined"
							fullWidth
							value={updatedBuildingName}
							onChange={(event) => setUpdatedBuildingName(event.target.value)}
						/>
						<div
							style={{
								marginTop: "16px",
								display: "flex",
								justifyContent: "flex-end",
							}}
						>
							<Button
								variant="text"
								onClick={handleModalClose}
								sx={{
									color: "#000000",
									marginRight: "5px",
									width: "70px",
									fontSize: "14px",
									fontFamily: "'Poppins'",
									textTransform: "none",
									backgroundColor: "#dddddd",
									"&:hover": {
										backgroundColor: "#d5d5d5",
									},
								}}
							>
								Cancel
							</Button>
							<Button
								type="Submit"
								variant="contained"
								color="success"
								sx={{
									backgroundColor: "#0be362",
									width: "70px",
									textTransform: "none",
									fontSize: "14px",
									fontFamily: "'Poppins'",
									"&:hover": {
										backgroundColor: "#2ad452",
									},
								}}
							>
								Save
							</Button>
						</div>
					</div>
				</form>
			</Modal>
			{/*ROOM MODAL */}
			<Modal
				open={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				aria-labelledby="edit-room-modal-title"
				aria-describedby="edit-room-modal-description"
			>
				<form onSubmit={handleSaveEdit}>
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: "500px",
							height: "200px",
							background: "white",
							padding: "16px 20px 16px 20px",
							borderRadius: "8px",
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "10px",
								fontWeight: "bold",
								fontSize: "25px",
							}}
						>
							<MeetingRoomIcon style={{ marginRight: "8px", color: "#FC3031" }} />
							Update Room
						</div>
						<TextField
							required
							label="Enter Room Name"
							variant="outlined"
							fullWidth
							value={editedRoomName}
							onChange={(e) => setEditedRoomName(e.target.value)}
						/>
						<div
							style={{
								marginTop: "16px",
								display: "flex",
								justifyContent: "flex-end",
							}}
						>
							<Button
								variant="text"
								onClick={() => setIsEditModalOpen(false)}
								sx={{
									color: "#000000",
									marginRight: "5px",
									width: "70px",
									fontSize: "14px",
									fontFamily: "'Poppins'",
									textTransform: "none",
									backgroundColor: "#dddddd",
									"&:hover": {
										backgroundColor: "#d5d5d5",
									},
								}}
							>
								Cancel
							</Button>
							<Button
								variant="contained"
								type="submit"
								color="success"
								sx={{
									backgroundColor: "#0be362",
									width: "70px",
									textTransform: "none",
									fontSize: "14px",
									fontFamily: "'Poppins'",
									"&:hover": {
										backgroundColor: "#2ad452",
									},
								}}
							>
								Save
							</Button>
						</div>
					</div>
				</form>
			</Modal>

			<Modal
				open={createRoomOpen}
				onClose={handleRoomModalClose}
				aria-labelledby="create-room-modal-title"
				aria-describedby="create-room-modal-description"
			>
				<form onSubmit={handleCreateRoom}>
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: "600px",
							height: "250px",
							background: "white",
							padding: "16px 20px 16px 20px",
							borderRadius: "8px",
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "5px",
								fontWeight: "bold",
								fontSize: "25px",
							}}
						>
							<ApartmentIcon style={{ marginRight: "8px", color: "#FC3031" }} />
							Create Room
						</div>
						<FormControl style={{ width: "30%", marginBottom: "10px" }}>
							<InputLabel id="building-for-room-label">
								Select Building
							</InputLabel>
							<Select
								labelId="building-for-room-label"
								value={selectedBuildingForRoom}
								onChange={(e) => setSelectedBuildingForRoom(e.target.value)}
								variant="standard"
								required
							>
								{buildingData.map((building) => (
									<MenuItem
										key={building.building_id}
										value={building.building_id}
									>
										{building.buildingName}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							required
							label="Enter Room Name"
							variant="outlined"
							fullWidth
							value={newRoomName}
							onChange={(e) => setNewRoomName(e.target.value)}
							style={{ marginBottom: "10px" }}
						/>
						<div
							style={{
								marginTop: "10px",
								display: "flex",
								justifyContent: "flex-end",
								marginLeft: "74%",
							}}
						>
							<Button
								variant="text"
								onClick={handleRoomModalClose}
								sx={{
									color: "#000000",
									marginRight: "5px",
									width: "70px",
									fontSize: "14px",
									fontFamily: "'Poppins'",
									textTransform: "none",
									backgroundColor: "#dddddd",
									"&:hover": {
										backgroundColor: "#d5d5d5",
									},
								}}
							>
								Cancel
							</Button>
							<Button
								variant="contained"
								type="submit"
								color="success"
								sx={{
									backgroundColor: "#0be362",
									width: "70px",
									textTransform: "none",
									fontSize: "14px",
									fontFamily: "'Poppins'",

									"&:hover": {
										backgroundColor: "#2ad452",
									},
								}}
							>
								Save
							</Button>
						</div>
					</div>
				</form>
			</Modal>
			<Modal
				open={deleteBuildingConfirmationOpen}
				onClose={handleCancelDeleteBuilding}
				aria-labelledby="delete-building-confirmation-modal-title"
				aria-describedby="delete-building-confirmation-modal-description"
			>
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "400px",
						height: "150px",
						background: "white",
						padding: "16px 20px 16px 20px",
						borderRadius: "8px",
					}}
				>
					<div
						style={{
							fontWeight: "bold",
							fontSize: "20px",
							marginBottom: "10px",
						}}
					>
						<DeleteIcon style={{ marginRight: "8px", color: "#FC3031" }} />
						Confirm Delete
					</div>
					<div>Are you sure you want to delete this building?</div>
					<div
						style={{
							marginTop: "20px",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Button
							variant="text"
							onClick={handleCancelDeleteBuilding}
							sx={{
								color: "#000000",
								marginRight: "5px",
								width: "70px",
								fontSize: "14px",
								fontFamily: "'Poppins'",
								textTransform: "none",
								backgroundColor: "#dddddd",
								"&:hover": {
									backgroundColor: "#d5d5d5",
								},
							}}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							onClick={handleConfirmDeleteBuilding}
							color="error"
							sx={{
								backgroundColor: "#FC3031",
								width: "70px",
								textTransform: "none",
								fontSize: "14px",
								fontFamily: "'Poppins'",
								"&:hover": {
									backgroundColor: "#dd453a",
								},
							}}
						>
							Delete
						</Button>
					</div>
				</div>
			</Modal>

			<Snackbar //ROOM SNACKBAR
				open={roomSnackbarOpen}
				autoHideDuration={3000}
				onClose={() => setRoomSnackbarOpen(false)}
			>
				<SnackbarContent
					sx={{
						backgroundColor: "#24CA56",
					}}
					message="Room added successfully!"
				/>
			</Snackbar>

			<Snackbar // SNACKBAR FOR BUILDING
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={() => setSnackbarOpen(false)}
			>
				<SnackbarContent
					sx={{
						backgroundColor: "#24CA56",
					}}
					message="Building added successfully!"
				/>
			</Snackbar>
			<Snackbar //Update Building Snackbar
				open={updateSuccessOpen}
				autoHideDuration={3000}
				onClose={() => setUpdateSuccessOpen(false)}
			>
				<SnackbarContent
					sx={{
						backgroundColor: "#24CA56",
					}}
					message="Building successfully updated!"
				/>
			</Snackbar>
			<Snackbar //Update Room Snackbar
				open={roomUpdatedSb}
				autoHideDuration={3000}
				onClose={() => setRoomUpdatedSb(false)}
			>
				<SnackbarContent
					sx={{
						backgroundColor: "#24CA56",
					}}
					message="Room successfully updated!"
				/>
			</Snackbar>
			<Snackbar //Room Delete Snackbar
				open={deleteSnackbarOpen}
				autoHideDuration={3000}
				onClose={() => setDeleteSnackbarOpen(false)}
			>
				<SnackbarContent
					sx={{
						backgroundColor: "#FF6961",
					}}
					message="Room deleted successfully!"
				/>
			</Snackbar>
			<Snackbar //Building Delete Snackbar
				open={deleteBuildingSnackbarOpen}
				autoHideDuration={3000}
				onClose={() => setDeleteBuildingSnackbarOpen(false)}
			>
				<SnackbarContent
					sx={{
						backgroundColor: "#FF6961",
					}}
					message="Building deleted successfully!"
				/>
			</Snackbar>
		</div>
	);
};

export default ManageFacilitiesTable;
