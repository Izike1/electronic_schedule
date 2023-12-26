import $api from "./api"

export class AccountService {
    static async searchAccounts(search, pageNumber, chunkSize) {
        return await $api.get('/auth/getAuthByChunk', {
            params: {
                chunkSize, pageNumber, search
            }
        })
    }
}