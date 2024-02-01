const authService = require('../service/authService');

class AuthController {
    async registration(req, res, next) {
        try {
            const { login, password, role, firstName, lastName, middleName, groupId } = req.body;
            const authData = await authService.registration(login, password, role, firstName, lastName, middleName, groupId)
            return res.json(authData)
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body;
            const authData = await authService.login(login, password);
            this.sendRefreshTokenCookie(res, authData.refreshToken)
            return res.json(authData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const authData = await authService.refresh(refreshToken)
            this.sendRefreshTokenCookie(res, authData.refreshToken)
            return res.json(authData)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body;
            const authData = await authService.delete(id)
            res.json(authData)
        } catch (e) {
            next(e)
        }
    }

    async getAuths(req, res, next) {
        try {
            const auth = await authService.getAuths()
            res.json(auth)
        } catch (e) {
            next(e)
        }
    }

    async getAuthsByChunks(req, res, next) {
        try {
            const { chunkSize, pageNumber, search } = req.query;
            const auth = await authService.getAuthsByChunks(chunkSize, pageNumber, search);
            res.json(auth)
        } catch (e) {
            next(e)
        }
    }

    async getAuthsByRoles(req, res, next) {
        try {
            const { roles } = req.body;
            const auth = await authService.getAuthsByRoles(roles)
            res.json(auth)
        } catch (e) {
            next(e)
        }
    }

    sendRefreshTokenCookie(res, refreshToken) {
        res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
    }
}

module.exports = new AuthController()
