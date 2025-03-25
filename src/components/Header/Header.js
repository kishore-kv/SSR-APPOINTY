import React from "react";
// import logo from "../../assets/images/header_logo.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from 'react-router';

export default function Header({ isAuthorized, isLogout, triggerLogout }) {
  const history = useHistory();

  const handleLogout = () => {
    history.push('/logout');
  }

  return (
    <div className="headerContainer">
      <div>
        {/* <img src={logo} className="headerLogo" alt="headerLogo" /> */}
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
