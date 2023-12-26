import $api from "./api";

export class FacultyService {
    static async getFaculties() {
        return await $api.get('/faculty/getFaculty')
    }
    static async getGroupsByFactulty(id) {

        return await $api.get('/group/getGroupsByFaculty', {
            params: {
                id
            }
        })
    }
}