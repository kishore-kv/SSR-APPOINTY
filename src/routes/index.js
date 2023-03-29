// Login
import Login from "../pages/Login";
// Interviewer
import Config from "../pages/config/index";
import Interviewer from "../pages/Interviewer";

export const routes = [
    {
        path:["/","/login"],
        component:Login,
        exact:true,
        isProtected:false
    },
    {
        path:'/config/configMap',
        component:Config,
        exact:true,
        isProtected:false
    },
    {
        path: '/config/staticKeys',
        component: Config,
        exact: true,
        isProtected: false
      },
      {
        path: '/config/supplierConfig',
        component: Config,
        exact: true,
        isProtected: false
      },
      {
        path: '/config/configList',
        component: Config,
        exact: true,
        isProtected: false
      },
]
