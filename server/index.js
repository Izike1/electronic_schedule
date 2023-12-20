require('dotenv').config();
const https = require('https');
const fs = require('fs')
const privateKey = fs.readFileSync('./https/key.pem', 'utf8');
const certificate = fs.readFileSync('./https/cert.pem', 'utf8');
const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const models = require('./models/models.js');
const cors = require('cors');
const router = require('./routers/index')
const errorMiddleware = require('./middleware/ErrorHandlingMiddleware')
const PORT = process.env.PORT || 5000;
const credentials = { key: privateKey, cert: certificate };


const app = express();

app.use(cors(function (req, callback) {
    let corsOptions;
    if (['http://localhost:3000', 'http://192.168.0.16:3000', 'https://localhost:3000', 'https://192.168.0.16:3000'].includes(req.header('Origin'))) {
        console.log(req.url)
        corsOptions = {
            origin: true,
            credentials: true
        }

    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    let httpsServer = https.createServer(credentials, app);
    httpsServer.listen(PORT, () => {
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