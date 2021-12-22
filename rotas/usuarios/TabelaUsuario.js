const Modelo = require('./ModeloTabelaUsuario')

module.exports = {
    listar() {
        return Modelo.findAll()
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
            throw new Error('Usuario não encontrado')
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
    }
}