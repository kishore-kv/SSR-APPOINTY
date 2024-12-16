import { CCol, CDropdown, CRow,CDropdownItem,CDropdownMenu,CDropdownToggle,CContainer } from '@coreui/react'
import React from 'react'

function AppointmentDashboard() {
  return (
    <div>
    <CRow style={{border:"1px solid red"}} className='justify-content-between'>
      <CCol lg={6}>
         Dashboard
         
      </CCol>
      <CCol lg={6} className='d-flex justify-content-end'>
      <CDropdown>
      <CDropdownToggle>Today</CDropdownToggle>
      <CDropdownMenu>
         <CDropdownItem>Yesterday</CDropdownItem>
         <CDropdownItem >Last week</CDropdownItem>
        <CDropdownItem >Last day</CDropdownItem>
       </CDropdownMenu>
      </CDropdown>
      </CCol>
    </CRow>
    <CRow>
       <CRow>
          <h5>01 Dec - 07 Dec</h5>
       </CRow>
       <CRow>
       <CContainer>
      <CRow>
        <CCol xs={12} sm={6} md={3}>
          <div style={{ background: '#f8f9fa', padding: '20px', textAlign: 'center' }}>
            Column 1
          </div>
        </CCol>

        <CCol xs={12} sm={6} md={3}>
          <div style={{ background: '#e9ecef', padding: '20px', textAlign: 'center' }}>
            Column 2
          </div>
        </CCol>

        <CCol xs={12} sm={6} md={3}>
          <div style={{ background: '#dee2e6', padding: '20px', textAlign: 'center' }}>
            Column 3
          </div>
        </CCol>

        <CCol xs={12} sm={6} md={3}>
          <div style={{ background: '#ced4da', padding: '20px', textAlign: 'center' }}>
            Column 4
          </div>
        </CCol>
      </CRow>
    </CContainer>
       </CRow>
       <CRow>

       </CRow>

    </CRow>
    </div>
  ) 
}

export default AppointmentDashboard