const multer = require('multer');
const fs = require('fs');
const processStudentsExcelFile = require('./processStudent');
const processTeachersExcelFile = require('./processTeachers');

const upload = multer({
    dest: '/tmp',
});

const uploadMiddleware = upload.single('excelFile');

module.exports = async (req, res) => {
    uploadMiddleware(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'Произошла ошибка при загрузке файла' });

        }

        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Необходимо отправить файл Excel' });
            }

            const { type } = req.body;
            if (!type || (type !== 'students' && type !== 'teachers')) {
                return res.status(400).json({ message: 'Необходимо указать корректный тип данных: students или teachers' });
            }

            const filePath = req.file.path;
            if (type === 'students') {
                await processStudentsExcelFile(filePath);
            } else if (type === 'teachers') {
                await processTeachersExcelFile(filePath);
            }

            fs.unlinkSync(filePath);

            res.status(201).json({ message: `Данные ${type === 'students' ? 'студентов' : 'преподавателей'} из файла Excel были успешно сохранены` });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Произошла ошибка при обработке файла Excel' });
        }
    });
};
