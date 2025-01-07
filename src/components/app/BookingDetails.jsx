import { CContainer } from '@coreui/react';
import { CCard, CCardBody, CCardHeader, CCardFooter, CButton } from '@coreui/react';
import React from 'react'
import './CustomBooking.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function BookingDetails() {

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
                
                <CCardBody>
                    <h6>Detalles de la cita</h6>
                    <p>This is some text within a card body.</p>
                    
                </CCardBody>
                <CCardFooter>Card Footer</CCardFooter>
            </CCard>
            <CButton type='reset' onClick={handleBtnClick}>New cita</CButton>
        </CContainer>
    );
};

export default BookingDetails