const sequelize = require('../db');
const {Schedule, Groups, Lesson, Lesson_has_Schedule} = require('../models/models')
const {AgpuAPI} = require("../remote-api/schedule/agpuAPI");
const {getDateRange, stringToDate, currentDateRound, stringToTime} = require('../utils/dateUtil');
const {ApiError} = require('../error/ApiError');
const {writeToLogFile} = require('../logger/index');
const {Op} = require("sequelize");

class ScheduleService {
    async getSchedule(name, currentDate) {
        currentDate = Number(currentDate)
        if (currentDate > new Date(Date.now()).setHours(23)) {
            console.log('Error time')
            writeToLogFile('Time error for getSchedule')
            throw ApiError.badRequest('Time error')
        }
        const group = await Groups.findOne({where: {name: name}})
        if (!group) {
            console.log('Error group')
            writeToLogFile('Group find error for getSchedule')
            throw ApiError.badRequest('Group find error')
        }
        const scheduleFromDB = await Schedule.findAll({
            where: {
                GroupId: group.id,
                date: {
                    [Op.between]: getDateRange(currentDate)
                }
            }
        })
        console.log(scheduleFromDB)
        if (scheduleFromDB.length > 0) {
            return scheduleFromDB;
        } else {
            const scheduleData = []
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
                    const {lesson: lessonName, ...restedSchedule} = schedule
                    await Lesson.findOrCreate({
                        where: {
                            name: lessonName
                        },
                        transaction: t
                    })
                    const createdSchedule = await Schedule.create(restedSchedule, {transaction: t})
                    lessonScheduleEntries.push({
                        LessonName: lessonName,
                        ScheduleId: createdSchedule.id,
                    });

                }

                await Lesson_has_Schedule.bulkCreate(lessonScheduleEntries, {transaction: t});
            });

            return parsedSchedule;
        }
    }
}

module.exports = new ScheduleService();