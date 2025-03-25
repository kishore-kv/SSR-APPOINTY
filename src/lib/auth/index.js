import { loginRequest } from '../../lib/request'
import jwt_decode from "jwt-decode";
import { handleEncode } from '../../utils/utility';
const { setCookie } = require("../../utils/storage/index")

export async function authLogin({ username, password }) {
    const {data} = await loginRequest({ username, password });
    console.log(`respies`,resp);
    

    const token = data?.data?.token;
    if (token) {
        const decoded = jwt_decode(token)
        store('token', token)
        store("username", username)
        setCookie('token', token, 60);
        decoded.exp && store('exp', decoded.exp)
        decoded.iat && store('iat', decoded.iat)
        decoded.iss && store('iss', decoded.iss)
        decoded.sub && store('sub', handleEncode(decoded.sub))
        decoded.userName && store('username', handleEncode(decoded.username))
        decoded.role && store('roles', handleEncode(decoded.role))
        return true
    }
    return false
}

export function verifyLogin() {
    const currentTime = new Date().getTime()
    const exp = getItem('exp');
    if ((exp * 1000) > currentTime) {
        return true
    }
    return false
}

export function authClear() {
    sessionStorage.clear()
    return true
}

export function getUserRole() {
    return sessionStorage.getItem('roles')
}

export function store(key, value) {
    return sessionStorage.setItem(key, value)
}
// export function getDomainName() {
//     return window && window.sessionStorage && sessionStorage.getItem('domain')
// }

export function getItem(key) {
    return sessionStorage.getItem(key)
}

export function getDomainName() {
    return sessionStorage.getItem('domain')
}

export function getUserName() {
    return sessionStorage.getItem('username')
}