const { User, Groups, User_info, Faculty } = require('../models/models');
const Excel = require('exceljs');

async function processStudentsExcelFile(filePath) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Students');
    const arr = []
    worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
        arr.push({ row, rowNumber })
    })
    for (let { row, rowNumber } of arr) {
        if (rowNumber < 3) continue;

        const rowData = row.values;
        const [, , fio, , facultyName, groupName] = rowData;
        const [lastName, firstName, middleName] = fio.split(' ');

        const [faculty] = await Faculty.findOrCreate({
            where: {
                name: facultyName,
            },
        });

        const [group] = await Groups.findOrCreate({
            where: {
                name: groupName,
            },
            defaults: {
                FacultyId: faculty.id,
            },
        });

        const userInfo = await User_info.create({
            last_name: lastName,
            first_name: firstName,
            middle_name: middleName || null,
        });

        await User.create({
            UserInfoId: userInfo.id,
            GroupId: group.id,
        });
    }
}

module.exports = processStudentsExcelFile;
