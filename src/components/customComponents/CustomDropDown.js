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

function CustomDropDown({ toggleIcon, items, toggleColor = 'primary' }) {
    const [isOpen , setIsOpen] = useState(false);

    const hanldeClick = (item) => {
      if(item && item.label === 'Appointment'){
           setIsOpen(!isOpen)
      }
    }

    const DropdownItems =  items.map((item, index) => (
      <CDropdownItem key={index}  onClick={() => hanldeClick(item)} className='primary'>
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
   
     {isOpen && <CustomAppointmentModal visible={isOpen} title={'Appointment'} options={[{ icon: cilTie, label: 'Staff', onClick: () => console.log('Staff clicked') },
    { icon: cilCalendar, label: 'Select Date', onClick: () => console.log('Date clicked') }]}
    />}
     </>
  );
}

export default CustomDropDown;
