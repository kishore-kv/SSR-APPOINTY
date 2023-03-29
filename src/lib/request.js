import axios from 'axios'

const getHeaders = () => {
    return {
        'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
    }
}
export const request = async (url) => {
    try {
        const data = await axios.get(`${url}`, {
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
export const requestFeedMastePost = async (url, formData = {}, method = 'post') => {
    try {
        const data = await axios[method](`${process.env.REACT_APP_FEED_MASTER_URL}/${url}`, formData, {
            headers: getHeaders(),
        })
        return data
    } catch (error) {
        return error
    }
}
export const requestbydservicesPost = async (url, formData = {}, method = 'post') => {
    try {
        const data = await axios.post(`${process.env.REACT_APP_BYD_URL}/${url}`)
        return data
    } catch (error) {
        return error
    }
}
export const requestbydservices = async (url, formData = {}, method = 'POST') => {
    try {
        const data = await axios[method](`${process.env.REACT_APP_BYD_URL}/${url}`, formData, {
            headers: getHeaders(),
        })
        return data
    } catch (error) {
        return error
    }
}

export const requestPost = async (url, formData = {}, method = 'post') => {
    try {
        const data = await axios[method](`${process.env.REACT_APP_BASE_URL}/${url}`, formData, {
            headers: getHeaders(),
        })
        return data
    } catch (error) {
        return error
    }
}

export const loginRequest = async (data, header) => {
    try {
        return await axios.post(`/config-ui-login`, data)
    } catch (error) {
        return error
    }
}

export const configRequest = async (url, action, formData) => {
    try {
        const data = await axios[action](`${process.env.REACT_APP_BASE_URL}/${url} `, formData, {
            headers: getHeaders(),

        })
        return data
    } catch (error) {
        return error
    }
}

export const requestDelete = async (url, action) => {
    try {
        const data = await axios[action](`${process.env.REACT_APP_BASE_URL}/${url} `, {
            headers: getHeaders(),

        })
        return data
    } catch (error) {
        return error
    }
}

export const createRequest = async (url, action, formData) => {
    try {
        const data = await axios[action](`${process.env.REACT_APP_BASE_URL}/${url} `, formData, {
            headers: getHeaders(),

        })
        return data
    } catch (error) {
        return error
    }
}