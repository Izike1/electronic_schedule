const ApiError = require('../error/ApiError');
const authService = require('../service/authService');

class AuthController {
    async registration(req, res, next) {
        try {
            const {login,password,role} = req.body;
            const authData = await authService.registration(login,password,role)
            res.cookie('refreshToken', authData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true})
            return res.json(authData)
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body;
            const authData = await authService.login(login, password);
            res.cookie('refreshToken', authData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true})
            return res.json(authData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req,res,next) {
        try{
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }

    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const authData = await authService.refresh(refreshToken)
            res.cookie('refreshToken', authData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true})
            return res.json(authData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()
