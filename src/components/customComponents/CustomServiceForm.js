import React, { useState } from 'react'
import { cilCircle, cilHandPointRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CDropdown, CForm, CFormInput, CRow , CDropdownToggle,CDropdownMenu,CDropdownItem, CFormSelect, CCol} from '@coreui/react'
import './CustomServiceForm.css'
function CustomServiceForm({serviceInputs}) {

      const [clicked , setClicked]= useState(0);

      const handleClicked = (cIndex) => {
        setClicked(cIndex)
      }

 
      /*
        {element:'inputEl', label:'Title', cls:'title_serviceIp'},
      {element:'inputEl', label:'Duration', ion:cilClock,cls:'duration_serviceIp'},
       {element:'inputEl',label:'Price', ion:cilDollar,cls:'price_serviceIp'}, //insted of icon RS image property
       {element:'inputEl',label:'Capacity',ion:cilPeople,cls:'capacity_serviceIp'},*/
    const serviceItems = serviceInputs.map((sItem, index) => {
         const isSelected = index === clicked
        return <div key={index} onClick={(e) => handleClicked(index , e)} className='red mx-5 my-1'>
                   {isSelected && <span className='service_hand_icon'><CIcon icon={cilHandPointRight}/></span>}
                    <div className= {`${sItem.ion && 'icon_based_wrapper'}`}>
                        {sItem.ion && <span> <CIcon icon={sItem.ion} /></span>}
                      <div className='input-group' style={{border:'1px solid red'}}> 
                    <CFormInput  value={''} className={'text-input'} floatingLabel={sItem.label} floatingClassName='mb-1'/> 
                    </div>
                </div>
        </div>
    })
    const options = [
        { label: "Choose a category", value: "", disabled: true },
        { label: "Category 1", value: "1" },
        { label: "Category 2", value: "2" },
        { label: "Category 3", value: "3" },
      ]

     const handleFormDropdownChange = ( e) => {
     console.log('hii');
     
      }

  return (
      <CForm>
          <CRow className='service_crow'>
          <CRow className="d-flex selected_input_El align-items-center">
  {/* Icons */}
  

  {/* Input and Select */}
  <CRow style={{ position: "relative", flex: "1" }}>
  <div style={{
        position: "relative",
        zIndex: "2",
      }} className='corrected_path'>
  <CIcon icon={cilHandPointRight} size="xl" className="me-2" />
  <CIcon icon={cilCircle} size="xl" className="me-2"  />
    {/* Input field */}
    <CFormInput
      
      placeholder="Enter text"
    />
    </div>
    {/* Select dropdown */}
    <CFormSelect
      style={{
        position: "absolute",
        zIndex: "1",
        top: "0",
        left: "0",
      }}
      onChange={handleFormDropdownChange}
      options={[
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
      ]}
    />
  </CRow>
         </CRow>

              {serviceItems}
          </CRow>
      </CForm>
  )
}

export default CustomServiceForm