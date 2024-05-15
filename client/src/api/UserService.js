import $api from "./api"

class UserService {
    static async getStudentsInGroup(groupId) {
        return await $api.get('user/getUsersByGroupName', {
            params: {
                id: groupId
            }
        })
    }
}
export default UserService