

import BookingDetails from '../components/app/BookingDetails';
import CustomAppointmentForm from '../components/app/CustomAppointmentForm';
import './innerapp.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import React from 'react';

const InnerApp = () => {
  return (
    <div className='innerapp'>
      
      
      {/* <BookingDetails/> */} 
      <Switch>
          <Route exact path="/" component={CustomAppointmentForm} />
          <Route  path="/details" component={BookingDetails} />
          
        </Switch>
      
    </div>
  )
}

export default InnerApp
