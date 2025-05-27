import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const LocationsDetails = ({ locations, handleOpenDetailsModal, handleDelete }) => {
  return (
    <Box className="locations-list-container">
      {locations.length > 0 ? (
        locations.map((location) => (
          <Box className="locations-list-item my-4" key={location.id}>
            <img src={"errtr"} alt="Image" className="location-img" />
            <Box className="location-name">
              <Typography
                className="text-nowrap branchName"
                variant="h4"
                gutterBottom
                onClick={() => handleOpenDetailsModal(location)}
                style={{ cursor: "pointer" }}
              >
                {location?.branchName}
              </Typography>
              <Typography variant="h6" gutterBottom className="truncate-text">
                {location?.address1}
              </Typography>
              <Typography variant="h6" gutterBottom className="truncate-address">
                {location?.city}, {location?.state}, {location?.postalCode}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {location?.phoneNumber}
              </Typography>
            </Box>

            <Box className="location-actions">
              <Button className="location-chos-btn">Choose</Button>
              <IconButton onClick={() => handleDelete(location)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 2, color: "gray" }}>
          No results found
        </Typography>
      )}
    </Box>
  );
};

export default LocationsDetails;
