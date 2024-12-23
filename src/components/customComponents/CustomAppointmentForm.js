import { cilArrowBottom, cilCircle, cilHandPointRight, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CDropdown, CForm, CFormInput, CRow, CDropdownToggle, CDropdownMenu, CDropdownItem, CCol } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import './CustomDropDow.css';
import './CustomOption.css';
import { request } from '../../services/request';
import Select from 'react-select';
import "flatpickr/dist/themes/material_green.css";
import { components } from "react-select";

import Flatpickr from "react-flatpickr";

/*  This component consists of two children 1.dropDown for location and 2.formInputs
 */

const CustomAppointmentForm = ({ formItems, locationsData }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [inputValues, setInputValues] = useState([null, null, null, null]);
  const [location ,setLocation] = useState('');
  const [selctedService , setSelectedService] = useState('');
  //serviceStaff
  
  const handleSelect = (activendex) => {
    setSelectedIndex(activendex)
  }
  const { data } = locationsData || {}; // Default to avoid errors if `locationsData` is undefined

  if (!data) {
    return <div>Loading Locations...</div>;
  }
  //handlingINputs
  const handleInputChange = (index, e) => {
    // setSelectedDate(e.target.value);
    const updatedValues = [...inputValues];
    updatedValues[index] = e.target.value;
    setInputValues(updatedValues)
  }
    const handleFlatPicker = (value) => {
       console.log(Date(value[0]));
       
    }
  const formInputs = formItems.map((formItem, index) => {
     const options = formItem.type === 'time' ? {
        enableTime: true,       // Enable time selection
        noCalendar: true,       // Disable calendar
        dateFormat: "h:i K",    // Time format: 12-hour with AM/PM
        time_24hr: false,       // Use 12-hour format
        minuteIncrement: 15,    // Show times in 15-minute intervals
        minTime: "02:00",       // Earliest selectable time
        maxTime: "15:15",       // Latest selectable time
        defaultHour: 2,  
        mode:"range"       // Default hour (optional)

  }: { minDate: "2017-01-01" };
        
    const isSelected = selectedIndex === index;
    return <div key={index} class="mb-2 mt-2 d-flex input-container" onClick={() => handleSelect(index)}>
      {/* {isSelected && <span class="icon icon-pointer-right selected-pointer white-text">
        <CIcon icon={cilHandPointRight} size='lg' style={{ color: "#fff" }} />
      </span>} */}
      <div className={`d-flex icon-input-wrapper meeting__card px-3 ${isSelected && 'unselected-icon-input-wrapper'}`}>
        <span class="avatar-icon avatar-icon--has-img">
          <CIcon icon={formItem.ion} className={`${isSelected ? `non-selected-icon` : 'form-icon'}`} />
        </span>
        <span className="meeting__card__name">
          {(formItem.type === 'date' || formItem.type === 'time') ? 
          <Flatpickr options={options} onChange={(value)=>handleFlatPicker(value)} className={`custom_type_${formItem.type} ${isSelected&&"selected_flatpicky"}`}/>
          :<CFormInput className={`input-minimal ${isSelected ? `input-selected` : ''}`} value={inputValues[index]} onChange={(e) => handleInputChange(index, e)} type={formItem.type} />
          }</span>
      </div>
    </div>
  })
   
    
    //location state handling
      const handleSelectLocation = (index , location ) => {
        setLocation(location);
      }

      const [serviceDetails , setServiceDetails] = useState({})
      //handling the fetchBYLOCATION API BY location id;
      console.log(`service` , serviceDetails);
      
      const options = serviceDetails && serviceDetails.data && serviceDetails.data['servicesList'].map((service) => ({
        value: service.id,
        label: service.serviceName,
        ...service,
      })) || [ ];
      

      useEffect(() => {
        const fetchServiceData = async () => {
          const {id} = location;
          try {
            const response = await request(`/getLocationById/${id}`);
            if (response && response.data.status === "Success") {
              setSelectedOptionValue({label:'Select Service',value:'service'});
              setSelectedStaff({label:'Choose Staff', value:'staff'})
              const { data } = response;
              setServiceDetails(data);
            }
          } catch (error) {
            console.error(error);
          } 
        };
         if(location){
            fetchServiceData();
         }
      }, [location]);
       //SELECT DROPDOWN TAG STYLING 
        const customStyles = {
          control: (base , state) => ({
            ...base,
            width:"100%",
            height:"30px",
            minHeight:"30px",
            background:"hsla(0, 1%, 100%, .05)",
            borderColor:'none',
            border:'none',
            boxShadow:'none',
            color:'#fff',
          }),
          singleValue: (base) => ({
            ...base,
            color: "#fff", // Make selected text visible
          }),
          dropdownIndicator: (base) => ({
            ...base,
    
          }),
          menu: (base) => ({
            ...base,
            width:"110%",
            right:"0%"
          })
          }
          //  services handlers
          const handleChange = (selectedOption) => {
            // setSelectedService(selectedOption)
            const updatedOption = {label:selectedOption.label,value:selectedOption.value}
            setSelectedOptionValue(updatedOption);
            setStaffObject(selectedOption);
            // console.log("Selected:", selectedOption);
          };

          const handleMenuOpen = () => {
            setSelectedOptionValue(null); // Clear the value when the menu opens
          };

            //option value
      const [selectedOptionValue , setSelectedOptionValue] = useState({label:'Select Service',value:'service'});
         //stafflist option
      const [staffObject , setStaffObject] = useState({});
        //staffList array
        console.log('staff obj' , staffObject);
        
      const [selectedStaff,setSelectedStaff] = useState({label:'Choose Staff', value:'staff'})
      const staffList = staffObject && staffObject.staffList?.map((provider) =>({
              value:provider.id,
              label:provider.firstName,
              ...provider
      })) || [ ];
            // staff handlers;
          const handleSelectedStaff = ( option ) => {
            // console.log(`option`, option);
            const staffPerson = {label:`${option.firstName} ${option.lastName}`, value:`${option.firstName} ${option.lastName}`};
             setSelectedStaff(staffPerson);
          }
         

  return (
    <CForm className='form_size'>
      <CRow sm={8} className='crow_pad'>
        <CDropdown className='mb-2 custom_dropdown_locations'>
          <CDropdownToggle className="dropdown_card"> {location && `${location.branchName},${location.city}`|| `Locations`} </CDropdownToggle>
          <CDropdownMenu style={{ width: '100%' }} className="">
            {
              data?.map((location, index) => {
                return <CDropdownItem onClick={()=> handleSelectLocation(index , location)}>{`${location.branchName},${location.city}`}</CDropdownItem>
              })
            }
          </CDropdownMenu>
        </CDropdown>
        <CRow xs={12} className='custom_select_service my-2'>
          <CCol xs={1} className='py-1 icon_select_circle'> 
           <CIcon icon={cilCircle}/>
          </CCol>
          {/* {select component} */}
          <CCol xs={11}>
          <Select
           options={options}
           onMenuOpen={handleMenuOpen}
           placeholder={''}
           onChange={handleChange}
           isSearchable
           components={{
            // DropdownIndicator,
            IndicatorSeparator: () => null,
             Option: CustomOption
           }}
           value={selectedOptionValue}
           styles={customStyles}
          />
      </CCol>
        </CRow>
        {/* staff members dropdown */}
        <CRow xs={12} className='custom_select_service my-2'>
          <CCol xs={1} className='py-1 icon_select_circle'> 
           <CIcon icon={cilUser}/>
          </CCol>
          {/* {select component} */}
          <CCol xs={11}>
          <Select
           options={staffList}
           placeholder={''}
           onChange={handleSelectedStaff}
           isSearchable
           components={{
            // DropdownIndicator,
            IndicatorSeparator: () => null,
             Option: CustomStaff
           }}
           value={selectedStaff}
           styles={customStyles}
          />
      </CCol>
        </CRow>
        {formInputs}
       
      </CRow>
    </CForm>
  )
}


