const {User, Groups, User_info, Faculty} = require('../models/models');
const ApiError = require('../error/ApiError');

class UserService {
    async createUser(firstName, lastName, middleName, groupId) {
        const candidate = await User_info.findOne({
            where: {
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,

            }
        })
        if (candidate) {
            throw ApiError.badRequest('Пользователь существует')
        }
        const userInfo = await User_info.create({
            first_name: firstName,
            last_name: lastName,
            middle_name: middleName,})
        const user = await User.create({UserInfoId: userInfo.id, GroupId: groupId})
        return {
            userInfo,
            user
        }
    }

    async getUser(id) {
        const user = await User.findOne({where: {id: id}});
        if (!user) {
            throw ApiError.badRequest('Пользователь не найден');
        }
        return user
    }

    async getUsersByGroupName(id) {
        const group = await Groups.findAll({
            where: {id: id},
            include: [{
                model: User,
                required: true,
                include: [{
                    model: User_info,
                    required: true,
                }]
            }, {
                model: Faculty,
                required: true,
            }]
        });
        if (!group) {
            throw ApiError.badRequest('Группа не найдена')
        }
        return group
    }

    async getUsersByFacultyName(id) {
        const faculty = await Faculty.findAll({
            where: {id: id},
            include: [{
                model: User,
                required: true,
                include: [{
                    model: User_info,
                    required: true,
                }]
            }, {
                model: Groups,
                required: true,
            }]
        });
        if (!faculty) {
            throw ApiError.badRequest('Группа не найдена')
        }
        return faculty
    }

    async removeUser(id) {
        const user = await User.findOne({where: {id: id}});
        if (!user) {
            throw ApiError.badRequest('Пользователь не найден');
        }
        return await User.destroy({where: {id: id}})
    }
}

module.exports = new UserService();