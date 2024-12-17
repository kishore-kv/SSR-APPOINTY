import { cilHandPointRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CDropdown, CForm, CFormInput, CRow, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import './CustomDropDow.css'
import { request } from '../../services/request'

import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";

/*  This component consists of two children 1.dropDown for location and 2.formInputs
 */

const CustomAppointmentForm = ({ formItems, locationsData }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [inputValues, setInputValues] = useState([null, null, null, null]);
  const [location ,setLocation] = useState('');


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
      {isSelected && <span class="icon icon-pointer-right selected-pointer white-text">
        <CIcon icon={cilHandPointRight} size='lg' style={{ color: "#fff" }} />
      </span>}
      <div className={`d-flex icon-input-wrapper meeting__card px-3 ${isSelected && 'unselected-icon-input-wrapper'}`}>
        <span class="avatar-icon avatar-icon--has-img">
          <CIcon icon={formItem.ion} className={`${isSelected ? `non-selected-icon` : 'form-icon'}`} />
        </span>
        <span className="meeting__card__name a-overflow-visible">
          {(formItem.type === 'date' || formItem.type === 'time') ? <Flatpickr options={options} onChange={(value)=>handleFlatPicker(value)}/>
          :<CFormInput className={`input-minimal ${isSelected ? `input-selected` : ''}`} value={inputValues[index]} onChange={(e) => handleInputChange(index, e)} type={formItem.type} />
          }</span>
      </div>
    </div>
  })

    //location state handling
      const handleSelectLocation = (index , location ) => {
        console.log('=========', `${location.branchName},${location.city}`);
        setLocation(location)
      }


      //handling the fetchBYLOCATION API BY location id;
      useEffect(() => {
        const fetchServiceData = async () => {
          const {id} = location;
          try {
            const response = await request(`/getLocationById/${id}`);
            if (response && response.data.status === "Success") {
              const { data } = response;
              setData(data);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        };
         if(location){
            fetchServiceData();
         }
      }, [location]);
      

  return (
    <CForm className='form_size'>
      <CRow sm={8} className='crow_pad'>
        <CDropdown>
          <CDropdownToggle className="dropdown_card"> {location && `${location.branchName},${location.city}`|| `Locations`} </CDropdownToggle>
          <CDropdownMenu style={{ width: '100%' }} className="">
            {
              data?.map((location, index) => {
                return <CDropdownItem onClick={()=> handleSelectLocation(index , location)}>{`${location.branchName},${location.city}`}</CDropdownItem>
              })
            }
          </CDropdownMenu>
        </CDropdown>
        {formInputs}
       
      </CRow>
    </CForm>
  )
}

export default CustomAppointmentForm