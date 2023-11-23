const ApiError = require("../exceotions/api-error")
const roleService = require("../service/role-service")

const roleMiddlewareCreator = (roles) => {
    return async (req, res, next) => {
        try {
            const { role_id } = req.user
            if (role_id === null) {
                return next(ApiError.BadRequest('Вы уволены'))
            }
            const userRole = await roleService.getById(role_id)
            if (!roles.includes(userRole)) {
                return next(ApiError.Forbidden())
            }
            return next()
        } catch {
            next(ApiError.BadRequest('Ошибка'))
        }

    }
}
module.exports = roleMiddlewareCreator