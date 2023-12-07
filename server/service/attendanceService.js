const {Schedule, Groups} = require('../models/models')
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
                groupId: group.id,
                date: {
                    "$between": getDateRange(currentDate)
                }
            }
        })

        if (scheduleFromDB.length > 0) {
            return scheduleFromDB;
        } else {
            const parsedSchedule = await AgpuAPI().getTimeTableByName(name, currentDate);
            const nowDate = currentDateRound(currentDate)
            const day = parsedSchedule.find((day) => stringToDate(day.date) === nowDate.getTime())
            // for (let i = 0; i < day.times.length; i++) {
            //
            // }
            console.log(day)
            //await Schedule.create({, currentDate, parsedSchedule});
            return parsedSchedule;
        }
    }
}

module.exports = new AttendanceService();