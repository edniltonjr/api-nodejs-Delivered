const oracledb = require('oracledb')

module.exports = con => {
    return {

        ListarProdutos() {
            return con.execute("SELECT pro.ID_PRODUTO, pro.DESCRICAO as PRODUTO, cat.DESCRICAO as CATEGORIA, forn.NOME as FORNECEDOR FROM abz_produto_copa pro, abz_categoria_copa cat, abz_fornec_copa forn WHERE pro.ID_CATEGORIA = cat.ID_CATEGORIA AND pro.ID_FORNECEDOR = forn.ID_FORNECEDOR");
        },
  
        ListarProduto(produto) {
            return new Promise((resolve, reject) => {

                con.execute("SELECT * FROM ABZ_PRODUTO_COPA WHERE ID_PRODUTO = :produto",

                    {
                        produto: { type: oracledb.STRING, val: produto, dir: oracledb.BIND_IN}

                    }).then(result => resolve(result)).catch(err => reject(err))
            })

        },

        AtualizarProduto(params = {}) {
            return con.execute("UPDATE ABZ_PRODUTO_COPA SET DESCRICAO = :DESCRICAO, ID_CATEGORIA = :ID_CATEGORIA, ID_FORNECEDOR = :ID_FORNECEDOR  WHERE ID_PRODUTO = :ID_PRODUTO",
                params,  { autoCommit: true });
        },

        InserirProduto(params = {}) {
            return con.execute('INSERT INTO ABZ_PRODUTO_COPA (ID_PRODUTO, DESCRICAO, ID_CATEGORIA, ID_FORNECEDOR) values (ID_PRODUTO.nextval, :DESCRICAO, :ID_CATEGORIA, :ID_FORNECEDOR)',
                params, { autoCommit: true });
        },

  
        DeletarProduto(produto) {
            return new Promise((resolve, reject) => {

                con.execute("DELETE FROM ABZ_PRODUTO_COPA WHERE ID_PRODUTO = :produto",
                    { produto: {type: oracledb.STRING, val: produto, dir: oracledb.BIND_IN } },
                     { autoCommit: true } ).then(result => resolve(result)).catch(err => reject(err))
            })

        }
        
        
    }
}