const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const cors = require('cors')

const gameController = require('./games/GameController')
const userController = require('./users/UserController')

const Game = require('./games/Game')
const User = require('./users/User')

app.use(cors())

//body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso")
    }).catch((err) => {
        console.log(err)
    })

// carregando rotas do controller
app.use("/", gameController)
app.use("/", userController)

app.listen(3033, () => {
    console.log("API rodando")
})