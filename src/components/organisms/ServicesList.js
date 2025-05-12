import React,{useState, useEffect} from 'react';
import { requestDelete , request , requestPost} from '../../services/request'; 
import ServiceDetailsTable from '../../components/molecules/serviceDetails/ServiceDetailsTable';
import SearchBar from '../../components/molecules/searchBar/SearchBar';
import Loader from '../../components/atoms/loader/Loader';


const addText = "Add Service";

const serviceFields = [
  { name: "serviceName", label: "Service Name" },
  { name: "description", label: "Description" },
  { name: "durationMins", label: "Duration (mins)" },
  { name: "price", label: "Price" }
];

export default function  ServicesList() {

  const [modalOpen, setModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null); 
  const [services , setServices] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchedData, setSearchedData] = useState({ limit: rowsPerPage, page: page });
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm,setSearchTerm] = useState("");
  const [serviceData, setServicesData] = useState([]);
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
   
  const fetchServices = async (searchedData = {}) => {
    setIsLoading(true);
    try {
      const payload = {limit: rowsPerPage, page: page, ...searchedData };

      const response = await request('/getAllServices', payload);
      console.log("== Response:", response);
      
      if (response && response.data.status === "Success") {
        setServicesData(response.data.data);
        const { results, total } = response.data.data;
        setServices(results);
        setTotalCount(total);
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
    try {
      let response;
      if (data.serviceId) {
        // Update existing service
        response = await requestPost("/updateService", data);
      } else {
        // Add new service
        response = await requestPost("/addService", data);
      } 
      if (response && response.status === 200) {
        await fetchServices();
      } else {
        console.error("Failed to save service");
      }
    } catch (error) {
      console.error("Error while saving service:", error);
    } finally {
      setIsLoading(false);
      setModalOpen(false);
    }
  };  

  useEffect(() => {
  if (serviceData) {
    setRowsPerPage(serviceData.limit || 10);
    setPage((serviceData.page || 1) - 1);
  }
}, [serviceData]);

  useEffect(() => {
    if (Object.keys(searchedData).length > 0) {
      fetchServices(searchedData);
    }
  }, [searchedData]);
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setSearchedData={setSearchedData}
            currentData={currentService}
            setCurrentData={setCurrentService}
            addText={addText}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleSave={handleSave}
            fields={serviceFields}
          />
          <ServiceDetailsTable
            services={services}
            totalCount={totalCount}
            handleDelete={handleDelete}
            page={page}
            rowsPerPage={rowsPerPage}
            handleOpenModal={handleOpenModal}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            setSearchedData={setSearchedData}
          />
        </>
      )}
    </>
  );
}
