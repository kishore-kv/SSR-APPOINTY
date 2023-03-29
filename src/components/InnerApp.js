// packages
import { Switch, Route, Redirect } from 'react-router-dom'


// All Routes
import { routes } from "../routes";
import PublicRoute from '../routes/PublicRoute'
import PrivateRoute from '../routes/PrivateRoute'
import { message,Affix, Layout } from 'antd';
const { Header, Content } = Layout
import React, { useState } from 'react'
import NavBar from "../components/nav/NavBar";
import Footer from '../components/Footer/Footer';
import { request } from "../lib/request"
import { verifyLogin, store } from "../lib/auth";
import NotFound from '../components/Authorization/404';
// style
import styles from './style.module.css'
import 'antd/dist/antd.css'


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
        isAuthorized: false,
        config: '',
        selectedConfig: '',
        response: '',
        isLogout:true,
        isConfigClick:false
    }
}

setSelected = async (selected) => {
  debugger;
  if(this.state.config !== '' || !this.state.config?.body?.length){
      await this.callGlobalConfig();
  }
  const {config}  = this.state;
  if(!config || !config?.body?.length){
      return
  }
  const response = await request(`${selected}`);
  if (response.data) {
    debugger;
      this.setState({
          selected, 
          selectedConfig: config?.body?.find(i => i.urlPath === selected), 
          response: response.data 
      });
  }
  else {
      message.error({ content: `Oops, Unable to get global-config/config/${selected}, please try again!`, key: 'updatable', duration: 4 })
  }
  
}

async callGlobalConfig () {
  const isAuthorized = verifyLogin();
  let config;
  if (isAuthorized) {
       try
       {
        config = await request("/config-menu");
        if (config.data && config.data.body) {
          store('config', JSON.stringify(config.data.body));
          this.setState({ 
              isAuthorized, 
              config: config.data
          });
      }
      else {
          message.error({ content: 'Oops, Unable to get global-config, please try again!', key: 'updatable', duration: 4 })
      }
       } catch(Ex)
       {
        console.log("-====",Ex)
       }
      
  }
}

componentDidMount() {
  this.callGlobalConfig()
}

componentDidUpdate() {
  const isAuthorized = verifyLogin();
  if (this.state.isAuthorized !== isAuthorized) {
      this.setState({ isAuthorized });
  }
}


triggerNavbarFromLogin = () => {
  this.callGlobalConfig()
}

triggerLogin = () => {
  this.setState({ isLogout: true })
}

triggerLogout = () => {
  this.setState({ isLogout: false })
}
  render(){
  return (
    <div className={styles.app_wrapper}>
         <NavBar
                    setSelected={this.setSelected}
                    config={this.state.config}
                    isAuthorized={this.state.isAuthorized}
                    isLogout={this.state.isLogout}
                    triggerSideba={this.triggerSidebar}
                />
          <Content>
            <Switch>
              {routes.map(({ component, exact, path, isProtected, isRedirect, redirectUrl }, index) => {
                {console.log("===",path)}
                return isProtected && isRedirect == true ? (
                  <PrivateRoute exact={exact} selectedConfig={this.state.selectedConfig} selected = {this.state.selected} response={this.state.response}  config={this.state.config} triggerLogin ={this.triggerLogin} triggerNavbarFromLogin={this.triggerNavbarFromLogin} setSelected={this.setSelected} path={path} key={index} component={() => <Redirect to={redirectUrl} />} />
                ) : isProtected ? (
                  <PrivateRoute exact={exact} selected = {this.state.selected} selectedConfig={this.state.selectedConfig} response={this.state.response} config={this.state.config} triggerLogin ={this.triggerLogin} triggerNavbarFromLogin={this.triggerNavbarFromLogin}  setSelected={this.setSelected} path={path} key={index} component={component} />
                ) : (
                  <PublicRoute exact={exact} selected = {this.state.selected} selectedConfig={this.state.selectedConfig} response={this.state.response} config={this.state.config} triggerLogin ={this.triggerLogin} triggerNavbarFromLogin={this.triggerNavbarFromLogin} setSelected={this.setSelected} path={path} key={index} component={component} />
                )
              })}
              <Route path='*' component={NotFound} />
            </Switch>
          </Content>
          <Footer />
    </div>
  );
}
}
