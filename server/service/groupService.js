const {Groups} = require('../models/models')
const ApiError = require('../error/ApiError')

class GroupService {
    async createGroup(groupName, facultyId) {
        const group = await Groups.findOne({where: {name: groupName}});
        if (group) {
            throw ApiError.badRequest('Группа существует')
        }
        return Groups.create({name:groupName, FacultyId:facultyId})
    }

    async changeGroup(groupName, groupId, facultyId) {
        const group = await Groups.findOne({where: {id: groupId}})
        if (!group) {
            throw ApiError.badRequest('Группа не существует')
        } else {
            group.name = groupName
            group.facyltyId = facultyId
            await group.save()
        }
        return group
    }

    async getGroups() {
        return await Groups.findAll()
    }

    async removeGroup(groupId) {
        const group = await Groups.findOne({where: {id: groupId}})
        if (!group) {
            throw ApiError.badRequest('Группа не существует')
        }
        return await Groups.destroy({where: {id: groupId}})
    }
}

module.exports = new GroupService()