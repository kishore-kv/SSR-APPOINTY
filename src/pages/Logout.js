// Packages
import { useEffect } from "react";
import { 
    useHistory, 
    withRouter
} from "react-router-dom";
import { message } from 'antd';

// Services
import { authClear } from '../lib/auth';

const Logout = (props) => {
    const history = useHistory();
    message.loading({ content: 'Please wait Your are loggin out...', key: 'updatable', duration: 2 });
    useEffect(() => {
        props.triggerLogout();
    }, [])
    authClear();
    setTimeout(() => {
        message.success({ content: 'successfully Logged out!', key: 'updatable', duration: 4 });
        history.push('/login'); 
    },10);
    
    return null;

}

export default withRouter(Logout)