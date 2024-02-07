import axios from "axios";
import { toast } from "react-toastify";

export const API_URL = `http://uspev.agpu.net/api`
export const WEB_URL = `http://uspev.agpu.net/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})
$api.interceptors.request.use((config) => {
    if (!config.headers) {
        config.headers = {}
    }
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    try {
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._isRetry && error.config) {
            originalRequest._isRetry = true

            const response = await axios.get(API_URL + '/auth/refresh', { crossDomain: true, withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            return $api(originalRequest)
        } else {
            toast.error(error.response.data.message)
            return Promise.reject(error.response.data.message)
        }

    } catch (e) {
        toast.error(error.response.data.message)
        console.error(error.response)
    }

})

export default $api