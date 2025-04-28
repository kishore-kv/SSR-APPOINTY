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
import { request, requestPost, requestDelete  } from '../../services/request';
import CustomModal from '../../components/modal/CustomModal';
import Loader from '../../components/atoms/loader/Loader';

export default function  StaffList() {
  
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentStaff, setCurrentStaff] = useState({});

    const staffFields  = [
      { name: 'firstName', label: 'First Name', required: true },
      { name: 'lastName', label: 'Last Name', required: true },
      { name: 'email', label: 'Email', required: true },
      { name: 'role', label: 'Role', required: false },
      { name: 'loginAllowed', label: 'Login Allowed', type: 'checkbox', required: false },
    ];
    
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
    
    const fetchStaff = async () => {
      try {
        setIsLoading(true);
        const response = await request("/fetchStaff");
    
        if (response?.status === 200) {
          const staffData = response.data?.data || [];
    
          const mappedStaff = staffData.map((staff) => ({
            id: staff.id,
            name: `${staff.firstName} ${staff.lastName}`,
            email: staff.email,
            role: staff.role || "N/A",
            visibilty: staff.loginAllowed ? "Yes" : "No",
          }));
    
          setRows(mappedStaff);
          setSearchResults(mappedStaff);
        } else {
          console.error("Failed to fetch staff", response);
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const handleOpenModal = () => {
      setCurrentStaff({});
      setModalOpen(true);
    };

    const handleSave = async (data) => {
      setIsLoading(true);
      try {
        let response = await requestPost("/addStaff", data);
        console.log("Response:", response);
    
        if (response && response.status === 200) {
          await fetchStaff();
        } else {
          console.error("Failed to save staff: ", response);
        }
      } catch (error) {
        console.error("Error while saving staff:", error);
      } finally {
        setIsLoading(false);
        setModalOpen(false);
      }
    };
    
     
    //delete
    const handleDelete = async (staff) => {
        setIsLoading(true);
        try {
            const response = await requestDelete(
                `/deleteStaff/${staff.id}`,
                "delete"
            );
            console.log("Delete response:", response);
            if (response.data && response.data.data.status === "success") {
                await fetchStaff();
            } else {
                console.error("Error deleting staff:", response.data.message);
            }
        } catch (error) {
            console.error("Error in staff deletion:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
     React.useEffect(() => {
        fetchStaff();
      }, []);
  return (
      <>
          {isLoading ? (
              <Loader />
          ) : (
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
                      <Button
                          className="location-btn"
                          sx={{ margin: 1 }}
                          onClick={() => handleOpenModal()}
                      >
                          <AddIcon /> Add Staff
                      </Button>
                  </Box>
                  <TableContainer
                      component={Paper}
                      sx={{ boxShadow: 3, borderRadius: 2 }}
                      className="table-container"
                  >
                      <Table
                          sx={{ minWidth: 700 }}
                          aria-label="customized table"
                      >
                          <TableHead>
                              <TableRow sx={{ backgroundColor: "#17679b" }}>
                                  <TableCell
                                      sx={{
                                          color: "white",
                                          fontWeight: "bold",
                                      }}
                                  >
                                      Name
                                  </TableCell>
                                  <TableCell
                                      align="right"
                                      sx={{
                                          color: "white",
                                          fontWeight: "bold",
                                      }}
                                  >
                                      Email
                                  </TableCell>
                                  <TableCell
                                      align="right"
                                      sx={{
                                          color: "white",
                                          fontWeight: "bold",
                                      }}
                                  >
                                      Role
                                  </TableCell>
                                  <TableCell
                                      align="right"
                                      sx={{
                                          color: "white",
                                          fontWeight: "bold",
                                      }}
                                  >
                                      Visibilty
                                  </TableCell>
                                  <TableCell
                                      align="right"
                                      sx={{
                                          color: "white",
                                          fontWeight: "bold",
                                      }}
                                  >
                                      Actions
                                  </TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {Array.isArray(searchResults) &&
                                  searchResults.map((row, index) => (
                                      <TableRow
                                          key={row.name}
                                          sx={{
                                              backgroundColor:
                                                  index % 2
                                                      ? "action.hover"
                                                      : "inherit",
                                          }}
                                      >
                                          <TableCell component="th" scope="row">
                                              {row.name}
                                          </TableCell>
                                          <TableCell align="right">
                                              {row.email}
                                          </TableCell>
                                          <TableCell align="right">
                                              {row.role}
                                          </TableCell>
                                          <TableCell align="right">
                                              {row.visibilty}
                                          </TableCell>
                                          <TableCell align="right">
                                              <IconButton
                                                  onClick={() =>
                                                      handleDelete(row)
                                                  }
                                              >
                                                  <DeleteIcon />
                                              </IconButton>
                                          </TableCell>
                                      </TableRow>
                                  ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
                  <CustomModal
                      open={modalOpen}
                      onClose={() => setModalOpen(false)}
                      onSave={handleSave}
                      data={currentStaff}
                      fields={staffFields}
                  />
              </>
          )}
      </>
  );
}
