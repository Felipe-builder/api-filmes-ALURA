const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos

app.use(bodyParser.json())

app.use((req, res, proximo) => {
    let formatoReq = req.header('Accept')

    if (formatoReq === '*/*') {
        formatoReq = 'application/json'
    }

    if (formatosAceitos.indexOf(formatoReq) === -1) {
        res.status(406)
        res.end()
        return
    }

    res.setHeader('Content-Type', formatoReq)
    proximo()
})

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

    if (erro instanceof ValorNaoSuportado) {
        status = 406
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