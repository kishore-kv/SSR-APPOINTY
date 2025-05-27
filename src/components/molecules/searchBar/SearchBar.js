import React from 'react';
import Button from '../../atoms/button/Button';
import AddIcon from '@mui/icons-material/Add';
import { Box, TextField } from '@mui/material';
import CustomSetModal from '../../modal/CustomSetModal';

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  setSearchedData,
  currentData,
  setCurrentData,
  addText,
  modalOpen,
  setModalOpen,
  handleSave,
  fields,
  locationData,
  setLocationData,
  handleOpenModalLocation,
}) => {

  const handleSearchTextChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setSearchedData(prev => ({ ...prev, searchTerm: value }));
  };

  const handleOpenModal = (data = null) => {
    setCurrentData(data);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentData(null);
    setLocationData(null);
  };

  return (
    <Box className="search-location-container my-5">
      <TextField
        placeholder="Search for"
        variant="outlined"
        fullWidth
        className="w-75"
        sx={{ "& .MuiFormHelperText-root": { margin: 0 } }}
        helperText="You can enter up to 100 characters for your search"
        onChange={handleSearchTextChange}
        value={searchTerm}
      />
      <Button className="location-btn" sx={{ margin: 1 }} onClick={() => handleOpenModal()}>
        <AddIcon /> {addText}
      </Button>

      {/* Only CustomSetModal is rendered here */}
      <CustomSetModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        data={currentData}
        fields={fields}
        locationData={locationData}
        handleOpenModalLocation={handleOpenModalLocation}
      />
    </Box>
  );
};

export default SearchBar;
