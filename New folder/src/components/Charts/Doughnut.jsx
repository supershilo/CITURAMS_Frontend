import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";

const Doughnut = () => {
	var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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

	// Function to prepare data for doughnut chart
	const prepareChartData = () => {
		const statusCounts = {};
		const statusColors = {
			resolved: "#4CAF50",
			pending: "#FF5733",
			"on-going": "#FFEB3B",
		};

		// Count the occurrences of each status
		allRequest.forEach((request) => {
			const status = request.status;
			statusCounts[status] = (statusCounts[status] || 0) + 1;
		});

		// Convert to CanvasJS data format with specified colors
		const chartData = Object.keys(statusCounts).map((status) => ({
			y: statusCounts[status],
			indexLabel: `${status}: {y}`,
			legendText: `${status}: {y}`,
			color: statusColors[status] || "", // Default color is grey
		}));

		return chartData;
	};

	const chartOptions = {
		animationEnabled: true,
		title: {
			text: "Status Request",
			fontFamily: "'Poppins'", // Specify the font family
			fontSize: 18, // Specify the font size in pixels
		},
		legend: {
			fontFamily: "'Poppins', sans-serif", // Specify the font family
			fontSize: 12, // Specify the font size in pixels
			verticalAlign: "bottom", // Place legends at the bottom
			horizontalAlign: "center", // Center align legends
            
		},
		data: [
			{
				type: "doughnut",
				showInLegend: true,
				dataPoints: prepareChartData(),
			},
		],
	};

	const chartContainerStyle = {
		border: "3px solid #cccc", // Border color
		borderRadius: "3px", // Border radius
		boxShadow: "3px 7px 22px -4px rgba(37,33,33,1)", // Box shadow
        marginLeft: "20px",
	};

	return (
		<div style={chartContainerStyle}>
			<CanvasJSChart options={chartOptions} />
		</div>
	);
};

export default Doughnut;
