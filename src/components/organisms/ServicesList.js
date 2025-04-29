import React,{useState} from 'react'
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
import { Box, TextField , IconButton,Typography} from '@mui/material';
import { requestDelete , request , requestPost} from '../../services/request'; 
import DeleteIcon from '@mui/icons-material/Delete';
import CustomModal from '../../components/modal/CustomModal';
import Loader from '../../components/atoms/loader/Loader';



function createData(service, duration, price, timeslot, visibilty) {
  return { service, duration, price, timeslot, visibilty };
}

const serviceFields = [
  { name: "serviceName", label: "Service Name" },
  { name: "description", label: "Description" },
  { name: "durationMins", label: "Duration (mins)" },
  { name: "price", label: "Price" }
];

export default function  ServicesList() {

  const [searchText, setSearchText] = useState('');
   const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [currentService, setCurrentService] = useState(null); 
  const [services , setServices] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
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
const handleDelete = async (service) => {
  setIsLoading(true);
  try {
      console.log(`===service`, service);
       const id = service?.serviceId; 
      console.log(`===id`, id);
      const response = await requestDelete(`/deleteService/${id}`, 'delete');
      console.log(`===response`, response);
      
      if (response.data && response?.data.status === "Success") {
          await fetchServices();
      } else {
          console.error("Error deleting location:", response.data.message);
      }
  } catch (error) {
      console.error("Error in deletion:", error);
  } finally {
    setIsLoading(false);
  }
};

  //add
  const handleOpenModal = (service = null) => {
    setCurrentService(service);
    setModalOpen(true);
  }
   
  const fetchServices = async (pageNo , limit) => {
    setIsLoading(true);
    try {
      const params = {
        pageNo: pageNo || 0,
        limit: limit || 10,
      };
      const response = await request('/getAllServices', 'get', params);
      if (response && response.data.status === "Success") {
        const { data } = response.data;
        setServices(data);
    } 
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }  
  };

  //save the service
    const handleSave = async (data) => {
      setIsLoading(true);
    console.log(`===data`, data);
      try {
          const response = await requestPost("/addService", data);
          if (response && response.status === 200) {
              await fetchServices();
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

  React.useEffect(() => {  fetchServices() }, []);

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
          <Button className="location-btn" sx={{ margin: 1 }} onClick={() => handleOpenModal()}>
          <AddIcon /> Add Service 
          </Button>
        </Box>
  
        {services.length === 0 && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No services found
            </Typography>
          </Box>
        )}
        {services.length > 0 && (
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }} className='table-container'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#17679b' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Service</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Duration</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Visibilty</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => (
              <TableRow 
                key={service.serviceId} 
                sx={{ backgroundColor: index % 2 ? 'action.hover' : 'inherit' }}
              >
                <TableCell component="th" scope="row" onClick={() => handleOpenModal(service)}>{service?.serviceName}</TableCell>
                <TableCell align="right">{service?.durationMins}</TableCell>
                <TableCell align="right">{service?.price}</TableCell>
                <TableCell align="right">{service?.isActive}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(service)}>
                    <DeleteIcon />
                 </IconButton>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      
      
      </TableContainer>)}
      <CustomModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} data={currentService} fields={serviceFields}/>
      </>
    )}
    </>
  );
}
