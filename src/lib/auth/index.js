import { loginRequest } from '../../lib/request'
import jwt_decode from "jwt-decode";
const {setCookie} = require("../../utils/storage/index")

export async function authLogin({ userName, password }) {
    const { data } = await loginRequest({ userName, password })
    if (data) {
        const decoded = jwt_decode(data)
        store('token', data)
        setCookie('token',data,20);
        decoded.exp && store('exp', decoded.exp)
        decoded.iat && store('iat', decoded.iat)
        decoded.iss && store('iss', decoded.iss)
        decoded.sub && store('sub', decoded.sub)
        decoded.userName && store('userName', decoded.userName)
        decoded.roles && store('roles', decoded.roles)
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

export function getItem(key) {
    return sessionStorage.getItem(key)
}

export function getUserName() {
    return sessionStorage.getItem('userName')
}