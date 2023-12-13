const attendanceService = require('../service/attendanceService');

class AttendanceController {
    async createAttendance(req, res, next) {
        try {
            const {status, userId, scheduleId} = req.body;
            const attendance = await attendanceService.createAttendance(status, userId, scheduleId);
            res.json(attendance)
        } catch (e) {
            next(e)
        }
    }

    async getAttendance(req, res, next) {
        try {
            const {groupId, currentDate} = req.query;
            const attendance = await attendanceService.getAttendance(groupId, currentDate)
            console.log(attendance)
            res.json(attendance)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AttendanceController();