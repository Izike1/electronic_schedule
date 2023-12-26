import $api from "./api";

export class AttendanceService {
    static async getAttendance(id, time) {
        return $api.get('/attendance/getAttendance', {
            params: {
                groupId: id,
                currentDate: time
            }
        })
    }
    static async verifyByScheduleId(scheduleId) {
        return $api.post('/schedule/setSchedule', {
            scheduleId,
        })
    }
    static async unverifyByScheduleId(scheduleId) {
        return $api.post('/schedule/unsetSchedule', {
            scheduleId,
        })
    }
    static async updateAttendance(studentId, scheduleId, status) {
        return $api.post('/attendance/attendanceCreate', {
            userId: studentId, scheduleId,
            status
        })
    }
}