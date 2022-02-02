const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

const colunas = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    saldo: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    tipo: {
        type: Sequelize.ENUM('comum', 'vip'),
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'dtCriacao',
    updatedAt: 'dtAtualizacao',
    version: 'vesao'
}

module.exports = instancia.define('usuario', colunas, opcoes)