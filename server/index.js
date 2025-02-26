require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')

let {CONNECTION_STRING, SESSION_SECRET}=process.env
const SERVER_PORT = 4001

const app = express()
app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected bayybee')
})

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)

app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} playing some classic grunge`))


