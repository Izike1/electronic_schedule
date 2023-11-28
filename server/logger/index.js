const fs = require('node:fs');
const path = require('node:path');

function writeToLogFile(logData) {
    const logDirectory = '../logs';
    const currentDay = new Date();
    const logFilename = `${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-${currentDay.getDate()}.log`;

    const logString = `${new Date().toISOString()} - ${logData}\n`;

    const logFilePath = path.join(__dirname, logDirectory, logFilename);

    fs.mkdir(path.join(__dirname, logDirectory), { recursive: true }, (err) => {
        if (err) {
            console.error('Ошибка при создании папки для логов:', err);
        } else {
            fs.appendFile(logFilePath, logString, (err) => {
                if (err) {
                    console.error('Ошибка при записи логов в файл:', err);
                } else {
                    console.log('Логи успешно записаны в файл:', logFilePath);
                }
            });
        }
    });

    // Очистка файла раз в 5 месяцев
    fs.stat(logFilePath, (err, stats) => {
        if (err) {
            console.error('Ошибка при получении информации о файле:', err);
        } else {
            const currentDate = new Date();
            const lastModifiedTime = stats.mtime;

            const diffInMonths = (currentDate.getFullYear() - lastModifiedTime.getFullYear()) * 12 +
                currentDate.getMonth() - lastModifiedTime.getMonth();

            if (diffInMonths >= 5) {
                fs.unlink(logFilePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении файла логов:', err);
                    } else {
                        console.log('Файл логов успешно удален.');
                    }
                });
            } else {
                console.log('Файл логов не требует очистки.');
            }
        }
    });
}

module.exports = { writeToLogFile };
