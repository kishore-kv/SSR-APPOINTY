import React, { useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';


import CustomAppointmentForm from './CustomAppointmentForm';
import { cilAddressBook, cilCalendar, cilCircle, cilClock, cilEducation } from '@coreui/icons';
import { types } from '@babel/core';
import { useEffect } from 'react';
import { request, requestPost } from '../../services/request';
import './CustomModal.css';

function CustomAppointmentModal({
  visible,
  onClose,
  title,
  options = [],
  onAction,
  actionButtonText = 'Submit',
  searchPlaceholder = 'Search...',
  backgroundColor = '#00bcd4',
}) {
  
   const formItems = [
    {ion:cilAddressBook,type:'text'},
    {ion:cilCalendar,type:'date'},
    {ion:cilClock,type:'time'},
    {ion:cilEducation,type:'text'}]
   
    const [data , setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    const fetchData = async () => {
      const payload = { limit: 10, page: 0 };
      try {
        const response = await requestPost('/getAllLocations', payload);
        if (response && response.data.status === "Success") {
          const { data } = response;
          setData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
        
  return (
    <div className='responsive'>
     <CModal visible={visible} onClose={onClose} className='resp'>
      {/* Modal Header */}
      <CModalHeader style={{backgroundColor}}>
        <CModalTitle style={{color:"#fff"}}>{title}</CModalTitle>
        {/* <CButton
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></CButton> */}
      </CModalHeader>

      {/* Modal Body */}
      <CModalBody className="p-4 d-flex justify-content-center w-100" style={{ backgroundColor }}>
      {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CustomAppointmentForm formItems={formItems} locationsData={data} />
        )}
      </CModalBody>

      {/* Modal Footer */}
      <CModalFooter style={{ backgroundColor }}>
        <CButton
          color="warning"
          style={{ color: 'white', fontWeight: 'bold' }}
          onClick={onAction}
        >
          {actionButtonText}
        </CButton>
      </CModalFooter>
    </CModal>
    </div>
  );
}

export default CustomAppointmentModal;
