import { CContainer } from '@coreui/react';
import { CCard, CCardBody, CCardHeader,CRow,CCol, CCardFooter, CButton,CTooltip} from '@coreui/react';
import React, { useState } from 'react'
import './CustomBooking.css'
import { useLocation, useHistory} from 'react-router-dom';
import { Copy } from '@phosphor-icons/react';
import { convertToAMPM } from '../../utils/storage';
 
 


function BookingDetails() {

  const [copied, setCopied] = useState(false);
    const location = useLocation();
    const data = location.state?.data; // Access the passed data
    console.log(`dataaaaa`,data);
     
    const navigateBack = useHistory();
      const handleBtnClick = () =>{
          navigateBack.push('/')
      }

      const textToCopy =  `${data?.data?.location?.name || ''}
      ${data?.data?.location?.postalCode || ''}
      ${data?.data?.location?.address1 || ''}
      ${data?.data?.location?.address2 || ''}
      ${data?.data?.location?.state || ''}
      ${data?.data?.location?.city || ''}`
     

      // Async function to copy text to clipboard
      const handleCopy = async () => {
        
        try {
          await navigator.clipboard.writeText(textToCopy);
          setCopied(true);
    
          // Reset the "Copied" tooltip after 2 seconds
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        } catch (error) {
          console.error('Failed to copy text:', error);
        }
      };
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
          <CCardBody>
            <h6 style={{ marginBottom: '15px', fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>
              Detalles de la cita
            </h6>
            <CRow>
            <CCol sm={6} className='col-6'>
              <strong>Número de cita:</strong>
            </CCol>
            <CCol sm={6}  className='col-6'>
            {data?.data?.appointmentId || ''}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}  className='col-6'>
              <strong>Servicio:</strong>
            </CCol>
            <CCol sm={6}  className='col-6'>
            {data?.data?.service?.name || ''}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}  className='col-6'>
              <strong>Hora de inicio:</strong>
            </CCol>
            <CCol sm={6}  className='col-6'>
            {convertToAMPM(data?.data?.startTime) || ''}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}  className='col-6'>
              <strong>Ubicación:</strong>
            </CCol>
            <CCol sm={6} className='navigator_copy col-6'>
            <CRow>
            <div className='address_ui col-lg-6 col-md-6 col-10'>
            {data?.data?.location?.name || ''}
            {data?.data?.location?.postalCode || ''}
            {data?.data?.location?.address1 || ''}
            {data?.data?.location?.address2 || ''}
            {data?.data?.location?.state || ''}
            {data?.data?.location?.city || ''}
            </div>
            
       
            <CTooltip 
        content={copied ? 'Copied!' : 'Copied!'} 
        placement="top"
        trigger={'click'}
      >
        <Copy className='resp_img_er col-lg-4 my-lg-4 my-4
         col-md-6 col-2' style={{cursor:"pointer"}}size={'1.5em'} onClick={handleCopy}/>
        </CTooltip>
        </CRow>
  
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6} className='col-6'>
              <strong>Equipo:</strong>
            </CCol>
            <CCol sm={6} className='col-6'>
            {data?.data?.staff?.email || ''}
            </CCol>
          </CRow>
          </CCardBody>
          <CCardFooter className='text-warning text-center'>Aviso: La tarifa de la cita debe pagarse en la clínica.</CCardFooter>
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