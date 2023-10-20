const ApiError = require('../error/ApiError');
const authService = require('../service/authService');

class AuthController {
    async registration(req, res, next) {
        try {
            const {login,password,role} = req.body;
            const authData = await authService.registration(login,password,role)
            res.cookie('refreshToken', authData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true})
            return res.json(authData)
        }
        catch (e) {
            console.log(e)
        }
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
