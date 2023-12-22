import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";

const Pie = () => {
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

	// Function to prepare data for pie chart
	const prepareChartData = () => {
		const buildingCounts = {};
		const buildingColors = {
			GLE: "#4CAF50", // GREEN
			ALLIED: "#FFEB3B", // YELLOW
			ACAD: "#FF5733", // ORANGE
		};

		// Count the occurrences of each building
		allRequest.forEach((request) => {
			const building = request.building;
			buildingCounts[building] = (buildingCounts[building] || 0) + 1;
		});

		// Convert to CanvasJS data format
		const chartData = Object.keys(buildingCounts).map((building) => ({
			y: buildingCounts[building],
			indexLabel: `${building}: {y}`,
			legendText: `${building}: {y}`,
			color: buildingColors[building] || "",
		}));

		return chartData;
	};

	const chartOptions = {
		animationEnabled: true,
		title: {
			text: "Building Breakdown",
			fontFamily: "'Poppins'", 
			fontSize: 18, 
		},
		legend: {
			fontFamily: "'Poppins', sans-serif", 
			fontSize: 10, 
            verticalAlign: "bottom",
            horizontalAlign:"center",
		},
		data: [
			{
				type: "pie",
				showInLegend: true,
				dataPoints: prepareChartData(),
			},
		],
	};
	const chartContainerStyle = {
		border: "3px solid #cccc", 
		borderRadius: "3px", 
		boxShadow: "3px 7px 22px  rgba(37,33,33,1)",
	};

	return (
		<div style={chartContainerStyle}>
			<CanvasJSChart options={chartOptions} />
		</div>
	);
};

export default Pie;
