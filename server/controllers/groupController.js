const groupService = require('../service/groupService')

class GroupController {

    async changeGroup(req, res, next) {
        try {
            const {groupName, groupId, facultyId} = req.body;
            const group = groupService.changeGroup(groupName, groupId, facultyId)
            res.json(group)
        } catch (e) {
            next(e)
        }
    }

    async getGroups(req, res, next) {
        try {
            const groups = groupService.getGroups();
            res.json(groups)
        } catch (e) {
            next(e)
        }
    }

    async getGroupsByFaculty(req, res, next) {
        try {
            const {id} = req.query;
            const group = groupService.getGroupsByFaculty(id)
            res.json(group)
        } catch (e) {
            next(e)
        }
    }

    async removeGroup(req, res, next) {
        try {
            const {id} = res.body;
            const group = groupService.removeGroup(id)
            res.json(group)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new GroupController()