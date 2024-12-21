
import React, { useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CListGroup,
  CFormLabel,
  CForm,
  CRow,
  CFormFloating,
  CCol,
  CContainer,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Select from 'react-select';
import './CustomCustomerModal.css';
import { cibLibreoffice, cilChatBubble, cilEnvelopeClosed, cilFax, cilGlobeAlt, cilHandPointRight, cilHouse, cilPlus, cilSend, cilUser } from '@coreui/icons';
import { useFormik } from 'formik';
import { name } from 'file-loader';

function CustomCustomerModal(
  { visible,
    onClose,
    title,
    onAction,
    actionButtonText = 'Submit',
    searchPlaceholder = 'Search...',
    backgroundColor = '#FFF' }) {
  
       const formik   =useFormik({
        initialValues:{
           name:'',
           email:'',
           mobile:''
        }
       })
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
      const [selectedCategory, setSelectedCategory] = useState(null);
    
      const handleChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
      };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const customStyle = {
    control: (provided) => ({
      ...provided,
      border: 'none', // Remove border
      boxShadow: 'none', // Remove outline
      // padding: '4px', // Optional: Add padding for better appearance
    })
  }
  

  return (
    <CModal visible={visible} onClose={onClose} className='service'>
       <CForm>
      {/* Modal Header */}
      <CModalHeader style={{ backgroundColor }}>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>

      {/* Modal Body */}
      <CModalBody className="p-4 d-flex justify-content-center service-modal-body" style={{ backgroundColor }}>
       
        <CContainer className='custom_container'>
         <CRow>
          <CRow className='row_name_custom'>
            <CCol xs={12} className='d-flex align-items-center p-1'>
              <CCol xs={11} className='custom_col_item'>
                <CIcon icon={cilHandPointRight} size='lg' />
                <div className="custom_icon_input d-flex align-items-center">
                <CIcon icon={cilUser} />
                <div class="form-group w-100">
                <input type="text" id="name" placeholder="Name" className='w-100' name='name' onChange={formik.handleChange} value={formik.values.name}/>
                 <label for="name">Name</label>
                </div>
                </div>
              </CCol>
     
              <CCol xs={1}>
                <CIcon icon={cilChatBubble} />
              </CCol>
            </CCol>
          </CRow>
          <span>{"Customer Name is required"}</span>
          </CRow>
            {/* Email */}
          <CRow>
          <CRow className='row_name_custom'>
            <CCol xs={12} className='d-flex align-items-center p-1'>
              <CCol xs={11} className='custom_col_item'>
                <CIcon icon={cilHandPointRight} size='lg' />
                <div className="custom_icon_input d-flex align-items-center">
                <CIcon icon={cilEnvelopeClosed} />
                <div class="form-group w-100">
                <input type="text" id="email" placeholder="Email" className='w-100'name='email' onChange={formik.handleChange}value={formik.values.email}/>
                 <label for="email">Email</label>
                </div>
                </div>
              </CCol>
              <CCol xs={1}>
                <CIcon icon={cilChatBubble} />
              </CCol>
            </CCol>
          </CRow>
          <span></span>
          </CRow>
            {/* Mobile */}
          <CRow>
          <CRow className='row_name_custom'>
            <CCol xs={12} className='d-flex align-items-center p-1'>
              <CCol xs={11} className='custom_col_item'>
                <CIcon icon={cilHandPointRight} size='lg' />
                <div className="custom_icon_input d-flex align-items-center">
                <span>{"+91"}</span>
                <div class="form-group w-100">
                <input type="text" id="mobile" placeholder="mobile" className='w-100' name='mobile' onChange={formik.handleChange}value={formik.values.mobile}/>
                 <label for="mobile">Mobile</label>
                </div>
                </div>
              </CCol>
              <CCol xs={1}>
                <CIcon icon={cilPlus} />
              </CCol>
            </CCol>
          </CRow>
          <span></span>
          </CRow>
            {/* work phone */}
         <CRow>
          <CRow className='row_name_custom'>
            <CCol xs={12} className='d-flex align-items-center p-1'>
              <CCol xs={11} className='custom_col_item'>
                <CIcon icon={cilHandPointRight} size='lg' />
                <div className="custom_icon_input d-flex align-items-center">
                <CIcon icon={cilFax} />
                <div class="form-group w-100">
                <input type="text" id="workphone" placeholder="workphone" className='w-100'/>
                 <label for="workphone">Work Phone</label>
                </div>
                </div>
              </CCol>
     
              <CCol xs={1}>
                <CIcon icon={cilChatBubble} />
              </CCol>
            </CCol>
          </CRow>
          <span></span>
          </CRow>
        
            {/* Home phone */}
            <CRow>
          <CRow className='row_name_custom'>
            <CCol xs={12} className='d-flex align-items-center p-1'>
              <CCol xs={11} className='custom_col_item'>
                <CIcon icon={cilHandPointRight} size='lg' />
                <div className="custom_icon_input d-flex align-items-center">
                <CIcon icon={cilHouse} />
                <div class="form-group w-100">
                <input type="text" id="homephone" placeholder="homephone" className='w-100'/>
                 <label for="homephone">Home Phone</label>
                </div>
                </div>
              </CCol>
     
              <CCol xs={1}>
                <CIcon icon={cilChatBubble} />
              </CCol>
            </CCol>
          </CRow>
          <span></span>
          </CRow>

             {/* Address */}
           
          <CRow>
          <CRow className='row_name_custom'>
            <CCol xs={12} className='d-flex align-items-center p-1'>
              <CCol xs={11} className='custom_col_item'>
                <CIcon icon={cilHandPointRight} size='lg' />
                <div className="custom_icon_input d-flex align-items-center">
                <CIcon icon={cilSend} />
                <div class="form-group w-100">
                <input type="text" id="address" placeholder="address" className='w-100'/>
                 <label for="address">Address</label>
                </div>
                </div>
              </CCol>
              <CCol xs={1}>
                <CIcon icon={cilChatBubble} />
              </CCol>
            </CCol>
          </CRow>
          <span></span>
          </CRow>
          {/* COUNTYR && STATE */}
          <CRow>
          <CRow className='row_name_custom'>
            <CCol xs={12} className='d-flex align-items-center p-1'>
              <div className='custom_two_select_col'>
              <CCol xs={5} className='custom_col_item'>
                <CIcon icon={cilHandPointRight} size='lg' />
                <div className="custom_icon_input d-flex align-items-center">
                <CIcon icon={cilGlobeAlt} />
                <div class="form-group w-100">
                <Select
              id="timezone"
              name="timezone"
              options={options}
              value={selectedCategory}
              onChange={handleChange}
              onMenuOpen={() => setIsDropdownOpen(true)}
              onMenuClose={() => setIsDropdownOpen(false)}
              isSearchable
              isClearable
              isMulti={false} // Set to true for multi-select
              closeMenuOnSelect={true}
              placeholder=""
              styles={customStyle}
            />
                 <label for="timezone" className={`${(isDropdownOpen || (!isDropdownOpen && selectedCategory))? "timezone_labl":''}`}>Time Zone</label>
                </div>
                </div>
              </CCol>
              <CCol xs={5} className='custom_col_item'>
                <CIcon icon={cilHandPointRight} size='lg' />
                <div className="custom_icon_input d-flex align-items-center">
                <CIcon icon={cilGlobeAlt} />
                <div class="form-group w-100">
                <Select
              id="timezone"
              name="timezone"
              options={options}
              value={selectedCategory}
              onChange={handleChange}
              onMenuOpen={() => setIsDropdownOpen(true)}
              onMenuClose={() => setIsDropdownOpen(false)}
              isSearchable
              isClearable
              isMulti={false} // Set to true for multi-select
              closeMenuOnSelect={true}
              placeholder=""
              styles={customStyle}
            />
                 <label for="timezone" className={`${(isDropdownOpen || (!isDropdownOpen && selectedCategory))? "timezone_labl":''}`}>Time Zone</label>
                </div>
                </div>
                
              </CCol>
              </div>
              <CCol xs={1}>
                <CIcon icon={cilChatBubble} />
              </CCol>
            </CCol>
          </CRow>
          <span></span>
          </CRow>
          {/* CITY && ZIP */}
          <CRow>
          <CRow className='row_name_custom'>
            <CCol xs={12} className='d-flex align-items-center p-1'>
              <div className='custom_two_select_col'>
              <CCol xs={5} className='custom_col_item'>
                <CIcon icon={cilHandPointRight} size='lg' />
                <div className="custom_icon_input d-flex align-items-center">
                <CIcon icon={cilGlobeAlt} />
                <div class="form-group w-100">
                <Select
              id="timezone"
              name="timezone"
              options={options}
              value={selectedCategory}
              onChange={handleChange}
              onMenuOpen={() => setIsDropdownOpen(true)}
              onMenuClose={() => setIsDropdownOpen(false)}
              isSearchable
              isClearable
              isMulti={false} // Set to true for multi-select
              closeMenuOnSelect={true}
              placeholder=""
              styles={customStyle}
            />
                 <label for="timezone" className={`${(isDropdownOpen || (!isDropdownOpen && selectedCategory))? "timezone_labl":''}`}>Time Zone</label>
                </div>
                </div>
              </CCol>
              <CCol xs={5} className='custom_col_item'>
                <CIcon icon={cilHandPointRight} size='lg' />
                <div className="custom_icon_input d-flex align-items-center">
                <CIcon icon={cilGlobeAlt} />
                <div class="form-group w-100">
                <Select
              id="timezone"
              name="timezone"
              options={options}
              value={selectedCategory}
              onChange={handleChange}
              onMenuOpen={() => setIsDropdownOpen(true)}
              onMenuClose={() => setIsDropdownOpen(false)}
              isSearchable
              isClearable
              isMulti={false} // Set to true for multi-select
              closeMenuOnSelect={true}
              placeholder=""
              styles={customStyle}
            />
                 <label for="timezone" className={`${(isDropdownOpen || (!isDropdownOpen && selectedCategory))? "timezone_labl":''}`}>Time Zone</label>
                </div>
                </div>
                
              </CCol>
              </div>
              <CCol xs={1}>
                <CIcon icon={cilChatBubble} />
              </CCol>
            </CCol>
          </CRow>
          <span></span>
          </CRow>
            
            {/* TimeZone */}
          <CRow>
          <CRow className='row_name_custom'>
            <CCol xs={12} className='d-flex align-items-center p-1'>
              <CCol xs={11} className='custom_col_item'>
                <CIcon icon={cilHandPointRight} size='lg' />
                <div className="custom_icon_input d-flex align-items-center">
                <CIcon icon={cilGlobeAlt} />
                <div class="form-group w-100">
                <Select
              id="timezone"
              name="timezone"
              options={options}
              value={selectedCategory}
              onChange={handleChange}
              onMenuOpen={() => setIsDropdownOpen(true)}
              onMenuClose={() => setIsDropdownOpen(false)}
              isSearchable
              isClearable
              isMulti={false} // Set to true for multi-select
              closeMenuOnSelect={true}
              placeholder=""
              styles={customStyle}
            />
                 <label for="timezone" className={`${(isDropdownOpen || (!isDropdownOpen && selectedCategory))? "timezone_labl":''}`}>Time Zone</label>
                </div>
                </div>
              </CCol>
              <CCol xs={1}>
                <CIcon icon={cilChatBubble} />
              </CCol>
            </CCol>
          </CRow>
          <span></span>
          </CRow>


          <CRow>
          <div>
            <label htmlFor="category" className='custom_select_country'>Country</label>
            
          </div>
          </CRow>
         
       
        </CContainer>
      </CModalBody>

      <CModalFooter style={{ backgroundColor }}>
        <CButton
          color="warning"
          style={{ color: 'white', fontWeight: 'bold' }}
          onClick={onAction}
        >
          Add
        </CButton>
      </CModalFooter>
      </CForm>
    </CModal>
  );

}

export default CustomCustomerModal