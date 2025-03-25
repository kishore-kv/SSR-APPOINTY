import axios from 'axios'

const getHeaders = () => {
    return {
        'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
    }
}

export const request = async (url, params = {}) => {
    try {
        const data = await axios.get(url, {
            params: params,
            headers: getHeaders()
        })
        if (!data) {
            throw Error('Empty data from get settings')
        }
        return data
    } catch (error) {
        return error
    }
}

export const requestPost = async (url, formData = {}, method = 'post') => {
    try {
        const data = await axios[method](url, formData, {
            headers: getHeaders(),
        })
        return data
    } catch (error) {
        throw error;
    }
}

export const loginRequest = async (data, header) => {
    try {
        return await axios.post(`/kv-citas-login`, data)
    } catch (error) {
        return error
    }
}

export const requestDelete = async (url, action, params = {}) => {
    try {
        const data = await axios[action](url, {
            data: params,
            headers: getHeaders(),
        })
        return data
    } catch (error) {
        return error
    }
}

export const createRequest = async (url, action, formData) => {
    try {
        const data = await axios[action](url, formData, {
            headers: getHeaders(),
        })
        return data
    } catch (error) {
        return error
    }
}
