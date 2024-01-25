const { Auth, User_info } = require('../models/models')
const tokenService = require('./tokenService')
const userService = require('./userService')
const AuthDto = require('../dtos/authDto')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')
const { writeToLogFile } = require('../logger/index')
const { User } = require('../db')
const sequelize = require('../db')

class AuthService {
    async registration(login, password, role, firstName, lastName, middleName, groupId) {
        const candidate = await Auth.findOne({ where: { login: login } })
        if (candidate) {
            writeToLogFile(`Ошибка при регистрации ${candidate}`)
            throw ApiError.badRequest('Пользователь с таким именем уже существует')
        }
        const auth = await Auth.create({ login, role, password })

        const user = await userService.createUser(firstName, lastName, middleName, groupId, auth.id)
        return {
            user
        }
    }

    async login(login, password) {
        const candidate = await Auth.findOne({ where: { login: login } })
        console.log(candidate)
        if (!candidate || password !== candidate.password) {
            writeToLogFile(`Ошибка при входе ${login}`)
            throw ApiError.badRequest('Ошибка при входе')
        }
        const authDto = new AuthDto(candidate);
        const tokens = tokenService.generateToken({ ...authDto })
        await tokenService.saveToken(authDto.id, tokens.refreshToken);
        writeToLogFile(`Выполнен вход ${candidate.login}`)
        return {
            ...tokens,
            auth: authDto
        }
    }

    async logout(refreshToken) {
        writeToLogFile(`Выход из приложения`)
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        console.log(refreshToken)
        if (!refreshToken) {
            throw ApiError.unauthorizedError()
        }
        const authData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!authData || !tokenFromDb) {
            throw ApiError.unauthorizedError()
        }
        const candidate = await Auth.findOne({ where: { id: authData.id } });
        const authDto = new AuthDto(candidate);
        const tokens = tokenService.generateToken({ ...authDto })
        await tokenService.saveToken(authDto.id, tokens.refreshToken);

        return {
            ...tokens,
            auth: authDto
        }
    }

    async delete(authId) {
        writeToLogFile(`Удаление пользователя ${authId}`)
        return await sequelize.transaction(async (t) => {
            await User.destroy({
                where: { AuthId: authId },
                transaction: t
            });

            await Auth.destroy({
                where: { id: authId },
                transaction: t
            });

            await User_info.destroy({
                where: { UserInfoId: authId },
                transaction: t
            });
        });
    }

    async getAuths() {
        writeToLogFile(`Получение пользователей`)
        return await Auth.findAll()
    }

    async getAuthsByChunks(chunkSize, pageNumber, search) {
        const offset = (pageNumber - 1) * chunkSize;
        writeToLogFile(`Получение пользователей ${search}`)
        return await Auth.findAll({
            offset: Number(offset),
            limit: Number(chunkSize),
            where: {
                login: { [Op.like]: `%${search}%` }
            }
        });
    }

    async getAuthsByRoles(roles) {

    }

}

module.exports = new AuthService();