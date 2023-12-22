const sequelize = require('../db');
const { Schedule, Groups, Lesson, Lesson_has_Schedule, User_info } = require('../models/models')
const { AgpuAPI } = require("../remote-api/schedule/agpuAPI");
const { getDateRange, stringToDate, currentDateRound, stringToTime } = require('../utils/dateUtil');
const { ApiError } = require('../error/ApiError');
const { writeToLogFile } = require('../logger/index');
const { Op } = require("sequelize");
const createProcessHelper = () => {
    const processMap = new Map()
    const isInProcess = (val) => {
        return processMap.has(val)
    }
    const createProcess = (val) => {
        console.log('create process')
        const process = {
            endProcess: function () { }
        }
        const p = new Promise((res, rej) => {
            process.endProcess = function () {
                processMap.delete(val)
                res()
            }
        })
        processMap.set(val, p)

        return process
    }
    const waitProcess = (val) => {

        if (!isInProcess(val)) {
            return Promise.resolve()
        }
        console.log(`wait process ${val}`)
        console.log(`processes ` + processMap)
        return processMap.get(val)
    }
    return { createProcess, waitProcess, isInProcess }
}
const processHelper = createProcessHelper()
class ScheduleService {
    async getSchedule(name, currentDate) {
        currentDate = Number(currentDate)
        if (currentDate > new Date(Date.now()).setHours(23)) {
            console.log('Ошибка даты')
            writeToLogFile('Ошибка даты')
            throw ApiError.badRequest('Ошибка даты')
        }
        const group = await Groups.findOne({ where: { name: name } })
        if (!group) {
            console.log('Ошибка получения группы')
            writeToLogFile('Ошибка получения группы')
            throw ApiError.badRequest('Ошибка получения группы')
        }
        const curProcessName = group.id + ' ' + getDateRange(currentDate).map((d) => d.getTime()).join(' ')
        if (processHelper.isInProcess(curProcessName)) {
            await processHelper.waitProcess(curProcessName)
        }



        const scheduleFromDB = await Schedule.findAll({
            where: {
                GroupId: group.id,
                date: {
                    [Op.between]: getDateRange(currentDate)
                }
            }
        })
        if (scheduleFromDB.length > 0) {
            return scheduleFromDB.map(schedule => schedule.dataValues.id);
        }
        const process = processHelper.createProcess(curProcessName)
        try {
            const scheduleData = []
            let result = [];
            const parsedSchedule = await AgpuAPI().getTimeTableByName(name, currentDate);
            const nowDate = currentDateRound(currentDate)
            const day = parsedSchedule.find((day) => stringToDate(day.date) === nowDate.getTime())
            if (day) {
                for (let i = 0; i < day.times.length; i++) {
                    const timeSlot = day.times[i];
                    const lessons = timeSlot.lessons;
                    for (let j = 0; j < lessons.length; j++) {
                        const lesson = lessons[j];

                        const scheduleItem = {
                            type: lesson.type,
                            additional: lesson.additional.join('\n'),
                            lesson: lesson.name,
                            GroupId: group.id,
                            date: stringToTime(day.date, timeSlot.time.split('-')[0])
                        }
                        scheduleData.push(scheduleItem)

                    }
                }
            }
            await sequelize.transaction(async (t) => {
                const lessonScheduleEntries = [];

                for (let i = 0; i < scheduleData.length; i++) {
                    const schedule = scheduleData[i]
                    const { lesson: lessonName, ...restedSchedule } = schedule
                    await Lesson.findOrCreate({
                        where: {
                            name: lessonName
                        },
                        transaction: t
                    })
                    const createdSchedule = await Schedule.create(restedSchedule, { transaction: t })
                    lessonScheduleEntries.push({
                        LessonName: lessonName,
                        ScheduleId: createdSchedule.id,
                    });
                    result.push(createdSchedule.id)
                }

                await Lesson_has_Schedule.bulkCreate(lessonScheduleEntries, { transaction: t });
            });
            process.endProcess()
            return result
        } catch (e) {
            process.endProcess()
            throw e
        }


    }

    async setSchedule(userId, scheduleId) {
        const schedule = await Schedule.findOne({ where: { id: scheduleId } })
        const user = await User_info.findOne({ where: { id: userId } })
        if (!schedule) {
            console.log('Расписание не найденно')
            writeToLogFile('Расписание не найденно')
            throw ApiError.badRequest('Расписание не найденно')
        }
        schedule.UserId = userId
        await schedule.save()
        return user
    }
}

module.exports = new ScheduleService();