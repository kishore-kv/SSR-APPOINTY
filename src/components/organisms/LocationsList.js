import React, { useState } from 'react';
import { Box, Typography,TextField, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '../../components/atoms/button/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomModal from '../../components/modal/CustomModal';

function createData(cityname, address) {
  return { cityname, address };
}
const locationFields = [
  { name: "cityname", label: "City Name" },
  { name: "address", label: "Address" }
];

const initialRows =  [
  createData("New York", "123 Main St, NY 10001"),
  createData("Los Angeles", "456 Sunset Blvd, CA 90028"),
  createData("Chicago", "789 Lakeshore Dr, IL 60611"),
  createData("Houston", "101 Texas Ave, TX 77002"),
  createData("Miami", "202 Ocean Dr, FL 33139")
];


export default function  LocationsList() {

  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState(initialRows);
  const [filteredRows, setFilteredRows] = useState(initialRows);
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
  const handleDelete = (cityname) => {
    const updatedRows = rows.filter((row) => row.cityname !== cityname);
    setRows(updatedRows);
    setFilteredRows(updatedRows);
  };

  // Open modal for adding or updating location
  const handleOpenModal = (location = null) => {
    setCurrentLocation(location);
    setModalOpen(true);
  };

  // Save data from modal (add or update)
  const handleSave = (data) => {
    if (currentLocation) {
      // Update existing
      const updatedRows = rows.map((row) =>
        row.cityname === currentLocation.cityname ? data : row
      );
      setRows(updatedRows);
      setFilteredRows(updatedRows);
    } else {
      // Add new location
      setRows([...rows, data]);
      setFilteredRows([...rows, data]);
    }
    setModalOpen(false);
  };

  return (
    <Box className="locations-container">
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div className="d-flex location-header">
          <LocationOnIcon sx={{ fontSize: 40, color: '#17679b', margin: 2 }} />
          <Typography variant="h4" align="center" gutterBottom className="location-heading m-0">
            Locations
          </Typography>
        </div>
        <Typography variant="subtitle1" align="center" gutterBottom>
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
        <Button className="location-btn" sx={{ margin: 1 }} onClick={() => handleOpenModal()}>
         <AddIcon /> Add location 
        </Button>
      </Box>

      {/* Locations List */}
      <Box className="locations-list-container">
        {filteredRows.length > 0 ? filteredRows.map((row, index) => (
          <Box className="locations-list-item my-4" key={index}>
            <img src={"errtr"} alt={`Image`} className="location-img" />
            <Box className="d-flex location-name">
              <Typography variant="h4" gutterBottom onClick={() => handleOpenModal(row)} style={{ cursor: "pointer" }}>
                {row.cityname}
              </Typography>
              <Typography variant="h6" gutterBottom>{row.address}</Typography>
            </Box>
            <Button className="location-chos-btn">Choose</Button>
            <IconButton onClick={() => handleDelete(row.cityname)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )):<Typography variant="h6" align="center" sx={{ mt: 2, color: "gray" }}>
        No results found
      </Typography>}
      </Box>

      {/* Reusable Modal */}
      
      <CustomModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} data={currentLocation} fields={locationFields}/>
    </Box>
  );
}
