const attendanceService = require('../service/attendanceService');
const userService = require('../service/userService')
const ApiError = require('../error/ApiError')
class AttendanceController {
    async createAttendance(req, res, next) {
        try {
            const statuses = [
                'unknown',
                'attended',
                'absent',
                'sick',
                'order'
            ]
            const { status, userId, scheduleId } = req.body;
            if (!statuses.includes(status)) {
                throw ApiError.badRequest('Неправильный статус')
            }
            const attendance = await attendanceService.createAttendance(status, userId, scheduleId);
            res.json(attendance)
        } catch (e) {
            next(e)
        }
    }

    async getAttendance(req, res, next) {
        try {
            let attendance;
            const { groupId, currentDate } = req.query;
            const { user } = req;
            const userRole = user.role
            if (userRole === 'headman' || userRole === 'group') {
                const candidate = await userService.findUserByAuthId(user.id)
                if (candidate.GroupId !== +groupId) {
                    throw ApiError.badRequest('Группа не найдена')
                }
            }
            attendance = await attendanceService.getAttendance(groupId, currentDate)
            res.json(attendance)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AttendanceController();