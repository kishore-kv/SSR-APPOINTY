import React, { useState } from 'react'
import { cilCircle, cilHandPointRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CDropdown, CForm, CFormInput, CRow, CFormTextarea,CFormLabel, CFormFloating, CDropdownItem, CFormSelect, CCol } from '@coreui/react'
import './CustomServiceForm.css'
import Select from 'react-select';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import CustomTimePicker from 'src/views/portal/myspace/child'
function CustomServiceForm() {


  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };
  return (
    <CForm>
      <CRow className='service_crow'>

        <CRow>
          <div>
            <label htmlFor="category">Select Category</label>
            <Select
              id="category"
              name="category"
              options={options}
              value={selectedCategory}
              onChange={handleChange}
              isSearchable
              isClearable
              isMulti={false} // Set to true for multi-select
              closeMenuOnSelect={true}
              placeholder="Select a category"
            />
          </div>
        </CRow>
        <CRow>
        <CFormFloating>
          <CFormInput
            placeholder=""
            id="title"
            className='custom_input_title'
          />
          <CFormLabel htmlFor="title" className='custom_title'>Title</CFormLabel>
         </CFormFloating>
        </CRow>
        <CRow>
          <CFormFloating>
          <CFormInput
            placeholder=""
            id="duration"
            className='custom_input_duration'
          />
          <CFormLabel htmlFor="duration" className='custom_duration'>Duration</CFormLabel>
         </CFormFloating>
        </CRow>
        <CRow>
          <CCol>
            <label htmlFor="category">Price</label>
            <CFormInput type='text' />
          </CCol>
          <CCol>
            <label htmlFor="category">Capacity</label>
            <CFormInput type='text' />
          </CCol>
        </CRow>
        <CRow>
          
          <CFormFloating>
          <CFormTextarea
            placeholder="Leave a comment here"
            id="description"
            className='custom_txtarea'
          ></CFormTextarea>
          <CFormLabel htmlFor="description" className='custom_description'>Description</CFormLabel>
         </CFormFloating>
        </CRow>
      </CRow>
    </CForm>
  )
}


export default CustomServiceForm