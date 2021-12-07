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

roteador.get('/:idFilme', async (req, res) => {
    try {
        const id = req.params.idFilme
        const filme = new Filme({ id: id })
        await filme.carregar()
        res.send(
            JSON.stringify(filme)
        )
    } catch (erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.put('/:idFilme', async (req, res) => {
    try {
        const id = req.params.idFilme
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const filme = new Filme(dados)
        await filme.atualizar()
        res.end()
    } catch (erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
    
})
module.exports = roteador