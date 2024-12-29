
import { CDropdown, CForm, CFormInput,CDropdownDivider, CRow, CDropdownToggle, CDropdownMenu, CDropdownItem, CCol, CSpinner, CContainer } from '@coreui/react'
import React, { useEffect, useState } from 'react'
 import { MapPin,CurrencyDollar,CalendarDots,Clock,EnvelopeSimple, CallBell, User } from "@phosphor-icons/react";
 import Select from 'react-select';
 import './CustomForm.css';
 import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { request , requestPost} from '../../services/request';
import { CButton } from '@coreui/react';
import TimePickerCalendarStyle from './TimePickerCalendarStyle';
 
 


/*  This component consists of two children 1.dropDown for location and 2.formInputs
 */

const CustomAppointmentForm = () => {
  //APPOINTMENT FORM DATA
  const initialData = {
      customerEmail: "",
      locationId:'' ,
      staffId: '',
      serviceId: '',
      date: '',
      startTime: ''
    }
  
  const [formData , setFormData] = useState(initialData);
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
    /*+++++++++DATE TRACKER +++++++++++*/
    const [disabledDays, setDisabledDays] = useState([]);
    const dayNameToNumber = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    }; 
    /*++++TIMEPICKR AVAILABILITY STAFF +++++++++++++=*/
    const [availabilityArray , setAvailabilityArray] = useState([]);
    const [availabilityObj , setAvailabilityObj] = useState({});
     /*+++++++++PRICE+++++++++++++*/
     const [price , setPrice] = useState('');
    /*+++++++++++++EMAIL OF CUSTOMER*/
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
            setFormData({ ...formData, locationId:updateID });
            setLocation(`${location.branchName},${location.city}`);
    }
       //setting the new service on dropdown
      const handleSelectService=(indx,service) => {
          console.log(`service`, service);
          const updateStaffList = service.staffList;
        setService(`${service.serviceName} (${service.durationMins}mins)`);
        setStaffOptions(updateStaffList);
        setPrice(service.price);
        setFormData({ ...formData, serviceId:service.id});
      }
      //setting the staffNumber on dropdow
      const handleSelectStaff = (index , staff) =>{
        console.log(`stafd`,staff);
        setAvailabilityArray(staff.availability);
         const updateAvailableDays = staff.availability?.map((availble) => dayNameToNumber[availble.availableDay.toLowerCase()]);
        //  console.log(`uad`,updateAvailableDays);
         
         setDisabledDays(updateAvailableDays)
        setStaff(`${staff.firstName} ${staff.lastName}`);
        setFormData({ ...formData, staffId:staff.id});
      }

      //FLATPICKR HANDLERS
      const enableOptions = {
        minDate:new Date(),
        dateFormat: "d-m-Y",
        disable: [
          function (date) {
            // Return true to disable the date
            return !disabledDays.includes(date.getDay());
          },
        ]

      };

       // Format date as dd-mm-yyyy
           const formatDate = (date) => {
               const day = String(date.getDate()).padStart(2, "0");
               const month = String(date.getMonth() + 1).padStart(2, "0");
               const year = date.getFullYear();
                return `${day}-${month}-${year}`;
       };
      const handleFlatPicker = (selectedDates) =>{
        const updateAvailableObj = availabilityArray.find((ele) => ele.availableDay.includes(String(selectedDates[0]).split(' ')[0].toUpperCase()))
           console.log(`zzzzzz`,updateAvailableObj);
           
        setAvailabilityObj(updateAvailableObj)
        console.log(`selected` , selectedDates[0]);
        // console.log(`zzzzzzzzz`,zzz);
        
        if (selectedDates.length > 0) {
          const formattedDate = formatDate(selectedDates[0]);
          setFormData({ ...formData, date: formattedDate });
        }
         
      }
      // Email handlechange handler
      const handleInputChange = (e) =>{
         const { name, value } = e.target;
         setFormData((prevData) => ({
           ...prevData,
           [name]: value, // Update the corresponding field in formData
         }));
      }

      //TIMPICKR HANDLER TO UPDATE FORM DATA
       // Handler to update formData.startTime
   const handleTimeChange = (selectedTime) => {
    setFormData((prevData) => ({
      ...prevData,
      startTime: selectedTime, // Update startTime with the selected time
    }));
  };
     //form submit handler
     const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Data:", formData);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    };

  return ( 
    <CContainer className='py-lg-5 custom_container'
      style={{
        height: '80%',
        border: '1px solid red'
      }}>
       <CForm onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <CContainer className='custom_section py-lg-4 d-flex justify-content-center align-items-center flex-column' style={{ border: "2px solid yellow" }}>
        
        <h1 className='custom_appointment_font'>Nueva Cita</h1>
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }} className='custom_col'>
          <CDropdown className='mb-2 custom_dropdown_locations'>
            <CDropdownToggle className="dropdown_card"> <span className='custom_span_sz'><MapPin className='' size={'7%'}/> {location}</span> <span className="ms-2"></span></CDropdownToggle>
            <CDropdownMenu style={{ width: '100%' }} className="">

              { isLoading && <div className='d-flex justify-content-center'><CSpinner/></div>}
              { !isLoading &&
                locations?.map((location, index) => {
                  return <CDropdownItem key={index} onClick={() => handleSelectLocation(index, location)}>{`${location.branchName},${location.city}`}</CDropdownItem>
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
                  return <CDropdownItem key={index} onClick={() => handleSelectService(index, service)}>{`${service.serviceName} (${service.durationMins}mins)`}</CDropdownItem>
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
                  return <CDropdownItem key={index} onClick={() => handleSelectStaff(index, staff)}>{`${staff.firstName} ${staff.lastName}`}</CDropdownItem>
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
                <Flatpickr options={enableOptions} 
                           onChange={(value) => handleFlatPicker(value)} 
                           value={formData.date}
                           className={`selected_flatpicky w-100`} />
              </span>
            </CCol>
          </CRow>
        </CCol>
        {/* TIME */}
        <CCol xs={12} lg={8} style={{ border: "2px solid green" }} className='custom_col'>
           <TimePickerCalendarStyle 
             availableTime ={availabilityObj}
            value={formData.startTime} // Pass the current startTime as value
        onTimeChange={handleTimeChange} // Pass handler to update startTime
        />
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
                <CFormInput className={`input-minimal`} value={price} type={'text'} />
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
              <CFormInput className={`input-minimal`} autoComplete='off' name="customerEmail" value={formData.customerEmail} type={'text'} onChange={handleInputChange}/>
            </span>
            </CCol>
          </CRow>
        </CCol>
        <CCol lg={4} className='d-flex justify-content-center'>
          <CButton type='submit' className='w-100 reserver_btn'>Reservar</CButton>
        </CCol>
     
      </CContainer>
      </CForm>
    </CContainer>
        

  )

}

 

export default CustomAppointmentForm