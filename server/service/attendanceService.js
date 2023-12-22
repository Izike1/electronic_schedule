const {Attendance, Schedule, Groups, User_info, Lesson_has_Schedule} = require('../models/models')
const userService = require('../service/userService')
const scheduleService = require('./scheduleService')
const {writeToLogFile} = require("../logger");
const {stringToTime} = require('../utils/dateUtil')

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
            writeToLogFile(`Группа не найдена`)
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
                const lessonName = await Lesson_has_Schedule.findOne(
                    {
                        where: {ScheduleId: scheduleItem}
                    })
                const scheduleData = {
                    id: scheduleItem,
                    type: type,
                    lessonName: lessonName,
                    date: scheduleSlot.dataValues.date,
                    userId: userId,
                    groupId: scheduleSlot.dataValues.GroupId,
                    additional: scheduleSlot.dataValues.additional
                };
                scheduleData.lessonName = lessonName.LessonName
                schedules.push(scheduleData);
            }
            const attendance = await Attendance.findOne({where: {ScheduleId: scheduleItem}})
            attendances.push(attendance)
        }
        result.schedules = schedules
        result.students = user.dataValues.Users
        result.attendances = attendances
        const time = new Date(Number(currentDate))
        writeToLogFile(`Получение таблицы посещения ${time}`)
        return result;
    }

}

module.exports = new AttendanceService();