const attendanceService = require('../service/attendanceService')
class AttendanceController {
    async getSchedule(req,res,next) {
        try {
            const {name, currentDate} = req.query;
            const schedule = await attendanceService.getSchedule(name,currentDate);
            res.json(schedule)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new AttendanceController();