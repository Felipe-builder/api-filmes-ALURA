const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')

app.use(bodyParser.json())

const roteadorFilmes = require('./rotas/filmes')
app.use('/api/filmes', roteadorFilmes)

const roteadorUsuarios = require('./rotas/usuarios')
app.use('/api/usuarios', roteadorUsuarios)

app.use((erro, req, res, proximo) => {
    let status = 400
    if (erro instanceof NaoEncontrado) {
        status = 404
    } 

    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400
    }

    res.status(status)
    res.send(
        JSON.stringify({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen(config.get('api.porta'), () => console.log('API em funcionamento!'))