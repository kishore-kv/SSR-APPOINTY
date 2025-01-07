import { CContainer } from '@coreui/react';
import { CCard, CCardBody, CCardHeader, CCardFooter, CButton } from '@coreui/react';
import React from 'react'
import './CustomBooking.css'
import { useLocation, useHistory } from 'react-router-dom';
 
 


function BookingDetails() {

   
    const location = useLocation();
    const data = location.state?.data; // Access the passed data
    console.log(`dataaaaa`,data);
     
    const navigateBack = useHistory();
      const handleBtnClick = () =>{
          navigateBack.push('/')
      }
    return (
        <CContainer className='custom_booking_container'>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background:"hsl(82 84.5% 67.1%)" }}>
                        <h4 style={{ margin: 0 }}>¡Felicidades! 🎉</h4>
                        <p style={{ margin: 0 }}>Tu cita ha sido reservada.</p>
                    </span>

            <CCard className='custom_card'>
                
                <CCardBody className='d-flex justify-content-between flex-column align-items-center'>
                    <h6>Detalles de la cita</h6>
                    <p>Servicio : {data?.data?.service?.name || ''}</p>
                    <p>hora de inicio: {data?.data?.startTime || ''}</p>
                    <p>ubicación: {data?.data?.location?.name || ''}</p>
                    <p>equipo: {data?.data?.staff?.email || ''}</p>
                    
                </CCardBody>
                <CCardFooter>Card Footer</CCardFooter>
            </CCard>
            <CButton type='reset' onClick={handleBtnClick}>New cita</CButton>
        </CContainer>
    );
};

export default BookingDetails