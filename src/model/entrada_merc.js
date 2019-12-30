const oracledb = require('oracledb')

module.exports = con => {
    return {

        ListarEntradas() {
            return con.execute("SELECT ent.id_entrada, ent.nota_fiscal, TO_CHAR(ent.data, 'DD/MM/YYYY HH24:MI:SS') AS DATA, forn.nome as FORNECEDOR, prod.descricao as PRODUTO FROM ABZ_ENTRADA_COPA ent, abz_fornec_copa forn, abz_produto_copa prod where ent.id_fornecedor = forn.id_fornecedor and prod.id_produto = ent.id_produto");
        },
  
        ListarEntrada(entrada) {
            return new Promise((resolve, reject) => {

                con.execute("SELECT * FROM ABZ_ENTRADA_COPA WHERE ID_ENTRADA = :entrada",

                    {
                        entrada: { type: oracledb.STRING, val: entrada, dir: oracledb.BIND_IN}

                    }).then(result => resolve(result)).catch(err => reject(err))
            })

        },


        InserirEntrada(params = {}) {
            return con.execute('INSERT INTO ABZ_ENTRADA_COPA (ID_ENTRADA, NOTA_FISCAL, DATA, ID_FORNECEDOR, ID_PRODUTO) values (ID_ENTRADA.NEXTVAL, :NOTA_FISCAL, SYSDATE, :ID_FORNECEDOR, :ID_PRODUTO)',
                params, { autoCommit: true });
        },

  
        DeletarEntrada(entrada) {
            return new Promise((resolve, reject) => {

                con.execute("DELETE FROM ABZ_ENTRADA_COPA WHERE ID_FORNECEDOR = :entrada",
                    { entrada: {type: oracledb.STRING, val: entrada, dir: oracledb.BIND_IN } },
                     { autoCommit: true } ).then(result => resolve(result)).catch(err => reject(err))
            })

        }
        
        
    }
}