import React, { useState } from "react";
import { Box } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { useHistory, useLocation } from 'react-router-dom';
// import { handleDecode } from "../../utils/utility";
// import { getUserRole } from "../../lib/auth/index";
// import { role_Admin_Master } from "../../Constants/constants";

const LeftSideNavbar = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const history = useHistory();
  const location = useLocation();

  const items = [
    { text: "Locations", icon: <LocationOnOutlinedIcon className="custom_svg_icon" />, link: "/locations" },
    { text: "Staff", icon:<PermIdentityOutlinedIcon  className="custom_svg_icon" />, link:"/staff" },
    { text: "Service", icon: <CircleOutlinedIcon  className="custom_svg_icon" />, link: "/service" }
  ];

  // Conditionally add "Gestión de usuarios" based on user role
//   if (role_Admin_Master.includes(handleDecode(getUserRole()))) {
//     items.push({ text: "Gestión de usuarios", icon: <PersonOutlineIcon className="custom_svg_icon" />, link: "/users-summary" });
//   }

  const handleOnClick = () => {
    // setIsExpanded(!isExpanded);
  };

  const handleListItem = (index) => {
    setSelectedItem(index);
    history.push(items[index].link);
  };

  return (
    <Box className={`custom_left_side_bar`}>
      <Box>
        {items?.map((item, index) => {
          const selected = location.pathname === item.link; // Check if the current path matches the item's link
          return (<Box
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
      {/* <div className={isExpanded ? "custom_arrow_container_expanded" : "custom_arrow_container"} onClick={handleOnClick}>
        {isExpanded ? <ArrowBackIosIcon className="custom_arrowchevron" /> : <ArrowForwardIosIcon className="custom_arrowchevron" />}
      </div> */}
    </Box>
  );
};

export default LeftSideNavbar;
