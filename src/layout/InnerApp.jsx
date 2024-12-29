

import BookingDetails from '../components/app/BookingDetails';
import CustomAppointmentForm from '../components/app/CustomAppointmentForm';
import './innerapp.css';

import React from 'react';

const InnerApp = () => {
  return (
    <div className='innerapp'>
      <CustomAppointmentForm/>
      {/* <BookingDetails/> */} 
      
    </div>
  )
}

export default InnerApp
