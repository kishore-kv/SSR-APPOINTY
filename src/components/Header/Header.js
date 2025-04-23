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
      <div className="headerSection headerLeft">
        <img src="../../assets/header_logo.png" className="headerLogo" alt="headerLogo" />
      </div>
      <div className="headerSection headerCenter">
        <Typography variant="h1" className="header_Title">
          Administrar Citas
        </Typography>
      </div>
      {isAuthorized && isLogout && (
        <div className="headerSection headerRight logoutContainer" onClick={handleLogout}>
          <LogoutIcon style={{ marginRight: "6px" }} />
          <span>Cerrar sesión</span>
        </div>
      )}
    </div>
  );
}
