// Packages
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Antd
import { Layout, Menu } from 'antd';

// Assets
import logo from '../../assests/LIVERPOOL_logo.png';

// Services
import {
  getUserRole,
  getUserName
} from '../../lib/auth'

// View
// import LeftHandData from "../../module/config/DisplayName";
// import container from '../../Container';

// Style
import styles from '../../styles/navbar.module.css';

const { Header } = Layout;

export default function NavBar(props) {
  // const displayNavigation = () => {
  //   const { config, setSelected } = props
  //   return (config && config.body && config.body.map((item, key) => (
  //     <Menu.Item key={key}>
  //       <Link to={`/config/${item.urlPath}`} onClick={() => setSelected(item.urlPath)}>
  //         {item.displayName}
  //       </Link>
  //     </Menu.Item>
  //   )))
  // }

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logo_img} src={logo} alt="logo" />
      </div>
      {props.isLogout &&
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['configurations']} className={styles.menu}>
          {props.isAuthorized && (
            <>
              {getUserRole() === 'admin' && (
                <Menu.Item key="user"
                  className={styles.menu_item}
                >
                  <Link
                    to={`/users/create`}
                    className={styles.link}
                  >
                    Manage User
                  </Link>
                </Menu.Item>
              )}
              <Menu.Item key="configurations"
                className={styles.menu_item}
              >
                <Link
                  to={`/config/configMap`}
                  className={styles.link}
                >
                  Configurations
                </Link>
                
              </Menu.Item>
              <Menu.Item key="upload"
                className={styles.menu_item}
              >
                <Link
                  to={`/upload`}
                  className={styles.link}
                >
                  Searchanise
                </Link>
                
              </Menu.Item>
              <Menu.Item key="Newupload"
                className={styles.menu_item}
              >
                <Link
                  to={`/Newupload/uploadindex`}
                  className={styles.link}
                >
                  BYD
                </Link>
                
              </Menu.Item>
              <Fragment style={{ marginLeft: "auto" }}>
                <Menu.Item key="logout"
                  className={styles.menu_item}
                  style={{ marginLeft: "auto" }}
                >
                  <Link
                    to={`/logout`}
                    className={styles.link}
                  >
                    Logout
                  </Link>
                </Menu.Item>
                {getUserName() &&
                  <Menu.Item key="userName"
                    className={styles.menu_item}
                    style={{ fontSize: '16px', color: 'white' }}
                  >
                    Hi {" " + getUserName()}
                  </Menu.Item>
                }
              </Fragment>
            </>
          )}
        </Menu>
      }
    </Header>
  )
}
