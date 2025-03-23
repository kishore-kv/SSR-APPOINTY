import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
 

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthorized: false,
      isLogout: false,
      loading: true,
      isExpanded: true,
    };
  }

//   componentDidMount() {
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       this.setState({
//         isAuthorized: true,
//         isLogout: true,
//       });
//     }

//     setTimeout(() => {
//       this.setState({ loading: false });
//     }, 1000);
//   }

//   componentDidUpdate() {
//     const isAuthorized = verifyLogin();
//     if (this.state.isAuthorized !== isAuthorized) {
//       this.setState({ isAuthorized });
//     }
//   }

//   triggerLogin = () => {
//     this.setState({ isLogout: true })
//   }

//   triggerLogout = () => {
//     this.setState({ isLogout: false })
//   }

//   setIsExpanded = (isExpanded) => {
//     this.setState({ isExpanded });
//   };

  render() {
    // const { loading, isAuthorized, isLogout, isExpanded } = this.state;
    // const { location } = this.props; // Access current route from props
    // const isFullWidthRoute = ['/', '/login', '/technico-pdi'].includes(location.pathname) || location.pathname.startsWith('/technico-pdi/'); // List routes where LeftNav shouldn't be shown

    return (
      <div className="app_wrapper">
       
                 <h1>innerapp</h1>
              </div>
             
        
    );
  }
}

export default App
