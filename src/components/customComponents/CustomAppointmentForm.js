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
    return <div key={index} class="mb-2 mt-2 d-flex input-container" onClick={() => handleSelect(index)}>
              {isSelected && <span class="icon icon-pointer-right selected-pointer white-text">
            <CIcon icon={cilHandPointRight} size='lg' style={{color:"#fff"}}/>
             </span>}
              <div className={`d-flex icon-input-wrapper meeting__card px-3 ${isSelected && 'unselected-icon-input-wrapper'}`}>
                <span class="avatar-icon avatar-icon--has-img">
                    <CIcon icon={formItem.ion} className={`${isSelected ?`non-selected-icon`: 'form-icon'}`}/>
               </span>
               <span className="meeting__card__name a-overflow-visible">
                  <CFormInput  className={`input-minimal ${ isSelected ?`input-selected`: ''}`}  value={inputValues[index]} onChange={(e)=>handleInputChange(index , e)} type={formItem.type}/>
               </span>
            </div>
         </div>})
    
  return (
    <CForm className='form_size'>
      <CRow sm={8} className='crow_pad'>
      <CDropdown>
      <CDropdownToggle className="dropdown_card">Locations</CDropdownToggle>
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