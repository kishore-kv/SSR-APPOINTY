
import React from 'react';
import{CButton,CModalHeader,CModalTitle,CModalBody,CModalFooter,CModal } from "@coreui/react";


function CustomDetailsModal({visible,onClose}) {

   
  return (
    <div style={{
      alignItems: "center",
    justifyContent: "center"
    }}>
         <CModal visible={visible} onClose={onClose}
         
         alignment="top" // Ensures modal aligns to the left
         className={`custom-modal ${visible ? "open" : "closed"}`}>
      {/* Modal Header */}
      <CModalHeader>
        <CModalTitle>{"title"}</CModalTitle>
        </CModalHeader>

      <CModalBody className="p-4 d-flex justify-content-center w-100">
      
      </CModalBody>

      {/* Modal Footer */}
      <CModalFooter style={{ backgroundColor:'red' }}>
        <CButton>
          {"actionButtonText"}
        </CButton>
      </CModalFooter>
    </CModal>
    </div>
  )
}

export default CustomDetailsModal