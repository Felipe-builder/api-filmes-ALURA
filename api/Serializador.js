const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const jsontoxml = require('jsontoxml')

class Serializador {

    json(dados) {
        return JSON.stringify(dados)
    }

    xml(dados){
        let tag = this.tagSingular

        if (Array.isArray(dados)){
            tag = this.tagPlural
            dados = dados.map(item => {
                return {
                    [this.tagSingular]: item
                }
            })
        }
        return jsontoxml({[tag] : dados})
    }

    serializar(dados){
        dados = this.filtrar(dados)

        if (this.contentType === 'application/json') {
            return this.json(dados)
        }

        if (this.contentType === 'application/xml') {
            return this.xml(dados)
        }

        throw new ValorNaoSuportado(this.contentType)
    }

    filtrarObjeto(dados) {
        const novoObjeto = {}
        this.camposPublicos.forEach((campo) => {
            if(dados.hasOwnProperty(campo)) {
                novoObjeto[campo] = dados[campo]
            }
        })

        return novoObjeto
    }

    filtrar(dados){
        if(Array.isArray(dados)){
            dados = dados.map(item => {
                return this.filtrarObjeto(item)
            })           
        } else {
            dados = this.filtrarObjeto(dados)
        }

        return dados
    }
}

class SerializadorFilme extends Serializador {
    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
            'titulo',
            'dtLancamento',
            'genero'
        ].concat(camposExtras || [])
        this.tagSingular = 'filme'
        this.tagPlural = 'filmes'
    }
}

class SerializadorUsuario extends Serializador {
    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
            'nome',
            'saldo',
            'tipo'
        ].concat(camposExtras || [])
        this.tagSingular = 'usuario'
        this.tagPlural = 'usuarios'
    }
}

class SerializadorErro extends Serializador {
    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
            'mensagem'
        ].concat(camposExtras || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

module.exports = {
    Serializador: Serializador,
    formatosAceitos: ['application/json', 'application/xml'],
    SerializadorFilme: SerializadorFilme,
    SerializadorUsuario: SerializadorUsuario,
    SerializadorErro: SerializadorErro
}