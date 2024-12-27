
import { CDropdown, CForm, CFormInput,CDropdownDivider, CRow, CDropdownToggle, CDropdownMenu, CDropdownItem, CCol, CSpinner, CContainer } from '@coreui/react'
import React, { useEffect, useState } from 'react'
 import { MapPin,CurrencyDollar,CalendarDots,Clock,EnvelopeSimple, CallBell, User } from "@phosphor-icons/react";
 import Select from 'react-select';
 import './CustomForm.css';
 import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { request , requestPost} from '../../services/request';
import { CButton } from '@coreui/react';
 
 


/*  This component consists of two children 1.dropDown for location and 2.formInputs
 */

const CustomAppointmentForm = () => {
  //APPOINTMENT FORM DATA
  // const formData = {
  //     "customerEmail": "",
  //     "locationId": 0,
  //     "staffId": 0,
  //     "serviceId": 0,
  //     "date": "2024-12-27T10:56:01.227Z",
  //     "startTime": "2024-12-27T10:56:01.227Z"
  //   }
  // const [formData , setF]
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
       /*++++++++++++ REACT SELECT +++++++++++++++++++++++*/
   //diplaying servicesOptionlist
   //displaying service
   const [ service , setService] = useState("Seleccionar ubicación")
    const [serviceOptions , setServiceOptions] = useState([{}]);

    /*++++++++++STAFF STATE TRACKER+++++++*/
    const [staff , setStaff] = useState("Seleccionar Personal");
    const [staffOptions ,setStaffOptions] = useState([ ]);
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
      // console.log(`locationID`, typeof locationID);
      
    //servicesById
    //Function to call the API based on the location
  const fetchServiceData = async (location) => {
    // console.log(location);
    
    try {
      const response = await request(`/getLocationById/${location}`);
      if (response && response.data.status === "Success") {
        const { data } = response.data;
        const updtaeServiceList = data?.servicesList
                                      ?.map((service) => ({label:`${service.serviceName} (${service.durationMins}mins)` ,value:service.serviceName, ...service}));
        // console.log(updtaeServiceList);
          
        setServiceOptions(updtaeServiceList);
        // console.log(`servicedata`,data);
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
          // console.log(`servicedata`,data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

  // useEffect to listen for location changes and call the API
    useEffect(() => {
      fetchLocations();
      // fetchStaffHoursData();
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
       //setting the new service on dropdown
      const handleSelectService=(indx,service) => {
          console.log(`service`, service);
          const updateStaffList = service.staffList;
        setService(`${service.serviceName} (${service.durationMins}mins)`);
        setStaffOptions(updateStaffList);
      }
      //setting the staffNumber on dropdow
      const handleSelectStaff = (index , staff) =>{
        setStaff(`${staff.firstName} ${staff.lastName}`);
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
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }} className='custom_col'>
          <CDropdown className='mb-2 custom_dropdown_locations'>
            <CDropdownToggle className="dropdown_card"> <span className='custom_span_sz'><MapPin className='' size={'7%'}/> {location}</span> <span className="ms-2"></span></CDropdownToggle>
            <CDropdownMenu style={{ width: '100%' }} className="">

              { isLoading && <div className='d-flex justify-content-center'><CSpinner/></div>}
              { !isLoading &&
                locations?.map((location, index) => {
                  return <CDropdownItem key={location.id} onClick={() => handleSelectLocation(index, location)}>{`${location.branchName},${location.city}`}</CDropdownItem>
                })
              }
            </CDropdownMenu>
          </CDropdown>
          {/* {isError && <span className='text-danger'>{"* Error al obtener ubicaciones"}</span>} */}
        </CCol>

        {/* SErVICE */}
        {/* <CCol xs={12} lg={8} style={{ border: "2px solid green" }} className='custom_col'>
          <Select 
           placeholder = "Seleccionar ubicación"
           options={serviceOptions}
          />
          </CCol> */}

          {/*alternate service*/}

          <CCol xs={12} lg={8} style={{ border: "2px solid green" }} className='custom_col'>
          <CDropdown className='mb-2 custom_dropdown_locations'>
            <CDropdownToggle className="dropdown_card"> <span className='custom_span_sz'><CallBell className='' size={'7%'}/> {service}</span> <span className="ms-2"></span></CDropdownToggle>
            <CDropdownMenu style={{ width: '100%' }} className="">

              { isLoading && <div className='d-flex justify-content-center'><CSpinner/></div>}
              { !isLoading &&
                serviceOptions?.map((service, index) => {
                  return <CDropdownItem key={service.id} onClick={() => handleSelectService(index, service)}>{`${service.serviceName} (${service.durationMins}mins)`}</CDropdownItem>
                })
              }
            </CDropdownMenu>
          </CDropdown>
          {/* {isError && <span className='text-danger'>{"* Error al obtener ubicaciones"}</span>} */}
        </CCol>


          {/* /?++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        {/* staff */}
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }} className='custom_col'>
          <CDropdown className='mb-2 custom_dropdown_locations'>
            <CDropdownToggle className="dropdown_card"> <span className='custom_span_sz'><User size={'7%'} /> {staff}</span> <span className="ms-2"></span></CDropdownToggle>
            <CDropdownMenu style={{ width: '100%' }} className="">
              {
                staffOptions?.map((staff, index) => {
                  return <CDropdownItem key={staff.id} onClick={() => handleSelectStaff(index, staff)}>{`${staff.firstName} ${staff.lastName}`}</CDropdownItem>
                })
              }
            </CDropdownMenu>
          </CDropdown>

        </CCol>
        {/* Calendar */}
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }} className='custom_col'>
          <CRow className='d-flex custom_row_inputs h-100'>
            <CCol lg={2} xs={2}>
              <span class="avatar-icon avatar-icon--has-img">
              <CalendarDots size={"1.5rem"} />
              </span>
            </CCol>
            <CCol lg={10} xs={10}>
              <span className="meeting__card__name">
                <Flatpickr options={{ minDate: new Date(), disable:[0,1] }} onChange={(value) => handleFlatPicker(value)} className={`selected_flatpicky w-100`} />
              </span>
            </CCol>
          </CRow>
        </CCol>
        {/* TIME */}
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }} className='custom_col'>
          <CRow className='d-flex custom_row_inputs h-100'>
            <CCol lg={2} xs={2}>
              <span class="avatar-icon avatar-icon--has-img">
              <Clock size={"1.5rem"} />
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
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }}className='custom_col'>
          <CRow className='d-flex custom_row_inputs'>
            <CCol lg={2} xs={2}>
              <span class="avatar-icon avatar-icon--has-img">
                <CurrencyDollar size={"1.5rem"} />
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

        <CCol xs={12} lg={8} style={{ border: "2px solid green" }} className='custom_col'>
          <CRow className='d-flex custom_row_inputs'>
            <CCol lg={2} xs={2}>
            <span class="avatar-icon avatar-icon--has-img">
            <EnvelopeSimple size={"1.5rem"} />
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
          <CButton type='submit' className='w-100 reserver_btn'>Reservar</CButton>
        </CCol>
      </CContainer>

    </CContainer>
        

  )

}

 

export default CustomAppointmentForm