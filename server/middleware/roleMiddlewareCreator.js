const ApiError = require("../error/ApiError")

const roleMiddlewareCreator = (roles) => {
    return async (req, res, next) => {
        try {
            const { role } = req.user
            if (role === null) {
                return next(ApiError.badRequest('Вы уволены, лох))'))
            }
            if (!roles.includes(role)) {
                return next(ApiError.forbidden('Нет доступа'))
            }
            return next()
        } catch {
            next(ApiError.badRequest('Ошибка'))
        }

    }
}
module.exports = roleMiddlewareCreator