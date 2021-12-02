const roteador = require('express').Router()
const TabelaFilme = require('./TabelaFilme')
const Filme = require('./Filme')

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFilme.listar()
    
    res.send(JSON.stringify(resultados))
})

roteador.post('/', async (req, res) => {
    const dadosRecebidos = req.body
    const filme = new Filme(dadosRecebidos)
    await filme.criar()
    res.send(
        JSON.stringify(filme)
    )
})

module.exports = roteador