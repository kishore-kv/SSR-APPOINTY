import React, { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { routes } from '../customroutes';
import { Switch, Route, Redirect } from 'react-router-dom'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'


// Pages


const InnerApp = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
   }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return ( 
       <>
         {/* <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes> */}
        <Switch>
              {routes.map(({ component, exact, path, isProtected }, index) => {
                {console.log("===",path)}
                return <Route exact={exact}  path={path} key={index} component={component} />
                
              })}
            </Switch>
        </>
  )
}

export default InnerApp
