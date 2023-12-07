import { API_URL } from "../api/api"
import $api from '../api/api'
class AuthService {
    static async login(login, password) {
        const response = await $api.post(API_URL + '/login', { login, password })
        return response
    }
    static async logout() {
        const response = await $api.post(API_URL + '/logout')
        return response
    }
}
export default AuthService