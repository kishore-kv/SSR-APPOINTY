import React from 'react';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import '@coreui/coreui/dist/css/coreui.min.css';

function CustomDropDown({ toggleIcon, items, toggleColor = 'primary' }) {
  return (
    <CDropdown>
      {/* Dropdown Toggle */}
      <CDropdownToggle color={toggleColor} caret>
        {toggleIcon && <CIcon icon={toggleIcon} className="me-2" />}
      </CDropdownToggle>

      {/* Dropdown Menu */}
      <CDropdownMenu>
        {items.map((item, index) => (
          <CDropdownItem key={index} href={item.href || '#'}>
            {item.icon && <CIcon icon={item.icon} className="me-2" />}
            {item.label}
          </CDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  );
}

export default CustomDropDown;
