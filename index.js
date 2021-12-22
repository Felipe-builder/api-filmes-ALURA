const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

app.use(bodyParser.json())

const roteadorFilmes = require('./rotas/filmes')
app.use('/api/filmes', roteadorFilmes)

const roteadorUsuarios = require('./rotas/usuarios')
app.use('/api/usuarios', roteadorUsuarios)

app.listen(config.get('api.porta'), () => console.log('API em funcionamento!'))