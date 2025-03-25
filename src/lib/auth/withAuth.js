import React, { Component } from 'react';
import { verifyLogin, getUserRole } from '.';
import { Redirect } from 'react-router-dom'
import Page403 from '../../pages/page403';
import { handleDecode } from '../../utils/utility';
import { role_Admin_Master } from '../../Constants/constants';

export default Page =>
    class AuthHOC extends Component {
        render() {
            const pathname = this.props.location && this.props.location.pathname
            const isAuthenticated = verifyLogin();
            let isAuthorized = true;
            if (pathname && pathname.startsWith('/users') && !role_Admin_Master.includes(handleDecode(getUserRole()))) {
                isAuthorized = false
            }
            return (
                <>
                    {!isAuthenticated ? (
                        <Redirect to="/login" />
                    ) : !isAuthorized ? (
                        <Page403 />
                    ) : (
                        <Page {...this.props} />
                    )}
                </>
            )
        }
    }