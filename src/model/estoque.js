const oracledb = require('oracledb')

module.exports = con => {
    return {

        ListarEstoques() {
            return con.execute("SELECT a.ID_ESTOQUE, b.descricao as PRODUTO, a.TIPO, TO_CHAR(a.DATA_ENTRADA, 'DD/MM/YYYY HH24:MI:SS') AS DATA_ENTRADA, a.QT_ENTRADA, TO_CHAR(a.DATA_SAIDA, 'DD/MM/YYYY HH24:MI:SS') AS DATA_SAIDA, a.QT_SAIDA,  a.NOTA_FISCAL FROM ABZ_ESTOQUE_COPA a, ABZ_PRODUTO_COPA b WHERE a.id_produto = b.id_produto");
        },
  
        ListarEstoque(estoque) {
            return new Promise((resolve, reject) => {

                con.execute("SELECT * FROM ABZ_ESTOQUE_COPA WHERE ID_ESTOQUE = :estoque",

                    {
                        estoque: { type: oracledb.STRING, val: estoque, dir: oracledb.BIND_IN}

                    }).then(result => resolve(result)).catch(err => reject(err))
            })

        },

        InserirEntrada(params = {}) {
            return con.execute("INSERT INTO ABZ_ESTOQUE_COPA (ID_ESTOQUE, TIPO, DATA_ENTRADA, DATA_SAIDA, QT_ENTRADA, QT_SAIDA, NOTA_FISCAL, ID_PRODUTO, VL_UNIT) values (ID_ESTOQUE.NEXTVAL, 'E', sysdate, NULL, :QT_ENTRADA, NULL, :NOTA_FISCAL, :ID_PRODUTO, :VL_UNIT)",
                params, { autoCommit: true });
        },

        InserirEntrada2(params = {}) {
            return con.execute("INSERT INTO ABZ_ENTRADA_COPA (ID_ENTRADA, NOTA_FISCAL, DATA, ID_PRODUTO) VALUES (ID_ENTRADA.NEXTVAL, :NOTA_FISCAL, SYSDATE, :ID_PRODUTO)",
                params, { autoCommit: true });
        },


        InserirSaida(params = {}) {
            return con.execute("INSERT INTO ABZ_ESTOQUE_COPA (ID_ESTOQUE, TIPO, DATA_ENTRADA, DATA_SAIDA, QT_ENTRADA, QT_SAIDA, NOTA_FISCAL, ID_PRODUTO) values (ID_ESTOQUE.NEXTVAL, 'S', NULL, SYSDATE, NULL, :QT_SAIDA, :NOTA_FISCAL, :ID_PRODUTO)",
                params, { autoCommit: true });
        },

        DeletarEstoque(estoque) {
            return new Promise((resolve, reject) => {

                con.execute("DELETE FROM ABZ_ESTOQUE_COPA WHERE ID_ENTRADA = :estoque",
                    { estoque: {type: oracledb.STRING, val: estoque, dir: oracledb.BIND_IN } },
                     { autoCommit: true } ).then(result => resolve(result)).catch(err => reject(err))
            })

        }
        
    }
}