import $api from "./api";

export class GroupService {
    static async getSelfGroup() {
        return await $api.get('/group/getSelfGroups')
    }

    static async createGroup(facultyId, name) {
        return await $api.post('/group/createGroup', { groupName: name, facultyId })
    }
    static async deleteGroup(id) {
        return await $api.delete('/group/deleteGroup', { data: { id } })
    }
    static async getGroupsByFactulty(id) {

        return await $api.get('/group/getGroupsByFaculty', {
            params: {
                id
            }
        })
    }
}