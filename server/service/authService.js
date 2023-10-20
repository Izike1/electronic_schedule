const {Auth} = require('../models/models');
const tokenService = require('./tokenService')
const AuthDto = require('../dtos/authDto')
class AuthService {
    async registration(login, password, role) {
        const candidate = await Auth.findOne({where: {login:login}})
        if (candidate) {
            throw new Error('Пользователь с таким именем уже существует')
        }
        const auth = await Auth.create({ login, role, password })
        const authDto = new AuthDto(auth);
        const tokens = tokenService.generateToken({...authDto});
        await tokenService.saveToken(authDto.id, tokens.refreshToken);

        return {
            ...tokens,
            auth: authDto
        }
    }
}

module.exports = new AuthService();