import React from "react";
import AdminHomeFrame from "../../components/AdminHomeFrame";
import ManageFacilitiesTable from "../../components/AdminFacilitiesForm";

const AdminManageFacilities = () => {
	return (
		<div>
			<AdminHomeFrame />
			<div className="mt-24" style={{ marginLeft: "25%", marginTop: "10%", width: "70%" }}>
				<div className="ml-12"></div>
				<ManageFacilitiesTable />
			</div>
		</div>
	);
};

export default AdminManageFacilities;