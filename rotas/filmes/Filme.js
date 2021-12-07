const TabelaFilme = require('./TabelaFilme')
const moment = require('moment')

class Filme {
    constructor ({ id, titulo, dtLancamento, genero, dtRegistro, dtAtualizacao, versao }) {
        this.id = id
        this.titulo = titulo
        this.dtLancamento = dtLancamento
        this.genero = genero
        this.dtRegistro = dtRegistro
        this.dtAtualizacao = dtAtualizacao
        this.versao = versao
    }

    async criar () {
        const resultado = await TabelaFilme.inserir({
            titulo: this.titulo,
            dtLancamento: moment(this.dtLancamento, "DD/MM/YYYY").format(),
            genero: this.genero
        })

        this.id = resultado.id
        this.dtRegistro = resultado.dtRegistro
        this.dtAtualizacao = resultado.dtAtualizacao
        this.versao = resultado.versao
    }

    async carregar() {
        const encontrado = await TabelaFilme.pegarPorId(this.id)
        this.titulo = encontrado.titulo
        this.dtLancamento = encontrado.dtLancamento
        this.genero = encontrado.genero
        this.dtRegistro = encontrado.dtRegistro
        this.dtAtualizacao = encontrado.dtAtualizacao
        this.versao = encontrado.versao
    }

    async atualizar() {
        await TabelaFilme.pegarPorId(this.id)
        const campos = ['titulo', 'dtLancamento', 'genero']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]
            if(typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new Error('Não foram fornecidos dados para atualizar!')
        }

        await TabelaFilme.atualizar(this.id, dadosParaAtualizar)

    }
}


module.exports = Filme