import React from "react";
import AdminHomeFrame from "../../components/AdminHomeFrame";
import CreateUserForm from "../../components/AdminAddUser-Form";

const AdminCreateUser = () => {
	return (
		<div>
			<AdminHomeFrame />
			<div className="mt-24" style={{ marginLeft: "-10%", marginTop: "10%" }}>
				<div className="ml-12"></div>
				<CreateUserForm />
			</div>
		</div>
	);
};

export default AdminCreateUser;