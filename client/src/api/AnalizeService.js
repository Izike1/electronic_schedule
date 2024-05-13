import { dateToyyyyMMdd } from "../utils/dateUtil"
import $api, { API_URL } from "./api"
const body = document.body || document?.querySelector('body') || document.getElementsByTagName('body').item(0)
const downloadFile = (blob, downloadName) => {
    const linkElem = document.createElement('a')
    let url = URL.createObjectURL(blob)
    linkElem.href = url
    linkElem.download = `${downloadName}.xlsx`
    body.append(linkElem)
    linkElem.click()
    linkElem.remove()
    URL.revokeObjectURL(url)
}

export class AnalizeService {
    static async analizeByFaculty(facultyId, startDate, endDate, facultyName = 'Факультет') {
        const res = await $api.get('/analytics/getAnalyticsByFaculty', {
            params: {
                facultyId, startDate, endDate
            },
            responseType: 'blob',
        })
        downloadFile((res.data), `${facultyName}-${dateToyyyyMMdd(startDate)}`)
    }
    static async analizeByGroup(groupId, startDate, endDate, groupName = 'Группа') {
        const res = await $api.get('/analytics/getAnalyticsByGroupName', {
            params: {
                groupId, startDate, endDate
            },
            responseType: 'blob',
        })
        downloadFile((res.data), `${groupName}-${dateToyyyyMMdd(startDate)}`)
    }
}