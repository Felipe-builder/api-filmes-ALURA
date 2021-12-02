const ModeloTabela = require('../rotas/filmes/ModeloTabelaFilmes')

ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)
    