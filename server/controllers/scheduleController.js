const scheduleService = require('../service/scheduleService')
class ScheduleController {
    async getSchedule(req,res,next) {
        try {
            const {name, currentDate} = req.query;
            const schedule = await scheduleService.getSchedule(name,currentDate);
            res.json(schedule)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new ScheduleController();