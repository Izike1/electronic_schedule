const userService = require("../service/userService");

class UserController {

    async createUser(req, res, next) {
        try {
            const { firstName, lastName, middleName, groupId, authId } = req.body;
            const user = await userService.createUser(firstName, lastName, middleName, groupId, authId)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async changeUser(req, res, next) {
        try {
            const { id, newUserData } = req.body;
            const user = await userService.changeUser(id, newUserData);
            res.json(user)
        } catch (e) {
            next(e)
        }
    }

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
            const { id } = req.query;
            const group = await userService.getUsersByGroupName(id)
            res.json(group)
        } catch (e) {
            next(e)
        }
    }

    async getUsersByFacultyName(req, res, next) {
        try {
            const { id } = req.query;
            const faculty = await userService.getUsersByFacultyName(id)
            res.json(faculty)
        } catch (e) {
            next(e)
        }
    }

    async removeUser(req, res, next) {
        try {
            const { id } = req.body;
            const userData = await userService.removeUser(id);
            res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();