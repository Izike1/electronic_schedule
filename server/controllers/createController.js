const groupService = require("../service/groupService");
const userService = require("../service/userService");

class CreateController {
    async createGroup(req, res, next) {
        try {
            const {groupName, facultyId} = req.body;
            const group = groupService.createGroup(groupName, facultyId)
            res.json(group)
        } catch (e) {
            next(e)
        }
    }

    async createUser(req, res, next) {
        try {
            const {firstName, lastName, middleName, groupId} = req.body;
            const user = await userService.createUser(firstName, lastName, middleName, groupId)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new CreateController();