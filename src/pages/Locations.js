import React from "react";
import withAuth from "../lib/auth/withAuth";
import LocationsList from "../components/organisms/LocationsList";

const Locations = () => {
    return (
        <div>
            <LocationsList />
        </div>
    )
}

export default withAuth(Locations);