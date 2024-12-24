import React, { useState } from 'react'
import{CButton,CCard, CCardBody, CCardImage, CCardTitle, CCardText } from "@coreui/react";
import CustomDetailsModal from './CustomDetailsModal';


function AppointmentCard() {
    const [open ,setOpen] = useState(false)
    const handleClick = ( ) => {
       setOpen(!open);
    }
  return (
    <CCard>
    <CCardBody>
      <CCardTitle>Service Name</CCardTitle>
      <CCardText>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </CCardText>
      <CButton color="primary" onClick={handleClick}>Go somewhere</CButton>
      {open && <CustomDetailsModal visible={open}/>}
    </CCardBody>
  </CCard>
  )
}

export default AppointmentCard