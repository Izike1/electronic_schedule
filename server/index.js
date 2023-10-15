require('dotenv').config();
const express = require('express');
const sequelize = require('./db');

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

start()
    .then(() => {
        console.log('Server started');
    })
    .catch((error) => {
        console.error('error', error);
    });