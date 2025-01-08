import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import BookingDetails from '../components/app/BookingDetails';
import CustomAppointmentForm from '../components/app/CustomAppointmentForm';
import { Toaster } from 'react-hot-toast';
import './innerapp.css';

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
      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <Switch>
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
