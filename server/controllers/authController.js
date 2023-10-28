const authService = require('../service/authService');

class AuthController {
    async registration(req, res, next) {
        try {
            const {login, password, role} = req.body;
            const authData = await authService.registration(login, password, role)
            this.sendRefreshTokenCookie(res, authData.refreshToken)
            return res.json(authData)
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {login, password} = req.body;
            const authData = await authService.login(login, password);
            this.sendRefreshTokenCookie(res, authData.refreshToken)
            return res.json(authData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
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
            this.sendRefreshTokenCookie(res, authData.refreshToken)
            return res.json(authData)
        } catch (e) {
            next(e)
        }
    }

    sendRefreshTokenCookie(res, refreshToken) {
        res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true});
    }
}

module.exports = new AuthController()
