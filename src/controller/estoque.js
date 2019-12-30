const nomeModel = require('../model/estoque');
const con = require('../database/connection');

module.exports = {
    async getEstoques(req, res, next) {
        const localCon = await con; 
        const nomeModelCon = nomeModel(localCon); 
        const { rows } = await nomeModelCon.ListarEstoques();
        console.log('teste' + rows)
        res.json(rows);
    },

    
    async getEstoque(req, res) {
		try{
            const localCon = await con; 
			const nomeModelCon = nomeModel(localCon); 
            const estoque = await nomeModelCon.ListarEstoque(req.query.id_estoque);
            console.log(estoque.rows);
            return res.status(200).json(estoque.id_estoque);	   
		}
		 catch (e){

            console.log(req.query.estoque);

            console.log(e);
            res.send(e);

        }		
    },

    async InsertEntrada(req, res) {

        try{
        const localCon = await con;
        const nomeModelCon = nomeModel(localCon);
        const oQueTemQueVir = req.body
        const oQueTemQueVir2 = {"NOTA_FISCAL": req.body["NOTA_FISCAL"], "ID_PRODUTO": req.body["ID_PRODUTO"]};
        await nomeModelCon.InserirEntrada(oQueTemQueVir);
        await nomeModelCon.InserirEntrada2(oQueTemQueVir2);
       // console.log(req.body);
        res.status(200).json("Estoque Adicionado");
        }
        catch (e){
            //console.log(e);
            res.send(e);
        }       
    },

    async InsertSaida(req, res) {

        try{
        const localCon = await con;
        const nomeModelCon = nomeModel(localCon);
        const oQueTemQueVir = req.body
        //const oQueTemQueVir = {"TIPO": req.body["TIPO"], "QT_SAIDA": req.body["QT_SAIDA"], "NOTA_FISCAL": req.body["NOTA_FISCAL"]};
        await nomeModelCon.InserirSaida(oQueTemQueVir);
        console.log(req.body);
        res.status(201).send("Estoque Atualizado");
        }
        catch (e){
            console.log(e);
            res.send(e);
        }       
    }

}