const convertUnixToDate = unixTimestamp => {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const convertDate = date => {
    const timestamp = Date.parse(date);
    return timestamp / 1000;
}

const currentDateRound = (day) => {
    let startDate = new Date(day)
    startDate.setMilliseconds(0);
    startDate.setSeconds(0);
    startDate.setMinutes(0);
    startDate.setHours(0);

    return startDate
}
const getDateRange = (day) => {

    let startDate = new Date(day)
    startDate.setMilliseconds(0);
    startDate.setSeconds(0);
    startDate.setMinutes(0);
    startDate.setHours(0);
    startDate = startDate.toISOString()

    let endDate = new Date(day)
    endDate.setMilliseconds(999)
    endDate.setSeconds(59)
    endDate.setMinutes(59)
    endDate.setHours(23)
    endDate = endDate.toISOString()
    return [startDate, endDate]
}
const stringToDate = (string) => {
    const dateRegex = /.*?(\d{1,2})\.(\d{1,2})\.(\d{4,})/gm
    const arr = string.replace(dateRegex, '$3.$2.$1').split('.')
    let month = Number.parseInt(arr[1]) - 1
    if (month < 0) {
        month = 11
    }
    month = String(month).length > 1 ? String(month) : '0' + month
    arr[1] = month
    return (new Date(...arr)).getTime()
}
const stringToTime = (dateString, timeString) => {
    let time
    if (typeof dateString === 'string') {
        time = stringToDate(dateString)
    } else {
        if (dateString instanceof Date) {
            dateString.setHours(0)
            dateString.setMinutes(0)
            dateString.setMilliseconds(0)
            time = dateString.getTime()
        } else {
            const newDate = new Date(dateString)
            newDate.setHours(0)
            newDate.setMinutes(0)
            newDate.setMilliseconds(0)
            time = newDate.getTime()
        }

    }


    let [hours, minutes] = timeString.split(':').map((t) => Number(t.trim()))
    time += (hours * 60 + minutes) * 60 * 1000
    return time
}
const dateToString = (date) => {
    if (typeof date === 'number') {
        date = new Date(date)
    }
    let dateNumber = date.getDate()
    let month = date.getMonth() + 1
    const year = date.getFullYear()
    month = String(month).length > 1 ? String(month) : '0' + month
    dateNumber = String(dateNumber).length > 1 ? String(dateNumber) : '0' + dateNumber
    return `${dateNumber}.${month}.${year}`
}
const dateToStartWeek = (val) => {
    const startDay = 1
    if (typeof val === 'string') {
        val = stringToDate(val)
    }

    if (typeof val === 'number') {
        val = new Date(val)
    }

    let roundNum = 1000 * 60 * 60 * 24
    let time = Math.floor(val.getTime() / roundNum)
    const curDay = val.getDay() || 7

    time -= curDay - startDay
    time++

    time *= roundNum
    let date = new Date(time)
    date.setHours(0)

    return date


}
module.exports = { stringToDate, dateToString, dateToStartWeek, stringToTime, getDateRange, currentDateRound, convertDate, convertUnixToDate }