// Custom Option Component
const CustomOption = ({ data, innerRef, innerProps }) => {
   

 return (<div
    ref={innerRef}
    {...innerProps}
    >  
    <div className="custom-option" ref={innerRef} {...innerProps}>
        <CCol xs={12}>
          <CRow className='w-100'>
           <CCol xs={2} className='px-1'>
             <div className="custom-option__icon">
            <span className="avatar-icon__initial">En</span>
            </div>
            </CCol>
          <CCol xs={8} className='d-flex flex-column'>
             <strong>{data.serviceName}</strong>
              <span>{data.durationMins} mins</span>
          </CCol>
          <CCol xs={2} className='py-2'>
              <span>Rs.{data.price}</span>
          </CCol>
         </CRow>
        </CCol>
    </div>
  
  </div>)
}

const CustomStaff = ({ data, innerRef, innerProps }) => {
  return (<div
     ref={innerRef}
     {...innerProps}
     >  
     <div className="custom-option" ref={innerRef} {...innerProps}>
              <strong>{data.firstName}</strong>
               <span>{data.lastName}</span>   
     </div>
   </div>)
 }

// const DropdownIndicator = (props) => {

//   return props.options.length > 0 ? <components.DropdownIndicator {...props} /> : null
  
// }

export default CustomAppointmentForm