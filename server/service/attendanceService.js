const {Schedule, Groups, Lesson} = require('../models/models')
const {AgpuAPI} = require("../remote-api/schedule/agpuAPI");
const {getDateRange, stringToDate, currentDateRound, stringToTime} = require('../utils/dateUtil');
const {ApiError} = require('../error/ApiError');
const { writeToLogFile } = require('../logger/index');
class AttendanceService {
    async getSchedule(name, currentDate) {
        currentDate = Number(currentDate)
        if(currentDate > new Date(Date.now()).setHours(23)) {
            console.log('Error time')
            writeToLogFile('Time error for getSchedule')
            throw ApiError.badRequest('Time error')
        }
        const group = await Groups.findOne({where: {name:name}})
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
            const schedule = []
            const parsedSchedule = await AgpuAPI().getTimeTableByName(name, currentDate);
            const nowDate = currentDateRound(currentDate)
            const day = parsedSchedule.find((day) => stringToDate(day.date) === nowDate.getTime())
            if (day) {
                for (let i = 0; i < day.times.length; i++) {
                    const timeSlot = day.times[i];
                    console.log(timeSlot)
                    const lessons = timeSlot.lessons;
                    console.log(lessons)
                    for(let j = 0; j < lessons.length; j++) {
                        const lesson = lessons[j];

                        const scheduleItem = {
                            name: lesson.name,
                            type: lesson.type,
                            additional: lesson.additional.join('\n'),
                            GroupId: group.id,
                            date: stringToTime(day.date, timeSlot.time.split('-')[0])
                        }
                        schedule.push(scheduleItem)
                    }
                    console.log({...schedule})
                }
            }
            await Schedule.bulkCreate(schedule);
            return parsedSchedule;
        }
    }
}

module.exports = new AttendanceService();