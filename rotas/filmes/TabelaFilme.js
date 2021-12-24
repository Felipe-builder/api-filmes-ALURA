const NaoEncontrado = require('../../erros/NaoEncontrado')
const Modelo = require('./ModeloTabelaFilmes')

module.exports = {
    listar () {
        return Modelo.findAll({ raw: true })
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
            throw new NaoEncontrado('Filme')
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
    },
    remover(id) {
        return Modelo.destroy({
            where: { id: id }
        })
    }
}