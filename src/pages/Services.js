import React from "react";
import withAuth from "../lib/auth/withAuth";
import ServicesList from "../components/organisms/ServicesList";

const Services = () => {
    return (
        <div>
            <ServicesList />
        </div>
    )
}

export default withAuth(Services);