// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// View
// import Page403 from '../pages/page403'

//Utils
import { getFromLocal } from '../../src/utils/storage/index'

function PrivateRoute({ component: Component, exact, ...rest }) {
  return (
    <Route
      exact={exact}
      {...rest}
      render={(props) =>
        (getFromLocal('user_loged_in') === 'admin' && window.location.href.includes('admin')) ||
        window.location.href.includes('viewcandidate') ||
        (getFromLocal('user_loged_in') === 'interviewer' &&
          (window.location.href.includes('interviewerClient') ||
            window.location.href.includes('interviewer') ||
            window.location.href.includes('viewcandidate'))) ? (
          <Component {...props} />
        ) : (
          <Page403 />
        )
      }
    />
  )
}
export default PrivateRoute
