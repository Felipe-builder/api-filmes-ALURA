const ModeloTabelaFilme = require('../rotas/filmes/ModeloTabelaFilmes')
const ModeloTabelaUsuario = require('../rotas/usuarios/ModeloTabelaUsuario')

ModeloTabelaUsuario
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)
    