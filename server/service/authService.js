const {Auth} = require('../models/models');
const tokenService = require('./tokenService')
const AuthDto = require('../dtos/authDto')
const ApiError = require('../error/ApiError')

class AuthService {
    async registration(login, password, role) {
        const candidate = await Auth.findOne({where: {login: login}})
        if (candidate) {
            throw ApiError.badRequest('Пользователь с таким именем уже существует')
        }
        const auth = await Auth.create({login, role, password})
        const authDto = new AuthDto(auth);
        const tokens = tokenService.generateToken({...authDto});
        await tokenService.saveToken(authDto.id, tokens.refreshToken);

        return {
            ...tokens,
            auth: authDto
        }
    }

    async login(login, password) {
        const candidate = await Auth.findOne({where: {login: login}})
        if (candidate) {
            throw ApiError.badRequest('Пользователь с таким именем не существует')
        }
        if (password !== candidate.password) {
            throw ApiError.badRequest('Неверный пароль');
        }
        const authDto = new AuthDto(candidate);
        const tokens = tokenService.generateToken({...authDto})
        await tokenService.saveToken(authDto.id, tokens.refreshToken);

        return {
            ...tokens,
            auth: authDto
        }
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const authData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!authData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const candidate = await Auth.findOne({where: {id: authData.id}});
        const authDto = new AuthDto(candidate);
        const tokens = tokenService.generateToken({...authDto})
        await tokenService.saveToken(authDto.id, tokens.refreshToken);

        return {
            ...tokens,
            auth: authDto
        }
    }
}

module.exports = new AuthService();