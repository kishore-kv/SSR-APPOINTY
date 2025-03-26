import React , {useState}from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, TextField , IconButton } from '@mui/material';
import Button from '../../components/atoms/button/Button';
import AddIcon from '@mui/icons-material/Add';

function createData(name, email, mobile,  visibilty) {
  return { name, email, mobile, visibilty };
}

const initialRows = [
  createData("John Doe", "john@example.com", "123-456-7890", "true"),
  createData("Jane Smith", "jane@example.com", "987-654-3210", "false"),
  createData("Alice Brown", "alice@example.com", "555-666-7777", "true"),
  createData("Bob Johnson", "bob@example.com", "111-222-3333", "false"),
  createData("Charlie White", "charlie@example.com", "444-555-6666", "true")
];

export default function  StaffList() {
  
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
    const handleDelete = (name) => {
      const updatedRows = rows.filter((row) => row.name !== name);
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
         <AddIcon /> Add Staff
        </Button>
      </Box>
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }} className='table-container'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#17679b' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Mobile</TableCell>
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
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.mobile}</TableCell>
              <TableCell align="right">{row.visibilty}</TableCell>
               <TableCell align="right">
                              <IconButton onClick={() => handleDelete(row.name)}>
                                <DeleteIcon />
                             </IconButton>
                          </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
