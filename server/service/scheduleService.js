const sequelize = require('../db');
const {Schedule, Groups, Lesson, Lesson_has_Schedule} = require('../models/models')
const {AgpuAPI} = require("../remote-api/schedule/agpuAPI");
const {getDateRange, stringToDate, currentDateRound, stringToTime} = require('../utils/dateUtil');
const {ApiError} = require('../error/ApiError');
const {writeToLogFile} = require('../logger/index');

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
                    "$between": getDateRange(currentDate)
                }
            }
        })

        if (scheduleFromDB.length > 0) {
            return scheduleFromDB;
        } else {
            const scheduleData = []
            const lessonData = []
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
                            GroupId: group.id,
                            date: stringToTime(day.date, timeSlot.time.split('-')[0])
                        }
                        const lessonItem = {
                            name: lesson.name
                        }
                        scheduleData.push(scheduleItem)
                        lessonData.push(lessonItem)
                    }
                }
            }
            await sequelize.transaction(async (t) => {
                const findLessons = await Lesson.findAll({ where: { name: lessonData.map(lesson => lesson.name) } });

                if (findLessons.length > 0) {
                    console.log('Some lessons are already in the database');
                    writeToLogFile('Lessons already exist');
                }

                const createdLessons = await Lesson.bulkCreate(lessonData, { transaction: t });
                const createdSchedules = await Schedule.bulkCreate(scheduleData, { transaction: t });

                const lessonScheduleEntries = [];
                createdLessons.forEach((lesson) => {
                    createdSchedules.forEach((schedule) => {
                        lessonScheduleEntries.push({
                            LessonName: lesson.name,
                            ScheduleId: schedule.id,
                        });
                    });
                });

                await Lesson_has_Schedule.bulkCreate(lessonScheduleEntries, { transaction: t });
            });

            return parsedSchedule;
        }
    }
}

module.exports = new ScheduleService();