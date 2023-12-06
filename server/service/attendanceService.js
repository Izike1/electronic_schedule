const {Groups, User, User_info, Faculty} = require("../models/models");
const ApiError = require("../error/ApiError");
const {Schedule} = require('../models/models')
const { AgpuAPI } = require("../remote-api/schedule/agpuAPI");
class AttendanceService {
    async getSchedule(id, currentDate) {
        try {
            const scheduleFromDB = await Schedule.findAll({where: {id:id, currentDate:currentDate}})

            if (scheduleFromDB) {
                return scheduleFromDB;
            } else {
                const parsedSchedule = await AgpuAPI().getTimeTableById(id,currentDate);

                await Schedule.create({id, currentDate, parsedSchedule});

                return parsedSchedule;
            }
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to retrieve or parse schedule.');
        }
    }
}

module.exports = new AttendanceService();