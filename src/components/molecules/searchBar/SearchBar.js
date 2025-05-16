import React from 'react';
import Button from '../../atoms/button/Button';
import AddIcon from '@mui/icons-material/Add';
import { Box, TextField} from '@mui/material';
import CustomModal from '../../modal/CustomModal';

const SearchBar = ({searchTerm, setSearchTerm, setSearchedData, currentData, setCurrentData, addText, modalOpen, setModalOpen, handleSave, fields }) => {
    const handleSearchTextChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
        setSearchedData(prev => ({ ...prev, searchTerm: value }));
    }

    //add
    const handleOpenModal = (data = null) => {
        setCurrentData(data);
        setModalOpen(true);
    }

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
            <CustomModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                data={currentData}
                fields={fields}
            />
        </Box>
    );
}

export default SearchBar;
