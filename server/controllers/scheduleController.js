const scheduleService = require('../service/scheduleService')

class ScheduleController {
    async getSchedule(req, res, next) {
        try {
            const { name, currentDate } = req.query;
            const schedule = await scheduleService.getSchedule(name, currentDate);
            res.json(schedule)
        } catch (e) {
            next(e)
        }
    }

    async setSchedule(req, res, next) {
        try {
            const { scheduleId } = req.body;
            const { id } = req.user;
            console.log(id)
            const schedule = await scheduleService.setSchedule(id, scheduleId);
            res.json(schedule)
        } catch (e) {
            next(e)
        }
    }

    async unsetSchedule(req, res, next) {
        try {
            const { scheduleId } = req.body;
            const schedule = await scheduleService.unsetSchedule(scheduleId);
            res.json(schedule)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ScheduleController();