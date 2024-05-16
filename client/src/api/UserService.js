import $api from "./api"

export class UserService {
    static async getStudentsInGroup(groupId) {
        return await $api.get('user/getUsersByGroupName', {
            params: {
                id: groupId
            }
        })
    }
}
