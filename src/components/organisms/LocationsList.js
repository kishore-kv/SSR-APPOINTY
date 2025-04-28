import React, { useState } from 'react';
import { Box, Typography,TextField, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '../../components/atoms/button/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomModal from '../../components/modal/CustomModal';
import { requestDelete, requestPost } from '../../services/request';
import Loader from '../../components/atoms/loader/Loader';



function createData(cityname, address) {
  return { cityname, address };
}
const locationFields = [
    { name: "branchName", label: "Branch Name" },
    { name: "address1", label: "Address1" },
    { name: "address2", label: "Address2" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "postalCode", label: "Postal Code" },
    { name: "phoneNumber", label: "Phone Number" },
];

export default function  LocationsList() {

  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState(0);
  const [filteredRows, setFilteredRows] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null); // For editing

  // Search logic
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    if (query.trim() === "") {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter((row) =>
        row.cityname.toLowerCase().includes(query)
      );
      setFilteredRows(filtered);
    }
  };

  // Delete function
const handleDelete = async (location) => {
  setIsLoading(true);
  try {
      const response = await requestDelete(`/deleteLocation/${location.id}`, 'delete');
      
      if (response.data && response.data.data.status === "success") {
          await fetchLocations();
      } else {
          console.error("Error deleting location:", response.data.message);
      }
  } catch (error) {
      console.error("Error in deletion:", error);
  } finally {
    setIsLoading(false);
  }
};


  // Open modal for adding or updating location
  const handleOpenModal = (location = null) => {
    setCurrentLocation(location);
    setModalOpen(true);
  };

  // Save data from modal (add or update)
  const handleSave = async (data) => {
    setIsLoading(true);
    try {
        let response = await requestPost("/addLocation", data);
        if (response && response.status === 200) {
            await fetchLocations();
            // setModalOpen(false);
        } else {
            console.error("Failed to save location");
        }
    } catch (error) {
        console.error("Error while saving location:", error);
    } finally {
        setIsLoading(false);
        setModalOpen(false);
    } 
};


  // Fetch locations from API (mocked here)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [locations, setLocations] = useState([]);
  const fetchLocations = async () => {
    const payload = { limit: 10, page: 0 };
    setIsLoading(true);
    try {
      const response = await requestPost('/getAllLocations', payload);
      if (response && response.data.status === "Success") {
        const { data } = response.data;
        // console.log(`data`,data);          
        setLocations(data);
      }
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Call fetchLocations when the component mounts
  React.useEffect(() => {
    fetchLocations();
  }, []);

  return (
      <>
          {isLoading ? (
              <Loader />
          ) : (
              <Box className="locations-container">
                  <Box
                      sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                      }}
                  >
                      <div className="d-flex location-header">
                          <LocationOnIcon
                              sx={{ fontSize: 40, color: "#17679b", margin: 2 }}
                          />
                          <Typography
                              variant="h4"
                              align="center"
                              gutterBottom
                              className="location-heading m-0"
                          >
                              Locations
                          </Typography>
                      </div>
                      <Typography
                          variant="subtitle1"
                          align="center"
                          gutterBottom
                      >
                          Choose a location
                      </Typography>
                  </Box>

                  {/* Search and Add Button */}
                  <Box className="search-location-container">
                      <TextField
                          placeholder="Search for"
                          variant="outlined"
                          fullWidth
                          className="w-75"
                          sx={{ "& .MuiFormHelperText-root": { margin: 0 } }}
                          helperText="You can enter up to 100 characters for your search"
                          onChange={handleSearch}
                          value={searchTerm}
                      />
                      <Button
                          className="location-btn"
                          sx={{ margin: 1 }}
                          onClick={() => handleOpenModal()}
                      >
                          <AddIcon /> Add location
                      </Button>
                  </Box>

                  {/* Locations List */}
                  <Box className="locations-list-container">
                      {locations.length > 0 ? (
                          locations.map((location, index) => (
                              <Box
                                  className="locations-list-item my-4"
                                  key={index}
                              >
                                  <img
                                      src={"errtr"}
                                      alt={`Image`}
                                      className="location-img"
                                  />
                                  <Box className="location-name">
                                      <Typography
                                          className="text-nowrap branchName"
                                          variant="h4"
                                          gutterBottom
                                          onClick={() =>
                                              handleOpenModal(location)
                                          }
                                          style={{ cursor: "pointer" }}
                                      >
                                          {location?.branchName}
                                      </Typography>
                                      <Typography
                                          variant="h6"
                                          gutterBottom
                                          className="truncate-text"
                                      >
                                          {location?.address1}
                                      </Typography>
                                      <Typography
                                          variant="h6"
                                          gutterBottom
                                          className="truncate-address"
                                      >
                                          {location?.city}, {location?.state},{" "}
                                          {location?.postalCode}
                                      </Typography>
                                      <Typography variant="h6" gutterBottom>
                                          {location?.phoneNumber}
                                      </Typography>
                                  </Box>

                                  <Box className="location-actions">
                                      <Button className="location-chos-btn">
                                          Choose
                                      </Button>
                                      <IconButton
                                          onClick={() => handleDelete(location)}
                                      >
                                          <DeleteIcon />
                                      </IconButton>
                                  </Box>
                              </Box>
                          ))
                      ) : (
                          <Typography
                              variant="h6"
                              align="center"
                              sx={{ mt: 2, color: "gray" }}
                          >
                              No results found
                          </Typography>
                      )}
                  </Box>

                  {/* Reusable Modal */}

                  <CustomModal
                      open={modalOpen}
                      onClose={() => setModalOpen(false)}
                      onSave={handleSave}
                      data={currentLocation}
                      fields={locationFields}
                  />
              </Box>
          )}
      </>
  );
}
