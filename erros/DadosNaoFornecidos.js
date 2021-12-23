class DadosNaoFornecidos extends Error {
    constructor() {
        super('Dados não foram fornecidos para atualização!')
        this.name = 'DadosNaoFornecidos'
        this.idErro = 2
    }
}

module.exports = DadosNaoFornecidos