import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";

const StackColumnChart = () => {
	const CanvasJSChart = CanvasJSReact.CanvasJSChart;

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

	useEffect(() => {
		console.log("allRequest:", allRequest);
	}, [allRequest]);

	const updateRequestStatus = async (requestID, newStatus) => {
		try {
			// Update the request status on the server
			await axios.put(
				`http://localhost:8080/request/updateStatus/${requestID}`,
				{
					status: newStatus,
				}
			);

			// Update the state with the new status
			setAllRequest((prevRequests) =>
				prevRequests.map((request) =>
					request.requestID === requestID
						? { ...request, status: newStatus }
						: request
				)
			);
		} catch (err) {
			// Handle error
		}
	};

	const prepareChartData = () => {
		const validStatuses = ["resolved", "pending", "on-going"];
		const buildingStatusCounts = {};

		validStatuses.forEach((status) => {
			buildingStatusCounts[status] = {};
		});

		allRequest.forEach((request) => {
			const building = request.building;
			const status = request.status;

			if (validStatuses.includes(status)) {
				if (!buildingStatusCounts[status][building]) {
					buildingStatusCounts[status][building] = {
						y: 0,
						indexLabel: "",
					};
				}

				buildingStatusCounts[status][building].y++;
				buildingStatusCounts[status][building].indexLabel =
					buildingStatusCounts[status][building].y.toString();
			}
		});

		return buildingStatusCounts;
	};

	const validStatuses = ["resolved", "pending", "on-going"];
	const statusColors = {
		resolved: "#4CAF50",
		pending: "#FF5733",
		"on-going": "#FFEB3B",
	};

	// Custom sorting function based on the order of statuses
	const allBuildings = Array.from(
		new Set(
			allRequest
				.filter((request) => validStatuses.includes(request.status))
				.map((request) => request.building)
		)
	);

	// Sort the buildings based on the order of statuses
	const sortedBuildings = allBuildings.sort((a, b) => {
		const statusOrder = { pending: 0, "on-going": 1, resolved: 2 };
		return statusOrder[a] - statusOrder[b];
	});

	const chartOptions = {
		animationEnabled: true,
		title: {
			text: "Status by Building",
			fontFamily: "'Poppins'",
			fontSize: 24,
		},
		axisY: {
			title: "Number of Requests",
			fontFamily: "'Poppins'",
			fontSize: 24,
		},
		toolTip: {
			shared: true,
		},
		legend: {
			cursor: "pointer",
			verticalAlign: "top",
			horizontalAlign: "center",
			dockInsidePlotArea: true,
		},
		// ... (other options remain unchanged)
		data: validStatuses.map((status) => ({
			type: "stackedColumn",
			name: status,
			showInLegend: true,
			color: statusColors[status] || "",
			dataPoints: sortedBuildings.map((building) => {
				const data = prepareChartData()[status]?.[building] || {
					y: 0,
					indexLabel: "",
				};
				return {
					label: building,
					y: data.y,
					indexLabel: data.indexLabel,
				};
			}),
		})),
	};

	const chartContainerStyle = {
		border: "2px solid #D7D7D7",
		borderRadius: "3px",
		boxShadow: "3px 7px 22px -4px rgba(37,33,33,1)",
	};

	return (
		<div style={chartContainerStyle}>
			<CanvasJSChart options={chartOptions} />
		</div>
	);
};

export default StackColumnChart;
