const Modelo = require('./ModeloTabelaFilmes')

module.exports = {
    listar () {
        return Modelo.findAll()
    },
    inserir (filme) {
        return Modelo.create(filme)
    },
    async pegarPorId(id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new Error('Filme não encontrado!')
        }

        return encontrado
    },
    atualizar(id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id }
            }
        )
    }
}