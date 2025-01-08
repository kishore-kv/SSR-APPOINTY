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
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'hsl(82, 84.5%, 67.1%)',
            padding: '10px',
            borderRadius: '5px',
            color: '#fff',
          }}
        >
          <h4 style={{ margin: 0 }}>¡Felicidades! 🎉</h4>
          <p style={{ margin: 0 }}>Tu cita ha sido reservada.</p>
        </span>
      
        <CCard className='custom_card'>
          <CCardBody className='d-flex justify-content-between flex-column align-items-center'>
            <h6 style={{ marginBottom: '15px', fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>
              Detalles de la cita
            </h6>
            <p>
              <strong>Servicio:</strong> {data?.data?.service?.name || ''}
            </p>
            <p>
              <strong>Hora de inicio:</strong> {data?.data?.startTime || ''}
            </p>
            <p>
              <strong>Ubicación:</strong> {data?.data?.location?.name || ''}
            </p>
            <p>
              <strong>Equipo:</strong> {data?.data?.staff?.email || ''}
            </p>
          </CCardBody>
        </CCard>
      
        <CButton
          type='reset'
          onClick={handleBtnClick}
          style={{
            marginTop: '20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Nueva cita
        </CButton>
      </CContainer>
      
    );
};

export default BookingDetails