const {Attendance, Schedule, Groups} = require('../models/models')
const userService = require('../service/userService')
const scheduleService = require('./scheduleService')
const {writeToLogFile} = require("../logger");

class AttendanceService {
    async createAttendance(status, userId, scheduleId) {
        writeToLogFile(`Создание таблицы посещения ${userId}`)
        return await Attendance.create({status, UserId: userId, ScheduleId: scheduleId})
    }

    async getAttendance(groupId, currentDate) {
        let result = {}
        let schedules = []
        let attendances = []
        const groupName = await Groups.findOne({where: {id: groupId}});
        if (!groupName) {
            console.log('Группа не найдена');
            return schedules;
        }
        const user = await userService.getUsersByGroupName(groupId);
        const schedule = await scheduleService.getSchedule(groupName.name, currentDate);
        for (let i = 0; i < schedule.length; i++) {
            const scheduleItem = schedule[i];
            const scheduleSlot = await Schedule.findOne({where: {id: scheduleItem}});
            if (scheduleSlot) {
                const type = scheduleSlot.dataValues.type !== undefined ? scheduleSlot.dataValues.type : 'unknown';
                const userId = scheduleSlot.dataValues.userId !== undefined ? scheduleSlot.dataValues.userId : 'unknown';
                const scheduleData = {
                    id: scheduleItem,
                    type: type,
                    date: scheduleSlot.dataValues.date,
                    userId: userId,
                    groupId: scheduleSlot.dataValues.GroupId,
                    additional: scheduleSlot.dataValues.additional
                };
                schedules.push(scheduleData);
            }
            const attendance = await Attendance.findOne({where: {ScheduleId: scheduleItem}})
            attendances.push(attendance)
        }
        result.schedules = schedules
        result.students = user.dataValues.Users
        result.attendances = attendances
        writeToLogFile(`Получение таблицы посещения ${currentDate}`)
        return result;
    }

}

module.exports = new AttendanceService();