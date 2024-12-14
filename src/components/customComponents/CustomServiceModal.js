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
import { cilAddressBook, cilCalendar, cilCircle, cilClock, cilDollar, cilEducation, cilPeople } from '@coreui/icons';
import { types } from '@babel/core';
import { useEffect } from 'react';
import { request } from '../../services/request';

import CustomServiceForm from './CustomServiceForm';
import './CustomServiceForm.css'
import { element } from 'prop-types';

function CustomServiceModal({
  visible,
  onClose,
  title,
  options = [],
  onAction,
  actionButtonText = 'Submit',
  searchPlaceholder = 'Search...',
  backgroundColor = '#FFF',
}) {
  
   const serviceInputs  = [
     {element:'inputEl', label:'Title', cls:'title_serviceIp'},
      {element:'inputEl', label:'Duration', ion:cilClock,cls:'duration_serviceIp'},
       {element:'inputEl',label:'Price', ion:cilDollar,cls:'price_serviceIp'}, //insted of icon RS image property
       {element:'inputEl',label:'Capacity',ion:cilPeople,cls:'capacity_serviceIp'},
  ]

    
        
  return (
    <div className='responsive'>
     <CModal visible={visible} onClose={onClose} className='service'>
      {/* Modal Header */}
      <CModalHeader style={{backgroundColor}}>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>

      {/* Modal Body */}
      <CModalBody className="p-4 d-flex justify-content-center service-modal-body" style={{ backgroundColor }}>
       <CustomServiceForm serviceInputs={serviceInputs}/>
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

export default CustomServiceModal;
