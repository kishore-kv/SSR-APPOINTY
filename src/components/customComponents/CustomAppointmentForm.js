import { cilHandPointRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CDropdown, CForm, CFormInput, CRow , CDropdownToggle,CDropdownMenu,CDropdownItem} from '@coreui/react'
import React, { useState } from 'react'
import './CustomDropDow.css'
 
/*  This component consists of two children 1.dropDown for location and 2.formInputs
 */

const CustomAppointmentForm = ({formItems}) => {
    const[selectedIndex, setSelectedIndex]=useState(0);
    const [inputValues, setInputValues] = useState([null,null,null,null]);

     const handleSelect =(activendex) =>{
       setSelectedIndex(activendex) 
     }

     //handlingINputs
     const handleInputChange = (index , e) =>{
      // setSelectedDate(e.target.value);
        const updatedValues = [...inputValues];
        updatedValues[index] = e.target.value;  
        setInputValues(updatedValues)
     }

    const formInputs = formItems.map((formItem,index) =>{ 
      const isSelected = selectedIndex === index; 
    return <div key={index} class="mb-3 mt-3 d-flex input-container" onClick={() => handleSelect(index)}>
              {isSelected && <span class="icon icon-pointer-right selected-pointer white-text">
            <CIcon icon={cilHandPointRight} />
             </span>}
              <div className="d-flex icon-input-wrapper meeting__card px-3">
                <span class="avatar-icon avatar-icon--has-img">
                    <CIcon icon={formItem.ion} />
               </span>
               <span className="meeting__card__name a-overflow-visible">
                  <CFormInput className={`input-minimal form-control-md`}  value={inputValues[index]} onChange={(e)=>handleInputChange(index , e)} type={formItem.type}/>
               </span>
            </div>
         </div>})
    
  return (
    <CForm className='form_size'>
      <CRow sm={8} className='crow_pad'>
      <CDropdown>
      <CDropdownToggle color="primary">Dropdown Button</CDropdownToggle>
      <CDropdownMenu>
         <CDropdownItem>Item 1</CDropdownItem>
         <CDropdownItem >Item 2</CDropdownItem>
        <CDropdownItem >Item 3</CDropdownItem>
       </CDropdownMenu>
      </CDropdown>
         {formInputs}
      </CRow>
    </CForm>
  )
}

export default CustomAppointmentForm