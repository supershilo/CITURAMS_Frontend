import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Doughnut from "../../components/Charts/Doughnut";
import Pie from "../../components/Charts/Pie";
import Stack from "../../components/Charts/StackColumnChart";
import AdminHomeFrame from "../../components/AdminHomeFrame";
import axios from "axios";

const AdminDashboard = () => {
	const [allRequest, setAllRequest] = useState([]);

	useEffect(() => {
		const fetchAllRequest = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/request/getAllRequest"
				);
				setAllRequest(response.data);
			} catch (err) {
				// Handle error
			}
		};

		fetchAllRequest();
	}, []);

	// Function to calculate counts based on the data
	const calculateCounts = () => {
		const totalCount = allRequest.length;
		const pendingCount = allRequest.filter(
			(request) => request.status === "pending"
		).length;
		const ongoingCount = allRequest.filter(
			(request) => request.status === "on-going"
		).length;
		const resolvedCount = allRequest.filter(
			(request) => request.status === "resolved"
		).length;

		return {
			totalCount,
			pendingCount,
			ongoingCount,
			resolvedCount,
		};
	};

	const counts = calculateCounts();

	return (
		<div>
			<AdminHomeFrame />
			<div
				style={{
					display: "flex",
					justifyContent: "space-evenly",
					marginTop: "7%",
				}}
			>
				<Grid
					container
					spacing={2}
					style={{
						marginLeft: "45%",
						marginRight: "50px",
						marginBottom: "-100px",
					}}
				>
					<Grid item xs={6} sm={3}>
						<Card style={{ boxShadow: "0px 2px 3px 0px rgba(0,0,0,1)" }}>
							<CardContent style={{ textAlign: "center" }}>
								<Typography
									style={{
										FontStyle: "strong",
										fontFamily: "Poppins",
										fontSize: "2em",
									}}
								>
									{counts.totalCount}
								</Typography>
								<Typography
									style={{
										color: "#000",
										fontFamily: "Poppins",
										fontSize: "14px",
									}}
								>
									TOTAL REQUEST
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Card
							style={{
								backgroundColor: "#FFF",
								boxShadow: "0px 2px 3px 0px rgba(0,0,0,1)",
							}}
						>
							<CardContent style={{ textAlign: "center" }}>
								<Typography
									style={{
										FontStyle: "strong",
										fontFamily: "Poppins",
										fontSize: "2em",
									}}
								>
									{counts.pendingCount}
								</Typography>
								<Typography
									style={{
										color: "#FF5733",
										fontFamily: "Poppins",
										fontStyle: "strong",
										fontSize: "14px",
									}}
								>
									TOTAL PENDING
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Card
							style={{
								backgroundColor: "#FFF",
								boxShadow: "0px 2px 3px 0px rgba(0,0,0,1)",
							}}
						>
							<CardContent style={{ textAlign: "center" }}>
								<Typography
									style={{
										FontStyle: "strong",
										fontFamily: "Poppins",
										fontSize: "2em",
									}}
								>
									{counts.ongoingCount}
								</Typography>
								<Typography
									variant="h6"
									style={{
										color: "#FFEB3B",
										fontFamily: "Poppins",
										fontSize: "14px",
										FontStyle: "strong",
									}}
								>
									TOTAL ONGOING
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Card
							style={{
								backgroundColor: "#FFF",
								boxShadow: "0px 2px 3px 0px rgba(0,0,0,1)",
							}}
						>
							<CardContent style={{ textAlign: "center" }}>
								<Typography
									style={{
										FontStyle: "strong",
										fontFamily: "Poppins",
										fontSize: "2em",
									}}
								>
									{counts.resolvedCount}
								</Typography>
								<Typography
									variant="h6"
									style={{
										color: "#4CAF50",
										fontFamily: "Poppins",
										FontStyle: "strong",
										fontSize: "14px",
									}}
								>
									TOTAL RESOLVED
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</div>
			<div className="mt-24 ml-64 mb-10">
				<Grid container spacing={3} style={{ marginLeft: "1.5px" }}>
					<Grid item xs={6} style={{ paddingLeft: "3%", marginTop: "35px" }}>
						<Doughnut />
					</Grid>
					<Grid
						item
						xs={6}
						style={{ padding: "5%", marginRight: 0 }}
					>
						<Pie />
					</Grid>
				</Grid>
				<Grid
					item
					xs={12}
					className="mt-4"
					style={{ padding: "0 70px", marginLeft: "50px" }}
				>
					<Stack />
				</Grid>
			</div>
		</div>
	);
};

export default AdminDashboard;
