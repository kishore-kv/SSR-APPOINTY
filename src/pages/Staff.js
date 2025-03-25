import React from "react";
import withAuth from "../lib/auth/withAuth";
import StaffList from "../components/organisms/StaffList";

const Staff = () => {
    return (
        <div>
            <StaffList />
        </div>
    )
}

export default withAuth(Staff);