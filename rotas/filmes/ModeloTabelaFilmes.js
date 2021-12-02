const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')
const colunas = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dtLancamento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    genero: {
        type: Sequelize.ENUM('Ação', 'Drama', 'Romance', 'Fantasia', 'Guerra', 'Religião', 'Comédia', 'Infantil', 'Ficção Científica', 'Luta', 'Terror'),
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'filmes',
    timestamps: true,
    createdAt: 'dtRegistro',
    updatedAt: 'dtAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('filme', colunas, opcoes)