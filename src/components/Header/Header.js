import React from "react";
import logo from "../../assets/header_logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from 'react-router';
import { Typography } from "@mui/material";

export default function Header({ isAuthorized, isLogout, triggerLogout }) {
  const history = useHistory();

  const handleLogout = () => {
    history.push('/logout');
  }

  return (
    <div className="headerContainer">
      <div className="header_title_container">
        <img src={logo} className="headerLogo" alt="headerLogo" />
        <Typography variant="h6" className="header_Title">
          Administrar Citas
        </Typography>
      </div>
      {isAuthorized && isLogout && (
        <div className="logoutContainer" onClick={handleLogout}>
          <LogoutIcon />&nbsp;
          <span>Cerrar sesión</span>
        </div>
      )}
    </div>
  );
}
