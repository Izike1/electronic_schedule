import $api from "./api";

export class FacultyService {
    static async getFaculties() {
        return await $api.get('/faculty/getFaculty')
    }
    static async renameFaculty(id, name) {
        return await $api.post('/faculty/changeFaculty', { id, facultyName: name })
    }
    static async deleteFaculty(id) {

        return await $api.delete('/faculty/deleteFaculty', { data: { id } })
    }
    static async createFaculty(name) {
        return await $api.post('/faculty/createFaculty', { facultyName: name })
    }
    static async getGroupsByFactulty(id) {

        return await $api.get('/group/getGroupsByFaculty', {
            params: {
                id
            }
        })
    }
}