const NaoEncontrado = require('../../erros/NaoEncontrado')
const Modelo = require('./ModeloTabelaUsuario')

module.exports = {
    listar() {
        return Modelo.findAll({ raw: true })
    },
    criar(usuario) {
        return Modelo.create(usuario)
    },
    async buscarPorId(id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new NaoEncontrado('Usuario')
        }
        return encontrado
    },
    atualizar(id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: {id: id}
            }
        )
    },
    remover(id) {
        return Modelo.destroy({
            where: {
                id: id
            }
        })
    }
}