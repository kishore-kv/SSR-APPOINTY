import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '../../components/atoms/button/Button';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useState } from 'react';
import { Box, TextField , IconButton,Typography} from '@mui/material';
 
import DeleteIcon from '@mui/icons-material/Delete';

function createData(service, duration, price, timeslot, visibilty) {
  return { service, duration, price, timeslot, visibilty };
}

const initialRows =  [
  createData("Haircut", "30 mins", "$20", "10:00 AM - 10:30 AM", "true"),
  createData("Shaving", "15 mins", "$10", "11:00 AM - 11:15 AM", "true"),
  createData("Facial", "45 mins", "$35", "12:00 PM - 12:45 PM", "false"),
  createData("Massage", "60 mins", "$50", "02:00 PM - 03:00 PM", "true"),
  createData("Manicure", "40 mins", "$25", "03:30 PM - 04:10 PM", "false"),
  createData("Pedicure", "50 mins", "$30", "05:00 PM - 05:50 PM", "true"),
];

export default function  ServicesList() {

  const [searchText, setSearchText] = useState('');
  
  const [rows, setRows] = useState(initialRows);
  const [searchResults, setSearchResults] = useState(initialRows);
  
    const handleSearchTextChange = (e) => {
      const query = e.target.value.toLowerCase();
      setSearchText(query);
  
      if (query.trim() === "") {
        setSearchResults(rows);
      } else {
        const filtered = rows.filter((row) =>
          row.name.toLowerCase().includes(query)
        );
        setSearchResults(filtered);
      }

  }
  

  //delete
  const handleDelete = (service) => {
    const updatedRows = rows.filter((row) => row.service !== service);
    setRows(updatedRows);
    setSearchResults(updatedRows);
  };
  return (
    <>
      <Box className="search-location-container my-5">
        <TextField
          placeholder="Search for"
          variant="outlined"
          fullWidth
          className="w-75"
          sx={{ "& .MuiFormHelperText-root": { margin: 0 } }}
          helperText="You can enter up to 100 characters for your search"
          onChange={handleSearchTextChange}
          value={searchText}
        />
        <Button className="location-btn" sx={{ margin: 1 }} onClick={() => handleOpenModal()}>
        <AddIcon /> Add Service 
        </Button>
      </Box>

      {searchResults.length === 0 && (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No services found
          </Typography>
        </Box>
      )}
      {searchResults.length > 0 && (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }} className='table-container'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#17679b' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Service</TableCell>
            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Duration</TableCell>
            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Timeslot</TableCell>
            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Visibilty</TableCell>
            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map((row, index) => (
            <TableRow 
              key={row.name} 
              sx={{ backgroundColor: index % 2 ? 'action.hover' : 'inherit' }}
            >
              <TableCell component="th" scope="row">{row.service}</TableCell>
              <TableCell align="right">{row.duration}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.timeslot}</TableCell>
              <TableCell align="right">{row.visibilty}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleDelete(row.service)}>
                  <DeleteIcon />
               </IconButton>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)}
    </>
  );
}
