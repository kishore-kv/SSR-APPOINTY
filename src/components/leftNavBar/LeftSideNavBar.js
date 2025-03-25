import React, { useState } from "react";
import { Box } from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import { useHistory, useLocation } from 'react-router-dom';
// import { handleDecode } from "../../utils/utility";
// import { getUserRole } from "../../lib/auth/index";
// import { role_Admin_Master } from "../../Constants/constants";

const LeftSideNavbar = ({ isExpanded, setIsExpanded }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const history = useHistory();
  const location = useLocation();

  const items = [
    { text: "Gestión de vehículos", icon: <DirectionsCarFilledOutlinedIcon className="custom_svg_icon" />, link: "/vehicle-summary" },
  ];

  // Conditionally add "Gestión de usuarios" based on user role
//   if (role_Admin_Master.includes(handleDecode(getUserRole()))) {
//     items.push({ text: "Gestión de usuarios", icon: <PersonOutlineIcon className="custom_svg_icon" />, link: "/users-summary" });
//   }

  const handleOnClick = () => {
    // setIsExpanded(!isExpanded);
  };

  const handleListItem = (index) => {
    // setSelectedItem(index);
    // history.push(items[index].link);
  };

  return (
    <Box className={`${isExpanded ? 'custom_left_side_bar' : 'custom_left_reduced'}`}>
      <Box>
        {items?.map((item, index) => {
          const selected = location.pathname === item.link; // Check if the current path matches the item's link
          return !isExpanded ? (
            <Box
              component="div"
              key={item.link}
              className={`custom_list_item ${selected && 'custom_list_border'} ${selected ? "custom_list_items_selected" : "custom_list_items"}`}
              onClick={() => handleListItem(index)}
            >
              <Box className="customListItmIconContainer">{item.icon}</Box>
            </Box>
          ) : (
            <Box
              component="div"
              key={item.link}
              className={`${selected ? "custom_list_items_selected" : "custom_list_items"}`}
              onClick={() => handleListItem(index)}
            >
              <Box className="customListItmIcon">{item.icon}</Box>
              <div className={`customListItemText ${selected && "text_font_selected"}`}>{item.text}</div>
            </Box>
          );
        })}
      </Box>
      <div className={isExpanded ? "custom_arrow_container_expanded" : "custom_arrow_container"} onClick={handleOnClick}>
        {isExpanded ? <ArrowBackIosIcon className="custom_arrowchevron" /> : <ArrowForwardIosIcon className="custom_arrowchevron" />}
      </div>
    </Box>
  );
};

export default LeftSideNavbar;
