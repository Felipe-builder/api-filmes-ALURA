const TabelaFilme = require('./TabelaFilme')

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
            dtLancamento: this.dtLancamento,
            genero: this.genero
        })

        this.id = resultado.id
        this.dtRegistro = resultado.dtRegistro
        this.dtAtualizacao = resultado.dtAtualizacao
        this.versao = resultado.versao
    }
}


module.exports = Filme