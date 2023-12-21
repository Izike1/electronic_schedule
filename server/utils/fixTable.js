const Excel = require('exceljs')
const path = require('path')

const replaceStart = (str, start, replace) => {
    return replace + str.slice(start.length)
}

const start = async () => {

    const filePath = path.join(__dirname, './fixedList.xlsx');
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Students');
    const groups = new Set()
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber <= 2 || rowNumber > 5741) {
            return
        }
        const cells = row._cells;
        if (!cells || !cells[4]) {

            console.log(rowNumber)
            return
        }
        const cell = worksheet.getCell(cells[4]._address)
        if (cell.value.startsWith('BИ-ИиГ')) {
            cell.value = replaceStart(cell.value, 'BИ-ИиГ', 'ВИ-ИГ')
        } else if (cell.value.startsWith('BИ-ИиОбщ')) {
            cell.value = replaceStart(cell.value, 'BИ-ИиОбщ', 'ВИ-ИО')
        } else if (cell.value.startsWith('BИ-Ист')) {
            cell.value = replaceStart(cell.value, 'BИ-Ист', 'ВИ-Ист')
        } else if (cell.value.startsWith('BИ-ПиПД')) {
            cell.value = replaceStart(cell.value, 'BИ-ПиПД', 'BИ-ПиПД')
        } else if (cell.value.startsWith('BЛЯ-ИиИнф')) {
            cell.value = replaceStart(cell.value, 'BЛЯ-ИиИнф', 'ВЛЯ-ИиИнф')
        } else if (cell.value.startsWith('BЛЯ-ИяиИя')) {
            cell.value = replaceStart(cell.value, 'BЛЯ-ИяиИя', 'ВЛЯ-ИЯиИЯ')
        } else if (cell.value.startsWith('BЛЯ-РЛ')) {
            cell.value = replaceStart(cell.value, 'BЛЯ-РЛ', 'ВЛЯ-РЛ')
        } else if (cell.value.startsWith('BЛЯ-РлиЛит')) {
            cell.value = replaceStart(cell.value, 'BЛЯ-РлиЛит', 'ВЛЯ-РЛиЛит')
        } else if (cell.value.startsWith('BМ-ИВТ')) {
            cell.value = replaceStart(cell.value, 'BМ-ИВТ', 'ВМ-ИВТ')
        } else if (cell.value.startsWith('BМ-Инфор')) {
            cell.value = replaceStart(cell.value, 'BМ-Инфор', 'ВМ-Инф')
        } else if (cell.value.startsWith('BМ-Мат')) {
            cell.value = replaceStart(cell.value, 'BМ-Мат', 'ВМ-Мат')
        } else if (cell.value.startsWith('BМ-МатИнф')) {
            cell.value = replaceStart(cell.value, 'BМ-МатИнф', 'ВМ-МатИнф')
        } else if (cell.value.startsWith('BМ-МиЭк')) {
            cell.value = replaceStart(cell.value, 'BМ-МиЭк', 'ВМ-МиЭк')
        } else if (cell.value.startsWith('BМ-ПИЭ')) {
            cell.value = replaceStart(cell.value, 'BМ-ПИЭ', 'ВМ-ПИЭ')
        } else if (cell.value.startsWith('BМ-Прог')) {
            cell.value = replaceStart(cell.value, 'BМ-Прог', 'ВМ-Прог')
        } else if (cell.value.startsWith('BМ-ФизИ')) {
            cell.value = replaceStart(cell.value, 'BМ-ФизИ', 'ВМ-ФизИ')
        } else if (cell.value.startsWith('BМ-ФизМат')) {
            cell.value = replaceStart(cell.value, 'BМ-ФизМат', 'ВМ-ФИЗМАТ')
        } else if (cell.value.startsWith('BМ-ФизМат')) {
            cell.value = replaceStart(cell.value, 'BМ-ФизМат', 'ВМ-ФИЗМАТ')
        } else if (cell.value.startsWith('BН-ДиН')) {
            cell.value = replaceStart(cell.value, 'BН-ДиН', 'ВН-ДиНа')
        } else if (cell.value.startsWith('BН-НиИя')) {
            cell.value = replaceStart(cell.value, 'BН-НиИя', 'ВН-НачИЯ')
        } else if (cell.value.startsWith('BН-')) {
            cell.value = replaceStart(cell.value, 'BН-', 'ВН-')
        } else if (cell.value.startsWith('BП-ПиПсх')) {
            ///
        } else if (cell.value.startsWith('BП-')) {
            cell.value = replaceStart(cell.value, 'BП-', 'ВП-')
        } else if (cell.value.startsWith('BТ-ХимиБ')) {
            ///
        } else if (cell.value.startsWith('BТ-ЭкТ')) {
            cell.value = replaceStart(cell.value, 'BТ-ЭкТ', 'ВТ-ЭиТ')
        } else if (cell.value.startsWith('BТ-')) {
            cell.value = replaceStart(cell.value, 'BТ-', 'ВТ-')
        } else if (cell.value.startsWith('MИ-')) {
            cell.value = replaceStart(cell.value, 'MИ-', 'МИ-')
        } else if (cell.value.startsWith('MИ-')) {
            cell.value = replaceStart(cell.value, 'MИ-', 'МИ-')
        } else if (cell.value.startsWith('MЛЯ-')) {
            cell.value = replaceStart(cell.value, 'MЛЯ-', 'МЛЯ-')
        } else if (cell.value.startsWith('MМ-')) {
            cell.value = replaceStart(cell.value, 'MМ-', 'ММ-')
        } else if (cell.value.startsWith('MН-')) {
            cell.value = replaceStart(cell.value, 'MН-', 'МН-')
        } else if (cell.value.startsWith('MП-')) {
            cell.value = replaceStart(cell.value, 'MП-', 'МП-')
        } else if (cell.value.startsWith('MТ-')) {
            cell.value = replaceStart(cell.value, 'MТ-', 'МТ-')
        } else if (cell.value.startsWith('SZBМ-')) {
            cell.value = replaceStart(cell.value, 'SZBМ-', 'SZBM-')
        } else if (cell.value.startsWith('SZBН-')) {
            cell.value = replaceStart(cell.value, 'ZSBH-', 'ZSBH-')
        } else if (cell.value.startsWith('SZBП-Лог-2-')) {
            cell.value = replaceStart(cell.value, 'SZBП-Лог-2-', 'ZSВП-Лог-2-')
        } else if (cell.value.startsWith('SZBП-Лог-3-1')) {
            cell.value = replaceStart(cell.value, 'SZBП-Лог-3-1', 'ZSВП-Лог-3-1')
        } else if (cell.value.startsWith('SZBП-Лог-3-2')) {
            cell.value = replaceStart(cell.value, 'SZBП-Лог-3-2', 'ZSBП-Лог-3-2')
        } else if (cell.value.startsWith('SZBП-Лог')) {
            cell.value = replaceStart(cell.value, 'SZBП-Лог', 'ZSBП-Лог')
        } else if (cell.value.startsWith('SZBП-ПСП-2-1')) {
            cell.value = replaceStart(cell.value, 'SZBП-ПСП-2-1', 'ZSВП-ПСП-2-1')
        } else if (cell.value.startsWith('SZBП-ПСП-3-1')) {
            cell.value = replaceStart(cell.value, 'SZBП-ПСП-3-1', 'ZSВП-ПСП-3-1')
        } else if (cell.value.startsWith('SZBП-ПСП-4-1')) {
            cell.value = replaceStart(cell.value, 'SZBП-ПСП-4-1', 'ZSBП-ПСП-4-1')
        } else if (cell.value.startsWith('SZBП-ПФК-2-1')) {
            cell.value = replaceStart(cell.value, 'SZBП-ПФК-2-1', 'ZSВП-ПФК-2-1')
        } else if (cell.value.startsWith('SZBП-ПФК-3-1')) {
            cell.value = replaceStart(cell.value, 'SZBП-ПФК-3-1', 'ZSBП-ПФК-3-1')
        } else if (cell.value.startsWith('SZBП-ПФК-4-1')) {
            cell.value = replaceStart(cell.value, 'SZBП-ПФК-4-1', 'ZSBП-ПФК-4-1')
        } else if (cell.value.startsWith('ZBИ-')) {
            cell.value = replaceStart(cell.value, 'ZBИ-', 'ZВИ-')
        } else if (cell.value.startsWith('ZBЛЯ-')) {
            //
        } else if (cell.value.startsWith('ZBМ-')) {
            cell.value = replaceStart(cell.value, 'ZBМ-', 'ZBM-')
        } else if (cell.value.startsWith('ZBН-')) {
            cell.value = replaceStart(cell.value, 'ZBН-', 'ZBH-')
        } else if (cell.value.startsWith('ZBП-ПСП-3-1')) {
            cell.value = replaceStart(cell.value, 'ZBП-ПСП-3-1', 'ZВП-ПСП-3-1')
        } else if (cell.value.startsWith('ZBП-ПСП-4-1')) {
            cell.value = replaceStart(cell.value, 'ZBП-ПСП-4-1', 'ZВП-ПСП-4-1')
        } else if (cell.value.startsWith('ZBП-ПСП-2-1')) {
            cell.value = replaceStart(cell.value, 'ZBП-ПСП-2-1', 'ZВП-ПСП-2-1')
        } else if (cell.value.startsWith('ZBП-ПСП-5-1')) {
            cell.value = replaceStart(cell.value, 'ZBП-ПСП-5-1', 'ZВП-ПСП-5-1')
        } else if (cell.value.startsWith('ZBП-')) {
            // 
        } else if (cell.value.startsWith('ZBТ-ДизИ')) {
            cell.value = replaceStart(cell.value, 'ZBТ-ДизИ', 'ZBT-Диз')
        } else if (cell.value.startsWith('ZBТ-')) {
            cell.value = replaceStart(cell.value, 'ZBТ-', 'ZBT-')
        } else if (cell.value.startsWith('ZMИ-СИО-')) {
            cell.value = replaceStart(cell.value, 'ZMИ-СИО-', 'ZМИ-СИО-')
        } else if (cell.value.startsWith('ZMИ-')) {
            // 
        } else if (cell.value.startsWith('ZMЛЯ-Рус-')) {

        } else if (cell.value.startsWith('ZMЛЯ-')) {
            cell.value = replaceStart(cell.value, 'ZMЛЯ-', 'ZМЛЯ-')
        } else if (cell.value.startsWith('ZMМ-')) {
            cell.value = replaceStart(cell.value, 'ZMМ-', 'ZMM-')
        } else if (cell.value.startsWith('ZMН-')) {
            cell.value = replaceStart(cell.value, 'ZMН-', 'ZМН-')
        } else if (cell.value.startsWith('ZMП-')) {
            cell.value = replaceStart(cell.value, 'ZMП-', 'ZМП-')
        } else if (cell.value.startsWith('ZMТ-ГФК-3-1')) {
            cell.value = replaceStart(cell.value, 'ZMТ-ГФК-3-1', 'ZMT- ГФК-3-1')
        } else if (cell.value.startsWith('ZMТ-')) {
            cell.value = replaceStart(cell.value, 'ZMТ-', 'ZMT-')
        }



        groups.add(cell.value)

    })
    await workbook.xlsx.writeFile(path.join(__dirname, 'fixedList.xlsx'))
    // for (let i = 3; i < rows.length; i++) {
    //     const rowData = rows[i].values;
    //     const [, , fio, , facultyName, groupName] = rowData;
    //     const [lastName, firstName, middleName] = fio.split(' ')
    //     if (groupName.startsWith('BИ-ИиГ')) {
    //         let newGroupName = 'ВИ-ИГ' + groupName.slice(6)
    //     }
    //     groups.add(groupName)
    // }
    Array.from(groups).forEach((g) => {
        console.log(g, g.split('').map((char) => char.charCodeAt()).join` `)
    })
}
start()