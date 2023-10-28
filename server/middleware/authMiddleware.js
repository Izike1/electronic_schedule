const ApiError = require('../error/ApiError');
const tokenService = require('../service/tokenService');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer
        if (!token) {
            return next(ApiError.UnauthorizedError());
        }
        const authData  = tokenService.validateAccessToken(token)
        if (!authData ) {
            return  next(ApiError.UnauthorizedError());
        }
        req.auth = authData;
        next()
    } catch (e) {
        next(ApiError.UnauthorizedError())
    }
};
