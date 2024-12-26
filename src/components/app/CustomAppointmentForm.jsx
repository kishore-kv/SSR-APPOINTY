
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
 
    const [locations , setLocations] = useState([
      {
        "id": 1,
        "branchName": "branch1",
        "address1": "marathahalli",
        "address2": "multiplex",
        "city": "banglore",
        "state": "karnataka",
        "postalCode": "560037",
        "phoneNumber": "9087654321"
      },
      {
        "id": 2,
        "branchName": "branch2",
        "address1": "whitefield",
        "address2": "kadugodi",
        "city": "banglore",
        "state": "karnataka",
        "postalCode": "560045",
        "phoneNumber": "9087654321"
      },
      {
        "id": 3,
        "branchName": "branch2",
        "address1": "hebbal",
        "address2": "nagavara",
        "city": "banglore",
        "state": "karnataka",
        "postalCode": "560103",
        "phoneNumber": "9087654321"
      }
    ]);
   
     



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
      
    
      // fetchLocations();
    }, []);
       
      
      //FLATPICKR HANDLERS
      const handleFlatPicker = ( ) =>{

      }
     

  return ( <div className=''>
    <CContainer className='py-lg-5 custom_container flex-column m-0 d-flex justify-content-center align-items-center' 
    style={{
      height:'80%',
      border:'1px solid red'
    }}>
            
        <CContainer className='custom_section d-flex justify-content-center align-items-center flex-column'style={{border:"2px solid yellow"}}>
               <h1 className='custom_appointment_font'>Nueva Cita</h1>
            <CCol xs={12} style={{border:"2px solid green", width:"80%"}}>
              <CDropdown className='mb-2 custom_dropdown_locations'>
              <CDropdownToggle className="dropdown_card"> <span><MapPin className='responsive-icon' /> {`Posiciones`}</span> <span className="ms-2"></span></CDropdownToggle>
               <CDropdownMenu style={{ width: '100%' }} className="">
              {
                locations?.map((location, index) => {
                return <CDropdownItem key={location.id} onClick={()=> handleSelectLocation(index , location)}>{`${location.branchName},${location.city}`}</CDropdownItem>
               })
            }
          </CDropdownMenu>
        </CDropdown>
            
        </CCol>
         
              {/* SErVICE */}
              <CCol xs={12} style={{border:"2px solid green" , width:"80%"}}><Select/></CCol>
              {/* staff */}
              <CCol xs={12} style={{border:"2px solid green", width:"80%"}}>
              <CDropdown className='mb-2 custom_dropdown_locations'>
              <CDropdownToggle className="dropdown_card"> <span><MapPin className='responsive-icon' /> {`Seleccionar Personal`}</span> <span className="ms-2"></span></CDropdownToggle>
               <CDropdownMenu style={{ width: '100%' }} className="">
              {
                locations?.map((location, index) => {
                return <CDropdownItem key={location.id} onClick={()=> handleSelectLocation(index , location)}>{`${location.branchName},${location.city}`}</CDropdownItem>
               })
            }
          </CDropdownMenu>
        </CDropdown>
            
        </CCol>
             {/* Calendar */}
        <CCol style={{border:"2px solid green"}}>
                <span class="avatar-icon avatar-icon--has-img">
             <CIcon icon={cilCalendar} className={`form-icon`} />
             </span>
            <span className="meeting__card__name">
              <Flatpickr options={{ minDate: "2017-01-01" }} onChange={(value)=>handleFlatPicker(value)} className={`selected_flatpicky`}/>
            </span>
        </CCol>
            {/* TIME */}
              <CCol style={{border:"2px solid green"}}>
              <span class="avatar-icon avatar-icon--has-img">
             <CIcon icon={cilCalendar} className={`form-icon`} />
             </span>
            <span className="meeting__card__name">
              <Flatpickr options={{ minDate: "2017-01-01" }} onChange={(value)=>handleFlatPicker(value)} className={`selected_flatpicky`}/>
            </span>
              </CCol>
              {/* PRICE */}
              <CCol style={{border:"2px solid green"}}>
          <span class="avatar-icon avatar-icon--has-img">
          <CurrencyDollar size={24} />
        </span>
        <span className="meeting__card__name">
        <CFormInput className={`input-minimal`} value={'200'}  type={'text'} />
          </span>
                </CCol>
              {/* CUTOMER NAME */}
          <CCol style={{border:"2px solid green"}}>
              <span class="avatar-icon avatar-icon--has-img">
              <CIcon icon={cilEnvelopeClosed} className={`form-icon`} />
        </span>
        <span className="meeting__card__name">
        <CFormInput className={`input-minimal`} value={'200'}  type={'text'} />
          </span>

              </CCol>
              <CButton type='submit'>Reservar</CButton>
        </CContainer>
       
      </CContainer>
      </div>
        

  )

}

 

export default CustomAppointmentForm