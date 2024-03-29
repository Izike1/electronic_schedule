import $api from "./api";

export class GroupService {
    static async getSelfGroup() {
        return await $api.get('/group/getSelfGroups')
    }
    static async getGroupsByFactulty(id) {

        return await $api.get('/group/getGroupsByFaculty', {
            params: {
                id
            }
        })
    }
}