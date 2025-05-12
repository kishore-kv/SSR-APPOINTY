import React , {useState, useEffect}from 'react';
import { request, requestPost, requestDelete  } from '../../services/request';
import Loader from '../../components/atoms/loader/Loader';
import SearchBar from '../../components/molecules/searchBar/SearchBar';
import StaffDetailsTable from '../../components/molecules/staffDetails/StaffDetailsTable';

  const staffFields  = [
    { name: 'firstName', label: 'First Name', required: true },
    { name: 'lastName', label: 'Last Name', required: true },
    { name: 'email', label: 'Email', required: true },
    { name: 'role', label: 'Role', required: false },
    { name: 'loginAllowed', label: 'Login Allowed', type: 'checkbox', required: false },
  ];

  const addText = "Add Staff";

export default function  StaffList() {
  
    const [modalOpen, setModalOpen] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null); 
    const [staff , setStaff] = React.useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [searchedData, setSearchedData] = useState({ limit: rowsPerPage, page: page });
    const [searchTerm, setSearchTerm] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    
    const fetchStaff = async (searchedData = {}) => {
      try {
        setIsLoading(true);
        const payload = {limit: rowsPerPage, page: page+1, ...searchedData };
        console.log("Payload:", payload);
        
        const response = await request("/fetchStaff", payload);
        console.log("Response:", response);
        
        if (response && response.data.status.toLowerCase() === "success") {
          const { results, total } = response.data.data;
          setStaff(results);
          setTotalCount(total);
        } else {
          console.error("Failed to fetch staff", response);
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleOpenModal = (staff = null) => {
      setCurrentStaff(staff);
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
    
    useEffect(() => {
        if (Object.keys(searchedData).length > 0) {
          fetchStaff(searchedData);
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
                    currentData={currentStaff}
                    setCurrentData={setCurrentStaff}
                    addText={addText}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    handleSave={handleSave}
                    fields={staffFields}
                />
                <StaffDetailsTable
                    staff={staff}
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
