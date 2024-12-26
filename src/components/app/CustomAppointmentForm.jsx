
import {  cilCalendar, cilCircle, cilEnvelopeClosed, cilHandPointRight, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CDropdown, CForm, CFormInput,CDropdownDivider, CRow, CDropdownToggle, CDropdownMenu, CDropdownItem, CCol, CSpinner, CContainer } from '@coreui/react'
import React, { useEffect, useState } from 'react'
 import { MapPin,CurrencyDollar } from "@phosphor-icons/react";
 import Select from 'react-select';
 import './CustomForm.css';
 import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { request , requestPost} from '../../services/request';
import { CButton } from '@coreui/react';
 
 

 

/*  This component consists of two children 1.dropDown for location and 2.formInputs
 */

const CustomAppointmentForm = () => {
    //fetching locations data
    const [locations , setLocations] = useState([ ]);
   
     



    const fetchLocations = async () => {
      const payload = { limit: 10, page: 0 };
      try {
        const response = await requestPost('/getAllLocations', payload);
        if (response && response.data.status === "Success") {
          const { data } = response;
          console.log(`data`,data);
          
          setLocations(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        // setIsLoading(false);
      }
    };


    useEffect(() => {
      fetchLocations();
    }, []);
       
      
      //FLATPICKR HANDLERS
      const handleFlatPicker = ( ) =>{

      }
     

  return ( 
    <CContainer className='py-lg-5 custom_container'
      style={{
        height: '80%',
        border: '1px solid red'
      }}>

      <CContainer className='custom_section d-flex justify-content-center align-items-center flex-column' style={{ border: "2px solid yellow" }}>
        <h1 className='custom_appointment_font'>Nueva Cita</h1>
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }}>
          <CDropdown className='mb-2 custom_dropdown_locations'>
            <CDropdownToggle className="dropdown_card"> <span><MapPin className='responsive-icon' /> {`Posiciones`}</span> <span className="ms-2"></span></CDropdownToggle>
            <CDropdownMenu style={{ width: '100%' }} className="">
              {
                locations?.map((location, index) => {
                  return <CDropdownItem key={location.id} onClick={() => handleSelectLocation(index, location)}>{`${location.branchName},${location.city}`}</CDropdownItem>
                })
              }
            </CDropdownMenu>
          </CDropdown>

        </CCol>

        {/* SErVICE */}
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }}><Select /></CCol>
        {/* staff */}
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }}>
          <CDropdown className='mb-2 custom_dropdown_locations'>
            <CDropdownToggle className="dropdown_card"> <span><MapPin className='responsive-icon' /> {`Seleccionar Personal`}</span> <span className="ms-2"></span></CDropdownToggle>
            <CDropdownMenu style={{ width: '100%' }} className="">
              {
                locations?.map((location, index) => {
                  return <CDropdownItem key={location.id} onClick={() => handleSelectLocation(index, location)}>{`${location.branchName},${location.city}`}</CDropdownItem>
                })
              }
            </CDropdownMenu>
          </CDropdown>

        </CCol>
        {/* Calendar */}
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }}>
          <CRow className='d-flex custom_row_inputs'>
            <CCol lg={2} xs={2}>
              <span class="avatar-icon avatar-icon--has-img">
                <CIcon icon={cilCalendar} className={`form-icon`} />
              </span>
            </CCol>
            <CCol lg={10} xs={10}>
              <span className="meeting__card__name">
                <Flatpickr options={{ minDate: "2017-01-01" }} onChange={(value) => handleFlatPicker(value)} className={`selected_flatpicky w-100`} />
              </span>
            </CCol>
          </CRow>
        </CCol>
        {/* TIME */}
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }}>
          <CRow className='d-flex custom_row_inputs'>
            <CCol lg={2} xs={2}>
              <span class="avatar-icon avatar-icon--has-img">
                <CIcon icon={cilCalendar} className={`form-icon`} />
              </span>
            </CCol>
            <CCol lg={10} xs={10}>
              <span className="meeting__card__name">
                <Flatpickr options={{ minDate: "2017-01-01" }} onChange={(value) => handleFlatPicker(value)} className={`selected_flatpicky w-100`} />
              </span>
            </CCol>
          </CRow>
        </CCol>
        {/* PRICE */}
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }}>
          <CRow className='d-flex custom_row_inputs'>
            <CCol lg={2} xs={2}>
              <span class="avatar-icon avatar-icon--has-img">
                <CurrencyDollar size={24} />
              </span>
            </CCol>
            <CCol lg={10} xs={10}>
              <span className="meeting__card__name">
                <CFormInput className={`input-minimal`} value={'200'} type={'text'} />
              </span>
            </CCol>
          </CRow>
        </CCol>
        {/* CUTOMER NAME */}

        <CCol xs={12} lg={8} style={{ border: "2px solid green" }}>
          <CRow className='d-flex custom_row_inputs'>
            <CCol lg={2} xs={2}>
            <span class="avatar-icon avatar-icon--has-img">
              <CIcon icon={cilEnvelopeClosed} className={`form-icon`} />
            </span>
            </CCol>
            <CCol lg={10} xs={10}>
            <span className="meeting__card__name">
              <CFormInput className={`input-minimal`} value={'200'} type={'text'} />
            </span>
            </CCol>
          </CRow>
        </CCol>
        <CCol lg={4}>
          <CButton type='submit'>Reservar</CButton>
        </CCol>
      </CContainer>

    </CContainer>
        

  )

}

 

export default CustomAppointmentForm