import $api from "./api"

export class UserService {
    static async getStudentsInGroup(groupId) {
        return await $api.get('user/getUsersByGroupName', {
            params: {
                id: groupId
            }
        })
    }
    static async addStudentToGroup(groupId, firstName, lastName, middleName = null) {
        return await $api.post('user/createUser', {

            groupId,
            firstName,
            lastName,
            middleName

        })
    }
    static async changeStudent(id, firstName, lastName, middleName = null) {
        return await $api.post('user/changeUser', {

            id,
            newUserData: {
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName
            }


        })
    }
    static async deleteStudent(id) {
        return await $api.delete('user/removeUser', { data: { id } })
    }
}
