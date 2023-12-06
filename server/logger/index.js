const fs = require('fs');
const path = require('path');

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

    // Очистка файлов старше 5 месяцев
    fs.readdir(path.join(__dirname, logDirectory), (err, files) => {
        if (err) {
            console.error('Ошибка при чтении содержимого папки логов:', err);
        } else {
            files.forEach((file) => {
                const filePath = path.join(__dirname, logDirectory, file);
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.error('Ошибка при получении информации о файле:', err);
                    } else {
                        const fileCreationDate = new Date(stats.birthtime);
                        const diffInMilliseconds = currentDay - fileCreationDate;
                        const diffInMonths = diffInMilliseconds / (1000 * 60 * 60 * 24 * 30.5);

                        if (diffInMonths >= 5) {
                            fs.unlink(filePath, (err) => {
                                if (err) {
                                    console.error('Ошибка при удалении файла логов:', err);
                                } else {
                                    console.log('Файл логов успешно удален:', filePath);
                                }
                            });
                        }
                    }
                });
            });
        }
    });
}

module.exports = { writeToLogFile };
