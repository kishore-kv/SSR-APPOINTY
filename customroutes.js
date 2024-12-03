
 import  DefaultLayout from "./src/layout/DefaultLayout"
 import Login  from "./src/views/pages/login/Login"
 import Register  from "./src/views/pages/register/Register"
 import Page404 from "./src/views/pages/page404/Page404"
 import Page500 from "./src/views/pages/page500/Page500"
  


export const routes = [
    {
        path:"/login",
        component:Login,
        exact:true,
        isProtected:false
    }, {
        path:"/register",
        component:Register,
        exact:true,
        isProtected:false
    }, {
        path:"/404",
        component:Page404,
        exact:true,
        isProtected:false
    }, {
        path:"/500",
        component:Page500,
        exact:true,
        isProtected:false
    },{
        path:"*",
        component:DefaultLayout,
        exact:true,
        isProtected:false
    },
     
]
