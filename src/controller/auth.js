const model = require('../model/auth');
const con = require('../database/connection')
const jwt = require('jsonwebtoken')
module.exports = {
    async index(req, res){
        const localCon = await con;
        const localModel = model(localCon)
        if (req.body.login && req.body.senha) {
            try {
                const { rows } = await localModel.login(req.body.login, req.body.senha);
                if (rows.length > 0) {
                    var token = jwt.sign({
                        user: rows[0],
                    }, process.env.SECRET, {
                        expiresIn: 86400
                    });
                    res.status(200).json({ auth: true, token: token });
                } else {
                    res.status(400).send("USUARIO OU SENHA NAO ENCONTRADOS");
                }
            } catch (e) {
                console.log(e);
                res.status(400).send("Erro ao consultar Banco de Dados");
            }
        } else {
            res.status(400).send("USUARIO OU SENHA INCORRETOS");
        }
    }
}