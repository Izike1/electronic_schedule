require('dotenv').config();
const path = require('path')
const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const models = require('./models/models.js');
const cors = require('cors');
const router = require('./routers/index')
const errorMiddleware = require('./middleware/ErrorHandlingMiddleware')
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "*, Authorization,Content-Type");
    next();
});
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

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