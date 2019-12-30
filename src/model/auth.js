const oracledb = require('oracledb')

module.exports = con => {
    return {
        login(login, senha) {
            return con.execute("select NOME_GUERRA, CODSETOR   from PCTABPR_BKP_TESTE WHERE ( NOME_GUERRA = :login1 OR MATRICULA" +
                " = :login2) AND DECRYPT(SENHABD, NOME_GUERRA) = :senha",

				/* AND DECRYPT(SENHABD, NOME_GUERRA) = :senha" CASO QUEIRA PEGAR SENHA DO WINTHOR
				
				AND 123 = :senha // DEFINIR SENHA PADRAO 123
                AND SENHAB = md5(:SENHA) SENHA CRIPTOGRAFADA MD5
                	
				*/
                {
                    login1: { type: oracledb.STRING, val: login, "dir": oracledb.BIND_IN },
                    login2: { val: parseInt(login.replace(/[^0-9]/ig, "0")), "dir": oracledb.BIND_IN }, // segundo parametro
                    senha: { type: oracledb.STRING, val: senha, "dir": oracledb.BIND_IN }
                });

        }
        
    }
}