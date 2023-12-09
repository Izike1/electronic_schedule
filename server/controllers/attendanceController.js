const attendanceService = require('../service/attendanceService');

class AttendanceController {
    async updateAttendance(req,res,next) {
        try {
            const {attendanceData} = req.body;
            const attendance = await attendanceService.updateAttendance(attendanceData);
            res.json(attendance)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AttendanceController();