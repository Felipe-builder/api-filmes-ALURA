const roteador = require('express').Router()
const TabelaFilme = require('./TabelaFilme')
const Filme = require('./Filme')
const SerializadorFilme = require('../../Serializador').SerializadorFilme

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFilme.listar()
    res.status(200)
    const serializador = new SerializadorFilme(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (req, res, proximo) => {
    try {
        const dadosRecebidos = req.body
        const filme = new Filme(dadosRecebidos)
        await filme.criar()
        res.status(201)
        const serializador = new SerializadorFilme(
            res.getHeader('Content-Type')
        )
        res.send(
            serializador.serializar(filme)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.get('/:idFilme', async (req, res, proximo) => {
    try {
        const id = req.params.idFilme
        const filme = new Filme({ id: id })
        await filme.carregar()
        res.status(200)
        const serializador = new SerializadorFilme(
            res.getHeader('Content-Type'),
            ['dtRegistro', 'dtAtualizacao', 'versao']

        )
        res.send(
            serializador.serializar(filme)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/:idFilme', async (req, res, proximo) => {
    try {
        const id = req.params.idFilme
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const filme = new Filme(dados)
        await filme.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
    
})

roteador.delete('/:idFilme', async (req, res, proximo) => {
    try {
        const id = req.params.idFilme
        const filme = new Filme( { id: id })
        await filme.carregar()
        await filme.remover()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador