const userService = require("../service/userService");

class UserController {

    async getUser(req, res, next) {
        try {
            const { id } = req.query;
            const userData = await userService.getUser(id);
            res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsersByGroupName(req, res, next) {
        try {
            const {id} = req.query;
            const group = await userService.getUsersByGroupName(id)
            res.json(group)
        } catch (e) {
            next(e)
        }
    }

    async getUsersByFacultyName(req, res, next) {
        try {
            const {id} = req.query;
            const faculty = await userService.getUsersByFacultyName(id)
            res.json(faculty)
        } catch (e) {
            next(e)
        }
    }

    async removeUser(req, res, next) {
        try {
            const {id} = req.body;
            const userData = await userService.removeUser(id);
            res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();