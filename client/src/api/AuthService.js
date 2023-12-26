import $api from "./api";
export class AuthService {
    static async login(login, password) {
        return await $api.post('/auth/login', {
            login, password
        })
    }
    static async logout() {
        return await $api.post('/auth/logout')
    }
}