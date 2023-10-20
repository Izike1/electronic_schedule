require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const models = require('./models/models.js');
const cors = require('cors');
const router = require('./routers/index')

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)

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