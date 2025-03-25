// Login
import Page404 from "src/pages/page404";
import Login from "../pages/Login";
// import Logout from "../pages/Logout";
// import VehicleSummary from "../pages/VehicleSummary";
// import Users from "../pages/Users";
// import TechnicoPdi from "../pages/TechnicoPdi";

export const routes = [
  {
    path: ["/", "/login"],
    component: Login,
    exact: true,
    isProtected: false
  },
  {
    path: "/page404",
    component: Page404,
    exact: true,
    isProtected: false
  }  
]
