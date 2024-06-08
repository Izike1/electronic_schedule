const { User, Groups, User_info, Faculty } = require('../models/models');
const ApiError = require('../error/ApiError');
const { writeToLogFile } = require('../logger/index')
const sequelize = require('../db')
class UserService {
    async createUser(firstName, lastName, middleName, groupId, authId) {
        const result = await sequelize.transaction(async (transaction) => {
            const candidate = await User_info.findOne({
                where: {
                    first_name: firstName,
                    last_name: lastName,
                    middle_name: middleName || null,
                },
                transaction: transaction,
            });

            if (candidate) {
                throw new Error('Пользователь существует');
            }

            const userInfo = await User_info.create({
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
            }, { transaction: transaction });

            const userData = { UserInfoId: userInfo.id };

            if (groupId !== null) {
                userData.GroupId = groupId;
            }

            if (authId !== null) {
                userData.AuthId = authId;
            }

            const user = await User.create(userData, { transaction: transaction });

            return user;
        });

        writeToLogFile(`Создание пользователя ${firstName}`);

        return result;
    }

    async changeUser(id, newUserData) {
        const user = await User.findByPk(id, {
            include: [{ model: User_info }]
        });
        if (!user) {
            throw ApiError.badRequest('Пользователь не найден');
        }
        await User_info.update(
            {
                first_name: newUserData.first_name || user.User_info.first_name,
                last_name: newUserData.last_name || user.User_info.last_name,
                middle_name: newUserData.middle_name || user.User_info.middle_name
            },
            {
                where: { id: user.UserInfoId }
            }
        );
    }

    async findUserByAuthId(authId) {
        const user = await User.findOne({ where: { AuthId: authId } })
        writeToLogFile(`Получение пользователя ${authId}`)
        if (!user) {
            throw ApiError.badRequest('Пользователь не найден');
        }
        return user
    }

    async getUser(id) {
        const user = await User.findOne({ where: { id: id } });
        writeToLogFile(`Получение пользователя ${id}`)
        if (!user) {
            throw ApiError.badRequest('Пользователь не найден');
        }
        return user
    }

    async getUsersByGroupName(id) {
        const group = await Groups.findOne({
            where: { id: id },
            attributes: [
                'id',
                'name'
            ],
            include: [{
                where: { AuthId: null },
                attributes: [
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
        writeToLogFile(`Получение пользователей ${group.name}`)
        return group
    }

    async getUsersByFacultyName(id) {
        const faculty = await Faculty.findAll({
            where: { id: id },
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
        writeToLogFile(`Получение пользователей ${faculty.name}`)
        return faculty
    }

    async removeUser(id) {
        const user = await User.findOne({ where: { id: id } });
        if (!user) {
            throw ApiError.badRequest('Пользователь не найден');
        }
        writeToLogFile(`Удаление пользователя ${id}`)


        return await sequelize.transaction(async (t) => {
            await User_info.destroy({
                where: { UserInfoId: user.dataValues.UserInfoId },
                transaction: t
            });
            await User.destroy({ where: { id: id }, transaction: t })
        })
    }
}

module.exports = new UserService();