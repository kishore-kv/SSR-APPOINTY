import React, { useState } from 'react';
import { Box, Typography,TextField, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { requestDelete, requestPost } from '../../services/request';
import Loader from '../../components/atoms/loader/Loader';
import SearchBar from '../../components/molecules/searchBar/SearchBar';
import LocationsDetails from '../../components/molecules/locationDetails/LocationsDetails';



// function createData(cityname, address) {
//   return { cityname, address };
// }
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

  const addText = "Add Location";

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
      let response;
      if (data.id) {
        // Convert to expected payload
        const payload = { ...data, locationId: data.id };
        delete payload.id;  
        response = await requestPost("/updateLocation", payload);
      } else {
        response = await requestPost("/addLocation", data);
      }
      if (response && response.status === 200) {
        await fetchLocations();
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
                    <SearchBar
                        searchedData={searchTerm}
                        setSearchedData={setSearchTerm}
                        currentData={currentLocation}
                        setCurrentData={setCurrentLocation}
                        addText= {addText}
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        handleSave={handleSave}
                        fields={locationFields}
                    />

                  {/* Locations List */}
                      <LocationsDetails
                            locations={locations}
                            handleOpenModal={handleOpenModal}
                            handleDelete={handleDelete}
                      />
              </Box>
          )}
      </>
  );
}
