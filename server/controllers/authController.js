const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken')
const { Auth } = require('../models/models')

const generateJwt = (id, login, role) => {
    return jwt.sign(
        { id, login, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class AuthController {
    async registration(req, res, next) {
        const { login, password, role } = req.body
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный login или password'))
        }
        const candidate = await Auth.findOne({where: {login:login}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
        const auth = await Auth.create({ login, role, password })
        return res.sendStatus(204)
    }

    async login(req, res, next) {
        const { login, password } = req.body
        const auth = await Auth.findOne({ where: {login: login} })
        if (!auth) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        if (!auth.password === password) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(auth.id, auth.login, auth.role)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJwt(req.auth.id, req.auth.login, req.auth.role)
        if (!token) {
            next(ApiError.internal('Войдите в систему'))
        }
        return res.json({ token })
    }
}

module.exports = new AuthController()
