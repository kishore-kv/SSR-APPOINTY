import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import BookingDetails from '../components/app/BookingDetails';
import CustomAppointmentForm from '../components/app/CustomAppointmentForm';
import { Toaster } from 'react-hot-toast';
import './innerapp.css';
import { CHeader ,CRow} from '@coreui/react';

const InnerApp = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loader briefly on route change
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading time
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [location]);

  return (
    <div className="innerapp">
      <CHeader className='header_custom'> 
          <CRow className='justify-content-center'>
                <img src='../../assets/header_logo.png' alt='header_logo' className='header_img'/>
          </CRow>
        </CHeader>
      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <Switch>
        {/* <div>header image</div> */}
        <Route exact path="/">
          <CustomAppointmentForm />
          <Toaster />
        </Route>
        <Route path="/details" component={BookingDetails} />
      </Switch>
    </div>
  );
};

export default InnerApp;
