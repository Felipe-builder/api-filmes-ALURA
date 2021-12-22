const TabelaUsuario = require('./TabelaUsuario')

class Usuario {
    constructor({ id, nome, email, saldo, tipo, dtCriacao, dtAtualizacao, versao}) {
        this.id = id
        this.nome = nome
        this.email = email
        this.saldo = saldo
        this.tipo = tipo
        this.dtCriacao = dtCriacao
        this.dtAtualizacao = dtAtualizacao
        this.versao = versao
    }

    async criar() {
        const resultado = await TabelaUsuario.criar({
            nome: this.nome,
            email: this.email,
            saldo: this.saldo,
            tipo: this.tipo
        })

        this.id = resultado.id
        this.dtCriacao = resultado.dtCriacao
        this.dtAtualizacao = resultado.dtAtualizacao
        this.versao = resultado.versao

        return resultado
    }

    async buscarPorId() {
        const encontrado = await TabelaUsuario.buscarPorId(this.id)
        this.nome = encontrado.nome
        this.email = encontrado.email
        this.saldo = encontrado.saldo
        this.tipo = encontrado.tipo
        this.dtCriacao = encontrado.dtCriacao
        this.dtAtualizacao = encontrado.dtAtualizacao
        this.versao = encontrado.versao
    }

    async atualizar() {
        await TabelaUsuario.buscarPorId(this.id)
        const campos = ['nome', 'email', 'saldo', 'tipo']
        const dadosParaAtualizar = {}
        campos.forEach((campo) => {
            const valor = this[campo]
            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }

            if (Object.keys(dadosParaAtualizar).length === 0) {
                throw new Error('Não foram fornecidos dados para atualizar!')
            }

            TabelaUsuario.atualizar(this.id, dadosParaAtualizar)
        })
    }
}

module.exports = Usuario 