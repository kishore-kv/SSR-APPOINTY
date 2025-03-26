 import React from 'react';
 import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme.js';
import { Skeleton } from '@mui/material';
import Header from './Header/Header';
import LeftSideNavbar from './leftNavBar/LeftSideNavBar';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { routes } from "../routes";
import PublicRoute from '../routes/PublicRoute';
import PrivateRoute from '../routes/PrivateRoute';
import Page404 from '../../src/pages/page404';

// Pages


class InnerApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthorized: false,
      isLogout: false,
      loading: true,
    };
  }

  componentDidMount() {
    // const token = sessionStorage.getItem('token');
    // if (token) {
    //   this.setState({
    //     isAuthorized: true,
    //     isLogout: true,
    //   });
    // }

    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  // componentDidUpdate() {
  //   const isAuthorized = verifyLogin();
  //   if (this.state.isAuthorized !== isAuthorized) {
  //     this.setState({ isAuthorized });
  //   }
  // }

  triggerLogin = () => {
    this.setState({ isLogout: true })
  }

  triggerLogout = () => {
    this.setState({ isLogout: false })
  }

  // setIsExpanded = (isExpanded) => {
  //   this.setState({ isExpanded });
  // };

  render() {
    const { loading, isAuthorized, isLogout } = this.state;
    const { location } = this.props; // Access current route from props
    const isFullWidthRoute = ['/', '/login'].includes(location.pathname); // List routes where LeftNav shouldn't be shown
      //  const isFullWidthRoute = false;
    return (
      <div className="app_wrapper">
        {
          loading ? (
            <Skeleton variant="rectangular" width="100vw" height="100vh" animation="wave" />
          ) : (
            <ThemeProvider theme={theme}>
              <Header
                isAuthorized={isAuthorized}
                isLogout={isLogout}
                triggerLogout={this.triggerLogout}
              />
              <div className="d-flex">
                {/* Conditionally render LeftSideNavbar */}
                {!isFullWidthRoute && (
                  <div className={`left-side-navbar-wrapper margin-top-header   left-side-navbar-expanded`}>
                    <LeftSideNavbar />
                  </div>
                )}
                <div
                  className={`margin-top-header  expanded-content ${isFullWidthRoute ? 'full-width-route' : "main-content" }`}
                >
                  <Switch>
                    {routes.map(
                      ({ component, exact, path, isProtected, isRedirect, redirectUrl }, index) => {
                        return isProtected && isRedirect === true ? (
                          <PrivateRoute
                            exact={exact}
                            path={path}
                            key={index}
                            component={() => <Redirect to={redirectUrl} />}
                            triggerLogout={this.triggerLogout}
                            triggerLogin={this.triggerLogin}
                            isAuthorized={isAuthorized}
                          />
                        ) : isProtected ? (
                          <PrivateRoute
                            exact={exact}
                            path={path}
                            key={index}
                            component={component}
                            triggerLogout={this.triggerLogout}
                            triggerLogin={this.triggerLogin}
                            isAuthorized={isAuthorized}
                          />
                        ) : (
                          <PublicRoute
                            exact={exact}
                            path={path}
                            key={index}
                            component={component}
                            triggerLogout={this.triggerLogout}
                            triggerLogin={this.triggerLogin}
                            isAuthorized={isAuthorized}
                          />
                        );
                      }
                    )}
                    <Route path="*" component={Page404} />
                  </Switch>
                </div>
              </div>
              {/* {!isAuthorized && <Footer />} */}
            </ThemeProvider>
          )}
      </div>
    );
  }
}

export default withRouter(InnerApp);
