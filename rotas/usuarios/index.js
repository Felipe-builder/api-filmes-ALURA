const roteador = require('express').Router()
const TabelaUsuario = require('./TabelaUsuario')
const Usuario = require('./Usuario')

roteador.get('/', async (req, res) => {
    const resultados = await TabelaUsuario.listar()
    res.status(200)
    res.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body
        const  usuario = new Usuario(dadosRecebidos)
        const resultados = await usuario.criar()
        res.status(201)
        res.send(
            JSON.stringify(resultados)
        )
    } catch (erro) {
        res.status(400)
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.get('/:idUsuario', async (req, res) => {
    try {
        const id = req.params.idUsuario
        const usuario = new Usuario({id: id})
        await usuario.buscarPorId()
        res.status(200)
        res.send(
            JSON.stringify(usuario)
        )
    } catch(erro) {
        res.status(404)
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.put('/:idUsuario', async (req, res) => {
    try {
        const id = req.params.idUsuario
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const usuario = new Usuario(dados)
        await usuario.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        res.status(400)
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = roteador
