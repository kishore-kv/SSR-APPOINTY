import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import Dashboard from '../../src/views/dashboard/Dashboard'

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  component={route.component}
                />
              )
            )
          })}
          <Route path="/" component={Dashboard} />
        </Switch>

    </CContainer>
  )
}

export default React.memo(AppContent)
