const Modelo = require('./ModeloTabelaFilmes')

module.exports = {
    listar () {
        return Modelo.findAll()
    },
    inserir (filme) {
        return Modelo.create(filme)
    }
}