import emulateRequest from "../../devUtils/emulateRequest"

export const updateAttendance = async (studentId, scheduleId, status) => {

    console.log(studentId, status, scheduleId)
    return await emulateRequest({ status: 'ok' }, 5000)
}