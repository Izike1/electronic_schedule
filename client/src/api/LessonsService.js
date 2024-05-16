import $api from "./api"

export class LessonsService {
    static async searchLessons(search, pageNumber, chunkSize) {
        return await $api.get('/lessons/getLessons', {
            params: {
                chunkSize, pageNumber, search
            }
        })
    }
}