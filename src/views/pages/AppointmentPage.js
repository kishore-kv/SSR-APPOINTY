import React from "react";
import { CButton, CContainer, CRow, CCol } from "@coreui/react";
// import "./AppointmentPage.css"; // CSS for styling

const AppointmentPage = () => {
  return (
    <div className="appointment-page">
      <CContainer fluid className="overlay">
        <CRow className="justify-content-center align-items-center text-center">
          <CCol md={8}>
            <h1 className="overlay-title">Enjoy your day!</h1>
            <p className="overlay-description">
              You don't have any appointments today
            </p>
            <CButton color="light" className="appointment-btn">
              <span>+</span> Appointment
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default AppointmentPage;
