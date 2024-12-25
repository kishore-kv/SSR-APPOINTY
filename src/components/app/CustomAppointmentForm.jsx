
import {  cilCircle, cilHandPointRight, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CDropdown, CForm, CFormInput,CDropdownDivider, CRow, CDropdownToggle, CDropdownMenu, CDropdownItem, CCol, CSpinner, CContainer } from '@coreui/react'
import React, { useEffect, useState } from 'react'
 import { MapPin } from "@phosphor-icons/react";

 import './CustomForm.css'
import { request , requestPost} from '../../services/request';
 
 

 

/*  This component consists of two children 1.dropDown for location and 2.formInputs
 */

const CustomAppointmentForm = () => {
 
    const [locations , setLocations] = useState([
      {
        "id": 1,
        "branchName": "branch1",
        "address1": "marathahalli",
        "address2": "multiplex",
        "city": "banglore",
        "state": "karnataka",
        "postalCode": "560037",
        "phoneNumber": "9087654321"
      },
      {
        "id": 2,
        "branchName": "branch2",
        "address1": "whitefield",
        "address2": "kadugodi",
        "city": "banglore",
        "state": "karnataka",
        "postalCode": "560045",
        "phoneNumber": "9087654321"
      },
      {
        "id": 3,
        "branchName": "branch2",
        "address1": "hebbal",
        "address2": "nagavara",
        "city": "banglore",
        "state": "karnataka",
        "postalCode": "560103",
        "phoneNumber": "9087654321"
      }
    ]);
   
     



    const fetchLocations = async () => {
      const payload = { limit: 10, page: 0 };
      try {
        const response = await requestPost('/getAllLocations', payload);
        if (response && response.data.status === "Success") {
          const { data } = response;
          console.log(`data`,data);
          
          setLocations(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        // setIsLoading(false);
      }
    };


    useEffect(() => {
      
    
      // fetchLocations();
    }, []);
       
      
      
     

  return ( <div className='d-flex justify-content-center align-items-center h-100'>
    <CContainer className='custom_container m-0 d-flex justify-content-center align-items-center' style={{height:'80%',
      border:'1px solid red'
    }}>
        <CContainer className='w-50 h-auto d-flex justify-content-center align-items-center flex-column'style={{border:"2px solid yellow"}}>
            <CCol className="p-1" xs={12} style={{border:"2px solid green", width:"80%"}}>
              <CDropdown className='mb-2 custom_dropdown_locations'>
              <CDropdownToggle className="dropdown_card"> <span><MapPin className='responsive-icon' /> {`Posiciones`}</span> <span className="ms-2"></span></CDropdownToggle>
               <CDropdownMenu style={{ width: '100%' }} className="">
              {
                locations?.map((location, index) => {
                return <CDropdownItem onClick={()=> handleSelectLocation(index , location)}>{`${location.branchName},${location.city}`}</CDropdownItem>
               })
            }
          </CDropdownMenu>
        </CDropdown>
            
        </CCol>
         
            
              <CCol style={{border:"2px solid green"}}>hello</CCol>
              <CCol style={{border:"2px solid green"}}>hello</CCol>
              <CCol style={{border:"2px solid green"}}>hello</CCol>
              <CCol style={{border:"2px solid green"}}>hello</CCol>

        </CContainer>
      </CContainer>
      </div>
        

  )

}

 

export default CustomAppointmentForm