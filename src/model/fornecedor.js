const oracledb = require('oracledb')

module.exports = con => {
    return {

        ListarFornecedores() {
            return con.execute("SELECT * FROM ABZ_FORNEC_COPA");
        },
  
        ListarFornecedor(fornecedor) {
            return new Promise((resolve, reject) => {

                con.execute("SELECT * FROM ABZ_FORNEC_COPA WHERE ID_FORNECEDOR = :fornecedor",

                    {
                        fornecedor: { type: oracledb.STRING, val: fornecedor, dir: oracledb.BIND_IN}

                    }).then(result => resolve(result)).catch(err => reject(err))
            })

        },

        AtualizarFornecedor(params = {}) {
            return con.execute("UPDATE ABZ_FORNEC_COPA SET NOME = :NOME, CGC = :CGC WHERE ID_FORNECEDOR = :ID_FORNECEDOR",
                params,  { autoCommit: true });
        },

        InserirFornecedor(params = {}) {
            return con.execute('INSERT INTO ABZ_FORNEC_COPA (ID_FORNECEDOR, NOME, CGC) values (ID_FORNECEDOR.nextval, :NOME, :CGC)',
                params, { autoCommit: true });
        },

  
        DeletarFornecedor(fornecedor) {
            return new Promise((resolve, reject) => {

                con.execute("DELETE FROM ABZ_FORNEC_COPA WHERE ID_FORNECEDOR = :fornecedor",
                    { fornecedor: {type: oracledb.STRING, val: fornecedor, dir: oracledb.BIND_IN } },
                     { autoCommit: true } ).then(result => resolve(result)).catch(err => reject(err))
            })

        }
        
        
    }
}