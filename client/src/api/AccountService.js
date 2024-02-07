import $api from "./api"

export class AccountService {
    static async searchAccounts(search, pageNumber, chunkSize) {
        return await $api.get('/auth/getAuthByChunk', {
            params: {
                chunkSize, pageNumber, search
            }
        })
    }
    static async deleteAccount(id) {
        return await $api.delete('/auth/delete', {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: { id }

        })
    }
    static async registration(login, password, role, data) {
        return await $api.post('/auth/registration', {
            login, password, role, ...data
        })
    }
}