import { cilHandPointRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CForm, CFormInput, CRow } from '@coreui/react'
import React, { useState } from 'react'
import './CustomDropDow.css'


const CustomAppointmentForm = ({formItems}) => {
    const[selectedIndex, setSelectedIndex]=useState(0);
      

     const handleSelect =(ion) =>{
     
       setSelectedIndex(ion) 
       
     }
    const formInputs = formItems.map((formItem,index) =>{ 
      const isSelected = selectedIndex === index; 
    return <div key={index} class="mb-3 mt-3 d-flex grey-text  active selected" onClick={() => handleSelect(index)}>
              {isSelected && <span class="icon icon-pointer-right selected-pointer white-text" onClick={() =>setShow(true)}>
            <CIcon icon={cilHandPointRight} />
             </span>}
              <div className="d-flex meeting__card">
                <span class="avatar-icon avatar-icon--has-img">
            <CIcon icon={formItem.ion} />
            </span>
           <span class="meeting__card__name a-overflow-visible">
            <CFormInput class="input-minimal form-control-md" readonly="" type={formItem.type} style={{border:'none'}}/>
           </span>
          </div>
         </div>})


  return (
    <CForm className='form_size'>
      <CRow sm={8} className='crow_pad'>
      {formInputs}
      </CRow>
    </CForm>
  )
}

export default CustomAppointmentForm