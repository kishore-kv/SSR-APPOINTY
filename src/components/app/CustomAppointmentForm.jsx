
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

    //displaying location
    const [location , setLocation] = useState("Posiciones");

    //trackingLOcationId
    const [locationID , setIsLocationID] = useState('');

    //loader for location
   const [isLoading , setIsLoading] = useState(false);
   //error for location
   const [ isError , setIsError] = useState(false);  
   
  /* APIS calls*/
  //locations
    const fetchLocations = async () => {
      const payload = { limit: 10, page: 0 };
      setIsLoading(true);
      try {
        const response = await requestPost('/getAllLocations', payload);
        if (response && response.data.status === "Success") {
          const { data } = response.data;
          // console.log(`data`,data);
          
          setLocations(data);
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
      console.log(`locationID`, typeof locationID);
      
    //servicesById
    //Function to call the API based on the location
  const fetchServiceData = async (location) => {
    console.log(location);
    
    try {
      const response = await request(`/getLocationById/${location}`);
      if (response && response.data.status === "Success") {
        const { data } = response.data;
        console.log(`servicedata`,data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };  

   //Fuction to call the API based on the date
    const fetchStaffHoursData = async( ) =>{
      const payLoad = {
        id:'2',
        date:'23-12-2024'
      }
      try {
        const response = await requestPost(`/getStaffListHours`,payLoad);
        if (response && response.data.status === "Success") {
          const { data } = response.data;
          console.log(`servicedata`,data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

  // useEffect to listen for location changes and call the API
    useEffect(() => {
      fetchLocations(locationID);
      fetchStaffHoursData();
    }, []);

    //useEffect for fetching locationById
    useEffect(() => {
      if (locationID) {
        fetchServiceData(locationID);
      }
    }, [locationID]);


       /*++++++++++Handlers++++++++++++++++++++*/
    //Displaying the locations location handler;
    const handleSelectLocation = (indx , location) => {
            const updateID = location.id;
            setIsLocationID(updateID);
            setLocation(`${location.branchName},${location.city}`);
    }
      


      //FLATPICKR HANDLERS
      const handleFlatPicker = (index , location ) =>{
         
      }
     

  return ( 
    <CContainer className='py-lg-5 custom_container'
      style={{
        height: '80%',
        border: '1px solid red'
      }}>

      <CContainer className='custom_section py-lg-4 d-flex justify-content-center align-items-center flex-column' style={{ border: "2px solid yellow" }}>
        <h1 className='custom_appointment_font'>Nueva Cita</h1>
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }}>
          <CDropdown className='mb-2 custom_dropdown_locations'>
            <CDropdownToggle className="dropdown_card"> <span><MapPin className='responsive-icon' /> {location}</span> <span className="ms-2"></span></CDropdownToggle>
            <CDropdownMenu style={{ width: '100%' }} className="">

              { isLoading && <div className='d-flex justify-content-center'><CSpinner/></div>}
              { !isLoading &&
                locations?.map((location, index) => {
                  return <CDropdownItem key={location.id} onClick={() => handleSelectLocation(index, location)}>{`${location.branchName},${location.city}`}</CDropdownItem>
                })
              }
            </CDropdownMenu>
          </CDropdown>
          {isError && <span className='text-danger'>{"* Error al obtener ubicaciones"}</span>}
        </CCol>

        {/* SErVICE */}
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }}>
          <Select 
           placeholder = "Seleccionar ubicación"
          />
          
          </CCol>
        {/* staff */}
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }}>
          <CDropdown className='mb-2 custom_dropdown_locations'>
            <CDropdownToggle className="dropdown_card"> <span><MapPin className='responsive-icon' /> {`Seleccionar Personal`}</span> <span className="ms-2"></span></CDropdownToggle>
            <CDropdownMenu style={{ width: '100%' }} className="">
              {/* {
                locations?.map((location, index) => {
                  return <CDropdownItem key={location.id} onClick={() => handleSelectLocation(index, location)}>{`${location.branchName},${location.city}`}</CDropdownItem>
                })
              } */}
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
        <CCol lg={4} className='d-flex justify-content-center'>
          <CButton type='submit' className='w-100'>Reservar</CButton>
        </CCol>
      </CContainer>

    </CContainer>
        

  )

}

 

export default CustomAppointmentForm