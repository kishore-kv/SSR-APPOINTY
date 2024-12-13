import React from 'react';
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

function CustomAppointmentModal({
  visible,
  onClose,
  title,
  options = [],
  onAction,
  actionButtonText = 'Submit',
  searchPlaceholder = 'Search...',
  backgroundColor = '#F5F5F5',
}) {
  
   const formItems = [
    {ion:cilCircle,type:'text'},
    {ion:cilAddressBook,type:'text'},
    {ion:cilCalendar,type:'date'},
    {ion:cilClock,type:'time'},
    {ion:cilEducation,type:'text'}]
        
  return (
    <CModal visible={visible} onClose={onClose}>
      {/* Modal Header */}
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
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
  );
}

export default CustomAppointmentModal;
