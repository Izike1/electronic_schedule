const { User, User_info, Departament, Auth } = require('../models/models');
const { rusToLogin } = require('./rusToLatin')
const Excel = require('exceljs');

async function processTeachersExcelFile(filePath) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Teachers');
    const arr = []
    worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
        arr.push({ row, rowNumber })
    })
    for (let { row, rowNumber } of arr) {
        if (rowNumber < 3) continue;

        const rowData = row.values;
        const [, , fio, departamentName] = rowData;
        const [lastName, firstName, middleName] = fio.split(' ');
        const password = Math.floor(1000000 + Math.random() * 9000000).toString();
        const rusLogin = rusToLogin(lastName + '_' + firstName)

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

        const createdAuth = await Auth.create({
            login: rusLogin,
            password: password,
            role: 'teacher'
        });

        await User.create({
            AuthId: createdAuth.id,
            DepartamentId: departament.id,
            UserInfoId: userInfo.id
        });
    }
}

module.exports = processTeachersExcelFile;
