// Login
import Page404 from "src/pages/page404";
import Login from "../pages/Login";
import LocationsList from "../components/organisms/LocationsList";
import ServicesList from "../components/organisms/ServicesList";
import StaffList from "../components/organisms/StaffList";
import Logout from "../pages/Logout";
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
  },{
    path:"/locations",
    component:LocationsList,
    exact:true, 
    isProtected:false
  },
  {
    path:"/service",
    component:ServicesList,
    exact:true, 
    isProtected:false
  },
  {
    path:"/staff",
    component:StaffList,
    exact:true, 
    isProtected:false
  },
  {
    path: '/logout',
    component: Logout,
    exact: true,
    isProtected: false
  }
]
