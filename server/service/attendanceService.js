const { Attendance, Schedule, Groups, User, Lesson_has_Schedule, User_info } = require('../models/models')
const userService = require('../service/userService')
const scheduleService = require('./scheduleService')
const { writeToLogFile } = require("../logger");
const { createSyncProcess } = require("../utils/createSyncProcess");
const ApiError = require('../error/ApiError')

const processHelper = createSyncProcess()

class AttendanceService {
    async createAttendance(status, userId, scheduleId) {

        if (processHelper.isInProcess(userId + ' ' + scheduleId)) {
            await processHelper.waitProcess(userId + ' ' + scheduleId)
        }

        const syncProcess = processHelper.createProcess(userId + ' ' + scheduleId)

        try {
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                throw ApiError.badRequest('Студент не найден')
            }

            writeToLogFile(`Создание таблицы посещения ${user.id},${new Date()}`);

            const attendanceEntry = await Attendance.findOne({
                where: {
                    UserId: user.id,
                    ScheduleId: scheduleId
                }
            });

            if (attendanceEntry) {
                const updated = await attendanceEntry.update({ status: status });
                syncProcess.endProcess()
                return updated
            } else {
                const newAttendance = await Attendance.create({
                    status: status,
                    UserId: user.id,
                    ScheduleId: scheduleId
                });
                syncProcess.endProcess()
                return newAttendance
            }

        } catch (e) {
            syncProcess.endProcess()
            throw e
        }


    }

    async getAttendance(groupId, currentDate) {
        let result = {}
        let schedules = []
        let attendances = []
        const groupName = await Groups.findOne({ where: { id: groupId } });

        if (!groupName) {
            writeToLogFile(`Группа не найдена`)
            return schedules;
        }

        const user = await userService.getUsersByGroupName(groupId);
        const schedule = await scheduleService.getSchedule(groupName.name, currentDate);

        for (let i = 0; i < schedule.length; i++) {
            const scheduleItem = schedule[i];
            const scheduleSlot = await Schedule.findOne({ where: { id: scheduleItem } });

            if (scheduleSlot) {
                const type = scheduleSlot.dataValues.type !== undefined ? scheduleSlot.dataValues.type : '';
                const userId = scheduleSlot.dataValues.UserId !== undefined ? scheduleSlot.dataValues.UserId : null;
                const lessonName = await Lesson_has_Schedule.findOne(
                    {
                        where: { ScheduleId: scheduleItem }
                    })

                const userInfo = await User.findOne(
                    {
                        where: {
                            id: scheduleSlot.dataValues.UserId
                        },
                        include: [{
                            model: User_info,
                            required: true
                        }]
                    })

                const scheduleData = {
                    id: scheduleItem,
                    type: type,
                    lessonName: lessonName,
                    date: scheduleSlot.dataValues.date,
                    userInfo: userInfo?.User_info || null,
                    groupId: scheduleSlot.dataValues.GroupId,
                    additional: scheduleSlot.dataValues.additional
                };

                scheduleData.lessonName = lessonName.LessonName
                schedules.push(scheduleData);
            }

            const attendance = await Attendance.findAll({ where: { ScheduleId: scheduleItem } })
            attendances.push(attendance)
        }

        result.schedules = schedules
        result.students = user.dataValues.Users
        result.attendances = attendances

        writeToLogFile(`Получение таблицы посещения ${new Date(Number(currentDate))}`)

        return result;
    }

}

module.exports = new AttendanceService();