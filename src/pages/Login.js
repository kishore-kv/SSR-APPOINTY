import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router';
import { authLogin } from '../lib/auth';
// import login_logo from '../assets/images/login_logo.svg';
import Button from '../components/atoms/button/Button.js';
import Input from '../components/atoms/input/Input';
import { IconButton, InputAdornment } from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { handleEncode, validateAlphanumeric, validateAlphanumericWithSpecialChars } from '../utils/utility';
import Loader from '../components/atoms/loader/Loader';

const Login = (props) => {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loader state
    const [isMounted, setIsMounted] = useState(true); // Track if component is mounted

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    // Function to check if the login button should be enabled or disabled
    const validateLogin = () => {
        if (userName?.length >= 3 && password?.length >= 8 && validateAlphanumeric(userName) && validateAlphanumericWithSpecialChars(password)) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    // useEffect to validate inputs whenever they change
    useEffect(() => {
        validateLogin();
    }, [userName, password]);

    const handleInput = (e) => {
        const input = e.target.name
        if (input === 'username') {
            if (validateAlphanumeric(e.target.value)) {
                setUserName(e.target.value);
            }
        } else if (input === "password") {
            if (validateAlphanumericWithSpecialChars(e.target.value)) {
                setPassword(e.target.value);
            }
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true); // Show loader when login process starts
        const formData = {
            username: userName,
            password: handleEncode(password)
        }
        console.log(`formData`,formData);
        
        try {
            const result = await authLogin(formData);
            setPassword('');
            setUserName('');
            if (!result) {
                if (isMounted) setIsLoginFailed(true); // Check if component is mounted before updating state
            } else {
                if (isMounted) setIsLoginFailed(false); // Check if component is mounted before updating state
                props.triggerLogin();
                history.push('/locations');
            }
        }
        catch (error) {
            if (isMounted) setIsLoginFailed(true); // Check if component is mounted before updating state
        }
        finally {
            if (isMounted) {
                setIsLoading(false); // Hide loader when login process ends
                setPassword('');
                setUserName('');
            }
        }
    }

    // useEffect(() => {
    //     props.isAuthorized && history.push('/locations');
    // }, [props.isAuthorized]);

    // // Cleanup function to set isMounted to false when the component is unmounted
    useEffect(() => {
        return () => {
            setIsMounted(false); // Mark as unmounted when the component is unmounted
        };
    }, []);

    return (
        <>
        {isLoading ? (
            <Loader /> // Show loader across the entire page
        ) : (
        <div className='login_container'>
            <div className='login_wrapper'>
                {/* <img src={login_logo} alt='login_logo' /> */}
                <div className='login_div'>
                    <div className='login_incia_sesion'>Inicio de sesión</div>
                    <div className='login_campos'><span className='error-text'>*</span> Campos obligatorios</div>
                </div>
                <div className='login_div_1'>
                    <div className='login_form'>
                        <Input
                            label="Usuario"
                            name="username"
                            value={userName}
                            onChange={handleInput}
                            required={true}
                            error={isLoginFailed}
                        />
                        <Input
                            label="Contraseña"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleInput}
                            required={true}
                            error={isLoginFailed}
                            helperText={isLoginFailed && 'Usuario y/o contraseña incorrectos. Para más información o aclaraciones, por favor contacta al administrador.'}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 12,
                                },
                                input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                },
                            }}
                        />
                    </div>
                    <div className='password-helptext'>¿Olvidaste tu contraseña? Solicita al administrador que la restablezca.</div>
                </div>
                <Button 
                className={isButtonDisabled ? 'a-btn a-btn-disabled' : 'a-btn a-btn-primary'} disabled={isButtonDisabled} onClick={handleSubmit}
                >Iniciar sesión</Button>
            </div>
        </div>
        )}
        </>
    );
};

export default withRouter(Login);
