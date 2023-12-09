const {Attendance, Schedule} = require('../models/models')
const sequelize = require('../db')
const {writeToLogFile} = require("../logger");
const ApiError = require("../error/ApiError");

class AttendanceService {
    async updateAttendance(attendanceData) {
        await sequelize.transaction(async (t) => {
            for (const attendanceItem of attendanceData) {
                const scheduleId = attendanceItem.scheduleId;
                const attendanceDetails = attendanceItem.attendanceDetails;

                const schedule = await Schedule.findByPk(scheduleId);

                if (schedule) {
                    const attendanceEntries = attendanceDetails.map((detail) => ({
                        ScheduleId: schedule.id,
                        userId: detail.userId,
                        isPresent: detail.isPresent,
                    }));
                    await Attendance.bulkCreate(attendanceEntries, {transaction: t});
                } else {
                    console.error(`Schedule with ID ${scheduleId} not found.`);
                }
            }
        });
    }

}

module.exports = new AttendanceService();