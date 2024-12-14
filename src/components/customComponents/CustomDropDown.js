import React, { useState } from 'react';
import './CustomDropDow.css';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {cilCalendar,cilTie,cilGift,cilTags,cilBan,cilUserFollow} from '@coreui/icons'
import '@coreui/coreui/dist/css/coreui.min.css';
import CustomAppointmentModal from './CustomAppointmentModal';
import CustomServiceModal from './CustomServiceModal';


function CustomDropDown({ toggleIcon, items, toggleColor = 'primary' }) {
    // const [isOpen , setIsOpen] = useState(false);

    const hanldeClick = (item,e) => {
       if(e.target.text === 'Appointment'){
        setVisible(true)
      }if(e.target.text === 'Service'){
        setVisibleTwo(true)
      }
    }
     
    /** Handle modal in parent component */
    const [visible, setVisible] = useState(false);
    const [visibleTwo, setVisibleTwo] = useState(false); // Modal visibility state

    // const handleShowModal = () => {
    //   setVisible(true); // Show the modal
    // };
  
    const handleCloseModal = () => {
      setVisible(false); // Hide the modal
      setVisibleTwo(false);
    };

    const DropdownItems =  items.map((item, index) => (
      <CDropdownItem key={index} style={{cursor:"pointer"}} onClick={(e) => hanldeClick(item ,e)} className='primary'>
        {item.icon && <CIcon icon={item.icon} className="me-2" />}
        {item.label}
      </CDropdownItem>
    ))

  return (
    <>
    <CDropdown >
      {/* Dropdown Toggle */}
      <CDropdownToggle color={toggleColor} className='custom-dropdown-toggle'>
        {toggleIcon && <CIcon icon={toggleIcon} className="me-2" />}
      </CDropdownToggle>

      {/* Dropdown Menu */}
      
      <CDropdownMenu className="list-color" style={{}}>
        {DropdownItems}
      </CDropdownMenu>
      
    </CDropdown>
    
     {<CustomAppointmentModal 
     onClose={handleCloseModal}
     visible={visible} 
     title={'Appointment'}   
    />}
    {<CustomServiceModal 
     onClose={handleCloseModal}
     visible={visibleTwo} 
     title={'New Service'}   
    />}
    
     </>
  );
}

export default CustomDropDown;
