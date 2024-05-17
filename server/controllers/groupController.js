const groupService = require('../service/groupService')

class GroupController {

    async createGroup(req, res, next) {
        try {
            const { groupName, facultyId } = req.body;
            const group = await groupService.createGroup(groupName, facultyId)
            res.json(group)
        } catch (e) {
            next(e)
        }
    }

    async changeGroup(req, res, next) {
        try {
            const { groupName, groupId, facultyId } = req.body;
            const group = await groupService.changeGroup(groupName, groupId, facultyId)
            res.json(group)
        } catch (e) {
            next(e)
        }
    }

    // async getGroups(req, res, next) {
    //     try {
    //         const groups = await groupService.getGroups();
    //         res.json(groups)
    //     } catch (e) {
    //         next(e)
    //     }
    // }

    async getSelfGroup(req, res, next) {
        try {
            const { id } = req.user;
            const group = await groupService.getSelfGroup(id)
            res.json(group)
        } catch (e) {
            next(e)
        }
    }

    async getGroupsByFaculty(req, res, next) {
        try {
            const { id } = req.query;
            const group = await groupService.getGroupsByFaculty(id)
            res.json(group)
        } catch (e) {
            next(e)
        }
    }

    async deleteGroup(req, res, next) {
        try {
            const { id } = req.body;

            const group = await groupService.deleteGroup(id)
            res.json(group)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new GroupController()