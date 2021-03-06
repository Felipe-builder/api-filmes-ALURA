const roteador = require('express').Router()
const { SerializadorUsuario } = require('../../Serializador')
const TabelaUsuario = require('./TabelaUsuario')
const Usuario = require('./Usuario')



roteador.get('/', async (req, res) => {
    const resultados = await TabelaUsuario.listar()
    res.status(200)
    const serializador = new SerializadorUsuario(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (req, res, proximo) => {
    try {
        const dadosRecebidos = req.body
        const  usuario = new Usuario(dadosRecebidos)
        const resultados = await usuario.criar()
        res.status(201)
        const serializador = new SerializadorUsuario(
            res.getHeader('Content-Type')
        )
        res.send(
            JSON.stringify(resultados)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.get('/:idUsuario', async (req, res, proximo) => {
    try {
        const id = req.params.idUsuario
        const usuario = new Usuario({id: id})
        await usuario.buscarPorId()
        res.status(200)
        const serializador = new SerializadorUsuario(
            res.getHeader('Content-Type'),
            ['email', 'dtCriacao', 'dtAtualizacao', 'versao']
        )
        res.send(
            serializador.serializar(usuario)
        )
    } catch(erro) {
        proximo(erro)
    }
})

roteador.put('/:idUsuario', async (req, res, proximo) => {
    try {
        const id = req.params.idUsuario
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const usuario = new Usuario(dados)
        await usuario.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
}) 

roteador.delete('/:idUsuario',async (req, res, proximo) => {
    try {
        const id = req.params.idUsuario
        const usuario = new Usuario({ id: id})
        await usuario.buscarPorId()
        await usuario.remover()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    } 
})

module.exports = roteador
