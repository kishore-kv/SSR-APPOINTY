
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

function CustomCustomerModal( 
    {visible,
    onClose,
    title,
    options = [],
    onAction,
    actionButtonText = 'Submit',
    searchPlaceholder = 'Search...',
    backgroundColor = '#FFF'}) {


  
    return (
         <CModal visible={visible} onClose={onClose} className='service'>
          {/* Modal Header */}
          <CModalHeader style={{backgroundColor}}>
            <CModalTitle>{title}</CModalTitle>
          </CModalHeader>
    
          {/* Modal Body */}
          <CModalBody className="p-4 d-flex justify-content-center service-modal-body" style={{ backgroundColor }}>
              
          </CModalBody>
    
          <CModalFooter style={{ backgroundColor }}>
            <CButton
              color="warning"
              style={{ color: 'white', fontWeight: 'bold' }}
              onClick={onAction}
            >
              hii
            </CButton>
          </CModalFooter>
        </CModal>
      );
  
}

export default CustomCustomerModal