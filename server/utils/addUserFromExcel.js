const {User, Groups, User_info, Faculty} = require('../models/models')
const Excel = require('exceljs')
const path = require('path')

async function addUserFromExcel() {

    const filePath = path.join(__dirname, '..', '/studentList/fixedList.xlsx');
    const workbook = new Excel.Workbook();
    workbook.xlsx.readFile(filePath)
        .then(async () => {
            const worksheet = workbook.getWorksheet('Students');
            const rows = worksheet.getRows(0, 5741)
            for (let i = 3; i < rows.length; i++) {
                const rowData = rows[i].values;
                const [, , fio, , facultyName, groupName] = rowData;
                const [lastName, firstName, middleName] = fio.split(' ')
                const [faculty] = await Faculty.findOrCreate({
                    where: {
                        name: facultyName
                    }
                })
                const [group] = await Groups.findOrCreate({
                    where: {
                        name: groupName
                    },
                    defaults: {
                        FacultyId: faculty.id
                    }
                })
                const userInfo = await User_info.create({
                    last_name: lastName,
                    first_name: firstName,
                    middle_name: middleName || null
                })
                const user = await User.create({
                    UserInfoId: userInfo.id,
                    GroupId: group.id
                })
            }
        })
}

module.exports = addUserFromExcel