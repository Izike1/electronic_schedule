const {User, Groups, User_info, Faculty} = require('../models/models');
const ApiError = require('../error/ApiError');

class UserService {
    async createUser(firstName, lastName, middleName, groupId, authId) {
        const candidate = await User_info.findOne({
            where: {
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName||null,

            }
        })
        if (candidate) {
            throw ApiError.badRequest('Пользователь существует')
        }
        const userInfo = await User_info.create({
            first_name: firstName,
            last_name: lastName,
            middle_name: middleName,})
        let user;
        const userData = { UserInfoId: userInfo.id };

        if (groupId !== null) {
            userData.GroupId = groupId;
        }

        if (authId !== null) {
            userData.AuthId = authId;
        }

        user = await User.create(userData);
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
        const group = await Groups.findOne({
            where: {id: id},
            attributes:[
                'id',
                'name'
            ],
            include: [{
                attributes:[
                    'id'
                ],
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