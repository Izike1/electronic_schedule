const { AgpuAPI } = require("../remote-api/schedule/agpuAPI");
const { dateToStartWeek, stringToDate, dateToString } = require("../utils/dateUtil");
async function main() {
    const agpuAPI = AgpuAPI()
    console.log(await agpuAPI.getTimeTableByName('ВМ-ИВТ-4-1', '22.10.2023'))
    console.log(dateToString(new Date(2023, 11, 2)))
    // for (let i = 1; i <= 30; i++) {
    //     console.log(i, dateToStartWeek(`${i}.10.2023`))
    //     // dateToStartWeek(`${i}.10.2023`)
    // }
    // console.log(new Date(Date.now()))
    // console.log(Date.now() / 60000)
    // console.log(new Date().getDay())


}

main()
