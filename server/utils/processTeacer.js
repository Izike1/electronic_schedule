const { User, User_info, Departament } = require('../models/models');
const Excel = require('exceljs');

async function processTeachersExcelFile(filePath) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Teachers');

    worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
        if (rowNumber < 4) return;

        const rowData = row.values;
        const [, , fio, , departamentName] = rowData;
        const [lastName, firstName, middleName] = fio.split(' ');

        const [departament] = await Departament.findOrCreate({
            where: {
                name: departamentName,
            },
        });

        const userInfo = await User_info.create({
            last_name: lastName,
            first_name: firstName,
            middle_name: middleName || null,
        });

        await User.create({
            UserInfoId: userInfo.id,
            DepartamentId: departament.id,
        });
    });
}

module.exports = processTeachersExcelFile;
