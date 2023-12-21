const { Groups, User } = require('../models/models')
const { writeToLogFile } = require('../logger/index')
const ApiError = require('../error/ApiError')

class GroupService {
    async createGroup(groupName, facultyId) {
        const group = await Groups.findOne({ where: { name: groupName } });
        if (group) {
            throw ApiError.badRequest('Группа существует')
        }
        return Groups.create({ name: groupName, FacultyId: facultyId })
    }

    async changeGroup(groupName, groupId, facultyId) {
        const group = await Groups.findOne({ where: { id: groupId } })
        if (!group) {
            throw ApiError.badRequest('Группа не существует')
        } else {
            group.name = groupName
            group.facyltyId = facultyId
            await group.save()
        }
        return group
    }

    async getGroups(id) {
        return await Groups.findOne({ where: { id: id } })
    }
    async getSelfGroup(id) {
        const user = await User.findOne({ where: { id: id } })
        if (!user) {
            console.log('Пользователь не найден')
            writeToLogFile(`Пользователь не найден ${user}`)
        }
        return await Groups.findOne({ where: { id: user.groupId } })
    }

    async getGroupsByFaculty(id) {
        return await Groups.findAll({ where: { facultyId: id } })
    }

    async removeGroup(groupId) {
        const group = await Groups.findOne({ where: { id: groupId } })
        if (!group) {
            throw ApiError.badRequest('Группа не существует')
        }
        return await Groups.destroy({ where: { id: groupId } })
    }
}

module.exports = new GroupService()