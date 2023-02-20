require('dotenv').config({path: `${__dirname}/.env`})
const express = require('express')
const cors = require('cors')
const database = require('./database')
const models = require('./models/models')
const router = require('./routes/index')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(fileUpload({createParentPath: true, limits: {fileSize: 5*1024*1024}, abortOnLimit: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use('/static', express.static(__dirname + '/static'));
app.use('/api', router)


const start = async () => {
    try {
        await database.authenticate()
        await database.sync()
        app.listen(PORT, () => console.log(`API Started here: localhost:${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()