const { parse } = require('node-html-parser')
const { default: axios } = require("axios")
const { stringToDate, dateToStartWeek } = require('../../utils/dateUtil')
const ApiError = require('../../error/ApiError')

// 'ВМ-ИВТ-3-1'
const agpuURL = 'https://www.it-institut.ru'
const lessonInfoParser = (lessonInfo) => {
    let [lessonName, ...additional] = lessonInfo
    let splitIndex = lessonName.lastIndexOf(',')
    let type = ''
    if (splitIndex !== lessonName.length - 1) {
        type = lessonName.slice(splitIndex + 1)
    }
    lessonName = lessonName.slice(0, splitIndex).trim()
    return {
        name: lessonName,
        type,
        additional
    }
}
const parseTimeTable = (response) => {
    const root = parse(response.data)

    const table = root.querySelector('table.table')
    const days = table.querySelectorAll('tbody tr')
    const timeElmes = table.querySelectorAll('thead tr th span').map(t => ({ time: t.textContent, colspan: Number(t.parentNode.attributes['colspan']) }))
    const timeTable = []
    for (let d of days) {
        const [day, date] = d.querySelector('th').innerHTML.split('<br>')
        const res = {
            day,
            date,
            times: []
        }
        const lessonElems = d.querySelectorAll('td')
        let offset = 0
        const times = []
        for (let i = 0; i < timeElmes.length; i++) {
            if (lessonElems[i + offset].childNodes.length > 0) {
                const lessonInfo = lessonElems[i + offset].querySelectorAll('div span').map((info) => info.innerText.replace(/&quot;/g, '"'))
                times.push({
                    time: timeElmes[i].time,
                    lessons: [lessonInfoParser(lessonInfo)]
                })
            }

            let curentColspan = Number(lessonElems[i + offset].attributes['colspan'])
            colspanOffset = curentColspan
            while (timeElmes[i].colspan > curentColspan) {
                offset++
                if (lessonElems[i + offset].childNodes.length > 0) {
                    const lessonInfo = lessonElems[i + offset].querySelectorAll('div span').map((info) => info.innerText.replace(/&quot;/g, '"'))

                    times[times.length - 1].lessons.push(lessonInfoParser(lessonInfo))
                }
                curentColspan += colspanOffset
            }
        }
        if (times.length > 0) {
            res.times = times
            timeTable.push(res)
        }
    }
    return timeTable
}
const AgpuAPI = (clientId = 118) => {
    return {
        async getGroupId(name) {
            const groupsRespons = await axios.get(agpuURL + '/SearchString/KeySearch', {
                params: {
                    Id: clientId,
                    SearchProductName: name
                }
            })
            if (groupsRespons.data.length <= 0) {
                throw ApiError.badRequest("Неверная дата")
            }
            return groupsRespons.data[0].SearchId
        },
        async getWeekByDate(date = new Date()) {
            if (typeof date === 'string') {
                date = stringToDate(date)
            }
            date = new Date(date)
            date.setHours(0)
            date.setMinutes(0)
            date.setSeconds(0)
            date.setMilliseconds(0)
            const startWeek = dateToStartWeek(date)
            const allWeeks = await this.getAllWeeks()
            return allWeeks.find((week) => week.weekStart === startWeek.getTime())
        },
        async requestTimeTable(groupId, weekId, groupName = '') {
            const req = await axios.get(`${agpuURL}/Raspisanie/SearchedRaspisanie`, {
                params: {
                    OwnerId: clientId,
                    SearchId: groupId,
                    SearchString: groupName,
                    Type: 'Group',
                    WeekId: weekId
                }
            })
            return req
        },
        async getTimeTableById(groupId, date = new Date()) {
            const weekInfo = await this.getWeekByDate(date)
            if (!weekInfo) {
                throw ApiError.badRequest("Неверная дата")
            }
            const timeTable = parseTimeTable(await this.requestTimeTable(groupId, weekInfo.id))
            return timeTable
        },
        async getTimeTableByName(group, date = new Date()) {

            const groupId = await this.getGroupId(group)

            const timeTable = await this.getTimeTableById(groupId, date)
            return timeTable
        },
        async getSemestrs() {
            const semestrsRes = await axios.get(`${agpuURL}/SearchString/ShowTestWeeks`, {
                params: {
                    ClientId: clientId
                }
            })
            const semestrsRoot = parse(semestrsRes.data)
            const semestrs = semestrsRoot.querySelectorAll('.SemestrPlace').map(elem => {
                const nameElem = elem.querySelector('.modal-header div p.h5')
                const infoElem = elem.querySelector('.modal-header div span')
                return {
                    id: elem.attrs['id'],
                    year: nameElem.innerText,
                    info: infoElem.innerText
                }
            })
            return semestrs

        },
        async getAllWeeks() {
            const allWeeks = []
            const semestrs = await this.getSemestrs()
            for (let semestr of semestrs) {
                const res = await axios.get(`${agpuURL}/SearchString/OpenAllWeek`, {
                    params: {
                        ClientId: clientId,
                        SemestrId: semestr.id
                    }
                })
                const root = parse(res.data)
                const pervousWeekElems = root.querySelectorAll('a.btn-outline-info')
                const weekElem = root.querySelector('a.btn-info')
                allWeeks.push(...pervousWeekElems.map(link => {
                    return {
                        semestr,
                        id: new URL(agpuURL + link.attrs.href).searchParams.get('WeekId'),
                        weekStart: stringToDate(link.querySelectorAll('span')[1].innerText)
                    }
                }))
                if (weekElem) {
                    allWeeks.push({
                        semestr,
                        id: new URL(agpuURL + weekElem.attrs.href).searchParams.get('WeekId'),
                        weekStart: stringToDate(weekElem.querySelectorAll('span')[1].innerText)
                    })
                }
            }
            return allWeeks
        },
    }
}
module.exports = { AgpuAPI }