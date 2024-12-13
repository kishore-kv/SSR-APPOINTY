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
import { request } from '../../services/request';
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
    {ion:cilCircle,type:'text'},
    {ion:cilAddressBook,type:'text'},
    {ion:cilCalendar,type:'date'},
    {ion:cilClock,type:'time'},
    {ion:cilEducation,type:'text'}]

   const [locations , setLocations] = useState([ ]);

   useEffect(async()=>{
    console.log('=========effect');
    
      const response = await request('/getAllLocations/page=1&limit=10');
      console.log('============',response);
      
   },[ ])
        
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
      <CModalBody className="p-4 d-flex justify-content-center" style={{ backgroundColor }}>
       <CustomAppointmentForm formItems={formItems}/>
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
