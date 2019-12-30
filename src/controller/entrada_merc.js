const nomeModel = require('../model/entrada_merc');
const con = require('../database/connection');

module.exports = {
    async getMercadorias(req, res, next) {
        const localCon = await con; 
        const nomeModelCon = nomeModel(localCon); 
        const { rows } = await nomeModelCon.ListarEntradas();
        res.json(rows);
    },

    
    async getMercadoria(req, res) {
		try{
            const localCon = await con; 
			const nomeModelCon = nomeModel(localCon); 
            const entrada = await nomeModelCon.ListarEntrada(req.query.id_mercadoria);
            console.log(entrada.rows);
            return res.status(200).json(entrada.rows);	   
		}
		 catch (e){

            console.log(req.query.id_mercadoria);

            console.log(e);
            res.send(e);

        }		
    },

    async InsertMercadoria(req, res) {

        try{
        const localCon = await con;
        const nomeModelCon = nomeModel(localCon);
        const oQueTemQueVir = req.body
        //const oQueTemQueVir = {"NOTA_FISCAL": req.body["NOTA_FISCAL"], "ID_FORNECEDOR": req.body["ID_FORNECEDOR"]};
        await nomeModelCon.InserirEntrada(oQueTemQueVir);
        res.status(201).send("Entrada na mercadoria com Sucesso!");
        }
        catch (e){
            console.log(e);
            res.send(e);
        }       
    }

}