// Packages
import React, { useState } from 'react';
import { 
    useHistory ,
    withRouter 
} from 'react-router';
import { message } from 'antd';

// MUI
import { 
    Box, 
    Grid, 
    Paper, 
    Avatar, 
    Button 
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Services
import { authLogin } from '../lib/auth';

// Antd
import { Input } from 'antd';
import { 
    EyeInvisibleOutlined, 
    EyeTwoTone 
} from '@ant-design/icons';

// Styles
import styles from '../styles/login.module.css';

const Login = (props) => {
    const history = useHistory();
    const [UserName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState({})
    const [isValidate, setIsValidate] = useState(true)
    const errors = {}

    const handleInput = (e) => {
        const input = e.target.name
        if (input === 'UserName') {
            setUserName(e.target.value)
        } else if (input === "password") {
            setPassword(e.target.value)
        }
    }

    const runValidation = () => {
        // for UserName
        if (UserName.trim().length === 0) {
            errors.UserName = "Username cannot be empty";
            setIsValidate(false);
        }

        // for password
        if (password.trim().length === 0) {
            errors.password = "password cannot be empty";
            setIsValidate(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        message.loading({ content: 'Please wait Your are loggin...', key: 'updatable', duration: 4 });

        //for validation 
        runValidation()

        if (isValidate) {
            setFormError({})

            const formData = {
                userName: UserName,
                password: password
            }

            const result = await authLogin(formData)
            setPassword('');
            setUserName('');
            if (!result) {
                message.error({ content: 'Unable to login, please try again!', key: 'updatable', duration: 4 });
                errors.login = 'Oops, Unable to login, please try again!'
                setFormError(errors)
            } else {
                message.success({ content: 'successfully Logged in!', key: 'updatable', duration: 4 });
                props.triggerNavbarFromLogin();
                props.triggerLogin();
                history.push('/config/configMap');
            }
        } else {
            message.error({ content: 'Unable to login, please try again!', key: 'updatable', duration: 4 });
            errors.password = 'Oops, Unable to login, please try again!'
            setFormError(errors)
        }
    }

    return (
        <div className={styles.login_wrapper}>
            <Paper component={Box} mx="auto" p={4}>
                <Grid align='center'>
                    <Avatar className={styles.avatar}> 
                        <LockOutlinedIcon /> 
                    </Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        {formError.login && 
                            <span className={styles.validate}> {formError.login} </span>
                        }
                        <Grid item xs={12}>
                            <Input placeholder="Enter your UserName" label="UserName"
                                value={UserName} name="UserName" onChange={handleInput} autoFocus />
                            {formError.UserName && 
                                <span className={styles.validate}>{formError.UserName}</span>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Input.Password 
                                iconRender={visible => (
                                    visible 
                                    ? <EyeTwoTone /> 
                                    : <EyeInvisibleOutlined />
                                )} 
                                placeholder="Enter Password" 
                                label="Password"
                                value={password} 
                                name="password" 
                                onChange={handleInput} 
                            />
                            {formError.password && 
                                <span className={styles.validate}> {formError.password} </span>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary"> Sign in </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}

export default withRouter(Login)