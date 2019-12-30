const oracledb = require('oracledb')

module.exports = con => {
    return {

        ListarCategorias() {
            return con.execute("SELECT * FROM ABZ_CATEGORIA_COPA");
        },
  
        ListarCategoria(categoria) {
            return new Promise((resolve, reject) => {

                con.execute("SELECT * FROM ABZ_CATEGORIA_COPA WHERE ID_CATEGORIA = :categoria",

                    {
                        categoria: { type: oracledb.STRING, val: categoria, dir: oracledb.BIND_IN}

                    }).then(result => resolve(result)).catch(err => reject(err))
            })

        },

        AtualizarCategoria(params = {}) {
            return con.execute("UPDATE ABZ_CATEGORIA_COPA SET DESCRICAO = :DESCRICAO WHERE ID_CATEGORIA = :ID_CATEGORIA",
                params,  { autoCommit: true });
        },

        InserirCategoria(params = {}) {
            return con.execute('INSERT INTO ABZ_CATEGORIA_COPA (ID_CATEGORIA, DESCRICAO) values (ID_CATEGORIA.nextval, :DESCRICAO)',
                params, { autoCommit: true });
        },

  
        DeletarCategoria(categoria) {
            return new Promise((resolve, reject) => {

                con.execute("DELETE FROM ABZ_CATEGORIA_COPA WHERE ID_CATEGORIA = :categoria",
                    { categoria: {type: oracledb.STRING, val: categoria, dir: oracledb.BIND_IN } },
                     { autoCommit: true } ).then(result => resolve(result)).catch(err => reject(err))
            })

        }
        
        
    }
}