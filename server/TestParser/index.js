const { AgpuAPI } = require("../remote-api/schedule/agpuAPI");
const { dateToStartWeek, stringToDate, dateToString } = require("../utils/dateUtil");
const fs = require('fs')
async function main() {
    const agpuAPI = AgpuAPI()

    const timeTable = await agpuAPI.getTimeTableByName('ВМ-ИВТ-4-1', '22.10.2023')
    console.log(dateToString(new Date(2023, 11, 2)))
    timeTable.forEach((d) => {
        d.times.forEach((t) => {
            t.lessons.forEach((lesson) => {
                console.log(lesson)
            })
        })
    })
    fs.appendFileSync(__dirname + '/1.json', JSON.stringify(timeTable))
    // for (let i = 1; i <= 30; i++) {
    //     console.log(i, dateToStartWeek(`${i}.10.2023`))
    //     // dateToStartWeek(`${i}.10.2023`)
    // }
    // console.log(new Date(Date.now()))
    // console.log(Date.now() / 60000)
    // console.log(new Date().getDay())


}

main()
