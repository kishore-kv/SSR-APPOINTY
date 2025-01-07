

import BookingDetails from '../components/app/BookingDetails';
import CustomAppointmentForm from '../components/app/CustomAppointmentForm';
import './innerapp.css';
import '../components/app/CustomBooking.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React from 'react';
import { Toaster} from 'react-hot-toast';
const InnerApp = () => {
  return (
    <div className='innerapp'>
      
      
      {/* <BookingDetails/> */} 
      <Switch>
          <Route exact path="/">
          <CustomAppointmentForm/>
           <Toaster/>
          </Route>
          <Route  path="/details" component={BookingDetails} />
          
        </Switch>
      
    </div>
  )
}

export default InnerApp
