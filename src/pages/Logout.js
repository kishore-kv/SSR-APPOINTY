import { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { authClear } from '../lib/auth';

const Logout = (props) => {
    const history = useHistory();

    useEffect(() => {
        const logoutAndRedirect = async () => {
            props.triggerLogout();
            authClear();
            history.push('/login');
        };

        logoutAndRedirect();
    }, []);

    return null;
}

export default withRouter(Logout);
