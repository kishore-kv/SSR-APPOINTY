
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
import { cibLibreoffice, cilChatBubble, cilEnvelopeClosed, cilFax, cilHandPointRight, cilHouse, cilPlus, cilSend, cilUser } from '@coreui/icons';

function CustomCustomerModal(
  { visible,
    onClose,
    title,
    onAction,
    actionButtonText = 'Submit',
    searchPlaceholder = 'Search...',
    backgroundColor = '#FFF' }) {
  
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
    <CModal visible={visible} onClose={onClose} className='service'>
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
                <input type="text" id="name" placeholder="Name" className='w-100'/>
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
                <input type="text" id="email" placeholder="Email" className='w-100'/>
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
                <input type="text" id="mobile" placeholder="mobile" className='w-100'/>
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
          <CCol xs={12} className='d-flex'>
                <CCol  style={{background:'yellow'}} xs={11} className='custom_col_item'>
              <CIcon icon={cilHandPointRight} size='lg' style={{ color: "#fff" }} />
              <CIcon icon={cilUser}/>
              <CFormFloating>
              <CFormInput
            placeholder=""
            id="name"
            className='custom_input_name'
          />
          <CFormLabel htmlFor="name" className='custom_name'>Name</CFormLabel>
         </CFormFloating>
          
              </CCol>
              
              <CCol xs={1}>
                <CIcon icon={cilChatBubble}/>
              </CCol>
             {/* <span>{"Customer Name is required"}</span> */}
               </CCol>
          </CRow>
          <CRow style={{border:"1px solid pink"}}>
            <CCol xs={12} className='d-flex'>
              <CCol  xs={11} className='custom_col_item'>
                <CIcon icon={cilHandPointRight} size='lg' style={{ color: "#fff" }} />
                <CIcon icon={cilUser} />
                <div class="form-group">
           <input type="text" id="name" placeholder="Name"/>
          <label for="name">Name</label>
            </div>



              </CCol>

              <CCol xs={1}>
                <CIcon icon={cilChatBubble} />
              </CCol>
              {/* <span>{"Customer Name is required"}</span> */}
            </CCol>
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
    </CModal>
  );

}

export default CustomCustomerModal