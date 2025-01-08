
import { CDropdown, CForm, CFormInput,CDropdownDivider, CRow, CDropdownToggle, CDropdownMenu, CDropdownItem, CCol, CSpinner, CContainer } from '@coreui/react'
import React, { useEffect, useState } from 'react'
 import { MapPin,CurrencyDollar,CalendarDots,Clock,EnvelopeSimple, CallBell, User } from "@phosphor-icons/react";
 import './CustomForm.css';
 import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { request , requestPost} from '../../services/request';
import { CButton } from '@coreui/react';
import TimePickerCalendarStyle from './TimePickerCalendarStyle';
import { convertTo24HourFormat } from '../../utils/storage/index';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';
 
 


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
    /** EDge cases */
    //first dropdown
    const [disableService , setEnableService] = useState(true);
    const [disableStaff , setEnableStaff] = useState(true);
  
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
    const [isServiceLoading , setServiceLoading] = useState(false);
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
    const [blockedAppointments , setBlockedAppointments] = useState([ ]);
    /*++++TIMEPICKR AVAILABILITY STAFF +++++++++++++=*/
    const [availabilityArray , setAvailabilityArray] = useState([]);
    const [availabilityObj , setAvailabilityObj] = useState({});

    const [inputValue, setInputValue] = useState("");
     /*+++++++++PRICE+++++++++++++*/
     const [price , setPrice] = useState('');
    /*+++++++++++++EMAIL OF CUSTOMER*/

    /*+++++++++++ params for staffAvaialability*/
    const [staffId , setStaffId] = useState('');
    const [ dateParams , setDateParams] = useState('');
    const [duration , setDuration] = useState(' ');

    /*++++form -loader*/
    const [pageLoader , setPageLoader] = useState(false);

    /**  ===================== Handling Form Errors */
    const [formErrors , setFormErrors] = useState({});

    /**
     *  new appointment navigation
     */
    const navigate = useHistory();
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
    setServiceLoading(true);
    setEnableService(false);
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
    }finally{
      setServiceLoading(false);
    }
  };  

   //Fuction to call the API based on the date
    const fetchStaffHoursData = async(id , date , minutes) =>{
      const payLoad = {
        id,
        date,
        minutes
      }
      try {
        const response = await requestPost(`/getStaffListHours`,payLoad);
        // console.log(`-------------`,response);
        
        if (response && response.status === 200) {
          const { data } = response.data;
          setBlockedAppointments(data.appointments);
          // console.log(`servicedata booked`,response);
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
    //useEffect for fetching the existing availability upon staffid
     useEffect(() => {
        if(staffId && dateParams && duration){
          // console.log(`stadd`,staffId);
          // console.log(`stadd`,dateParams);
          
          fetchStaffHoursData(staffId,dateParams,duration);
        }
     },[staffId,dateParams,duration])
       /*++++++++++Handlers++++++++++++++++++++*/
       //handling and validate form fields
       const validate = () => {
        let validationErrors = {};
        if (!formData.date) {
          validationErrors.date = 'La fecha es obligatoria';
        }
        if (!formData.customerEmail) {
          validationErrors.email = 'El correo electrónico es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
          validationErrors.email = 'El correo electrónico no es válido';
        }
        if (!formData.locationId) {
          validationErrors.location = 'La ubicación es obligatoria';
        }
        if (!formData.serviceId) {
          validationErrors.service = 'El servicio es obligatorio';
        }
        if (!formData.staffId) {
          validationErrors.staff = 'El personal es obligatorio';
        }
        if (!formData.startTime) {
          validationErrors.time = 'La hora es obligatoria';
        }
        return validationErrors;
      };
      

    //Displaying the locations location handler;
    const handleSelectLocation = (indx , location) => {
        
            const updateID = location.id;
            setIsLocationID(updateID);
            setFormData({ ...formData, locationId:updateID , date:'' ,startTime:'',serviceId:'',staffId:'' });
            setLocation(`${location.branchName},${location.city}`);
            setService("Seleccionar ubicación");
            setStaff("Seleccionar Personal");
            setEnableStaff(true);
            setPrice('');
            setInputValue('');
            setFormErrors((prev) => ({...prev , location:""}))
    }
       //setting the new service on dropdown
      const handleSelectService=(indx,service) => {
          console.log(`service`, service);
          const updateStaffList = service.staffList;
        setService(`${service.serviceName} (${service.durationMins}mins)`);
        setDuration(service.durationMins);
        setStaffOptions(updateStaffList);
        setEnableStaff(false);
        setPrice(service.price);
        setFormData({ ...formData, serviceId:service.id , date:'',startTime:'',staffId:''});
        setInputValue('');
        setStaff("Seleccionar Personal");
        setFormErrors((prev) => ({...prev , service:""}))
      }
      //setting the staffNumber on dropdow
      const handleSelectStaff = (index , staff) =>{
        // console.log(`stafd`,staff);
        setAvailabilityArray(staff.availability);
         const updateAvailableDays = staff.availability?.map((availble) => dayNameToNumber[availble.availableDay.toLowerCase()]);
        //  console.log(`uad`,updateAvailableDays);
        setInputValue('');
         setStaffId(staff.id);
         setDisabledDays(updateAvailableDays)
        setStaff(`${staff.firstName} ${staff.lastName}`);
        setFormData({ ...formData, staffId:staff.id, date:'',startTime:''});
        setFormErrors((prev) => ({...prev , staff:""}))
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
          //  console.log(`zzzzzz`,updateAvailableObj);
           
        setAvailabilityObj(updateAvailableObj)
        // console.log(`selected============` , selectedDates[0].getDate());
        // console.log(`zzzzzzzzz`,zzz);
        setInputValue('');
        if (selectedDates.length > 0) {
          const formattedDate = formatDate(selectedDates[0]);
          setDateParams(formattedDate);
          setFormData({ ...formData, date: formattedDate,startTime:'' });
        }
        setFormErrors((prev) => ({...prev , date:""}))
         
      }
      // Email handlechange handler
      const handleInputChange = (e) =>{
         const { name, value } = e.target;
         setFormData((prevData) => ({
           ...prevData,
           [name]: value, // Update the corresponding field in formData
         }));
         setFormErrors((prev) => ({...prev , email:""}))
      }

      //TIMPICKR HANDLER TO UPDATE FORM DATA
       // Handler to update formData.startTime
   const handleTimeChange = (selectedTime) => {
    setFormData((prevData) => ({
      ...prevData,
      startTime:selectedTime, // Update startTime with the selected time
    }));
    setFormErrors((prev) => ({...prev , time:""}))
  };
     //form submit handler
     const handleSubmit = async (e) => {
      e.preventDefault();
      // console.log("Form Data:", formData);
        const errors = validate();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
           setPageLoader(true);
      try {
         const responseBookingStatus = await requestPost("/postNewAppointment",formData);


        
         if(responseBookingStatus && responseBookingStatus.status === 200){
              toast.success( responseBookingStatus.data.data.message);
              const id = responseBookingStatus.data.data.appointmentId;
          console.log(`data`,responseBookingStatus);
          try {
            const getDetailsResponse = await request(`/fetchAppointmentById/${id}`);
            const data = getDetailsResponse.data;
              navigate.push('/details',{data})   
          } catch (error) {
            
          }
                
         }else if(responseBookingStatus && responseBookingStatus.response.status === 400){
        
          toast.error(responseBookingStatus.response.data.message || '¡Algo salió mal!');
         }
      } catch (error) {
        console.log(`failure err`, error);
        
      }finally{
        setPageLoader(false);
      }

    }
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
        border: ''
      }}>
       <CForm onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <CContainer className='custom_section py-lg-4 d-flex justify-content-center align-items-center flex-column' style={{ border: "" }}>
     
        <h1 className='custom_appointment_font'>Nueva Cita</h1>
        <CCol xs={12} lg={8} style={{ border: "" }} className='custom_col'>
          <CDropdown className='mb-2 custom_dropdown_locations'>
            <CDropdownToggle className="dropdown_card"> <span className='custom_span_sz'><MapPin className='resp_img' size={'7%'}/> <p className='text_resp'>{location}</p></span> <span className="ms-2"></span></CDropdownToggle>
            <CDropdownMenu style={{ width: '100%' }}  className="custom_menu">

              { isLoading && <div className='d-flex justify-content-center'><CSpinner/></div>}
              { !isLoading && locations.length > 0 &&
                locations?.map((location, index) => {
                  return <CDropdownItem key={index} onClick={() => handleSelectLocation(index, location)}>{`${location.branchName},${location.city}`}</CDropdownItem>
                })
              }
            </CDropdownMenu>
          </CDropdown>
          {formErrors.location && <span className="error">{formErrors.location}</span>}
        </CCol>
      
          {/*alternate service*/}

          <CCol xs={12} lg={8} style={{ border: "" }} className='custom_col'>
          <CDropdown className='mb-2 custom_dropdown_locations'>
            <CDropdownToggle className="dropdown_card" disabled={disableService}> <span className='custom_span_sz'><CallBell className='resp_img' size={'7%'}/> <p className='text_resp'>{service}</p></span> <span className="ms-2"></span></CDropdownToggle>
            <CDropdownMenu style={{ width: '100%' }}  className="custom_menu">

              { isServiceLoading && <div className='d-flex justify-content-center'><CSpinner/></div>}
              { !isServiceLoading &&
                serviceOptions?.map((service, index) => {
                  return <CDropdownItem key={index} onClick={() => handleSelectService(index, service)}>{`${service.serviceName} (${service.durationMins}mins)`}</CDropdownItem>
                })
              }
            </CDropdownMenu>
          </CDropdown>
          {formErrors.service && <span className="error">{formErrors.service}</span>}
        </CCol>
       

          {/* /?++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        {/* staff */}
        <CCol xs={12} lg={8} style={{ border: "" }} className='custom_col'>
          <CDropdown className='mb-2 custom_dropdown_locations'>
            <CDropdownToggle className="dropdown_card" disabled={disableStaff}> <span className='custom_span_sz'><User size={'7%'} className='resp_img' /> <p className='text_resp'>{staff}</p></span> <span className="ms-2"></span></CDropdownToggle>
            <CDropdownMenu style={{ width: '100%' }}  className="custom_menu">
              {
                staffOptions?.map((staff, index) => {
                  return <CDropdownItem key={index} onClick={() => handleSelectStaff(index, staff)}>{`${staff.firstName} ${staff.lastName}`}</CDropdownItem>
                })
              }
            </CDropdownMenu>
          </CDropdown>
          {formErrors.staff && <span className="error">{formErrors.staff}</span>}
        </CCol>
        
        {/* Calendar */}
        <CCol xs={12} lg={8} style={{ border: "" }} className='custom_col'>
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
          {formErrors.date && <span className="error">{formErrors.date}</span>}
        </CCol>
       
        {/* TIME */}
        <CCol xs={12} lg={8} style={{ border: "" }} className='custom_col'>
           <TimePickerCalendarStyle 
             blockedAppointments={blockedAppointments}
             availableTime ={availabilityObj}
            value={formData.startTime} // Pass the current startTime as value
        onTimeChange={handleTimeChange} // Pass handler to update startTime
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
         {formErrors.time && <span className="error">{formErrors.time}</span>}
        </CCol>

        {/* PRICE */}
        <CCol xs={12} lg={8} style={{ border: "" }}className='custom_col'>
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

        <CCol xs={12} lg={8} style={{ border:"" }} className='custom_col'>
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
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </CCol>
       
        <CCol lg={4} className='d-flex justify-content-center'>
          <CButton type='submit' className='w-100 reserver_btn'>Reservar</CButton>
        </CCol>
        
        {pageLoader && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}
      </CContainer>
      </CForm>
    </CContainer>
        

  )

}

 

export default CustomAppointmentForm