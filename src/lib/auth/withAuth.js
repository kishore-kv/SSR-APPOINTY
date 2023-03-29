import React, { Component } from 'react';
import { verifyLogin, getUserRole } from '.';
import { Redirect } from 'react-router-dom'
import Page403 from '../../components/page403';

export default Page =>
    class AuthHOC extends Component {
        render() {
            const pathname = this.props.location && this.props.location.pathname
            const isAuthenticated = verifyLogin();
            let isAuthorized = true
            if (pathname && pathname.startsWith('/users') && getUserRole() !== 'admin') {
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