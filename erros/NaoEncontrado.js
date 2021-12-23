class NaoEncontrado extends Error {
    constructor(nomeErro) {
        const mensagem = `${nomeErro} não foi encontrado!` 
        super(mensagem)
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado