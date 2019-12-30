const nomeModel = require('../model/fornecedor');
const con = require('../database/connection');

module.exports = {
    async getFornecedores(req, res, next) {
        const localCon = await con; 
        const nomeModelCon = nomeModel(localCon); 
        const { rows } = await nomeModelCon.ListarFornecedores();
        res.json(rows);
    },

    
    async getFornecedor(req, res) {
		try{
            const localCon = await con; 
			const nomeModelCon = nomeModel(localCon); 
            const fornecedor = await nomeModelCon.ListarFornecedor(req.query.id_fornecedor);
            console.log(fornecedor.rows);
            return res.status(200).json(fornecedor.rows);	   
		}
		 catch (e){

            console.log(req.query.id_fornecedor);

            console.log(e);
            res.send(e);

        }		
    },

    async InsertFornecedor(req, res) {

        try{
        const localCon = await con;
        const nomeModelCon = nomeModel(localCon);
        //const oQueTemQueVir = req.body
        const oQueTemQueVir = {"NOME": req.body["NOME"], "CGC": req.body["CGC"]};
        await nomeModelCon.InserirFornecedor(oQueTemQueVir);
        console.log(req.body);
        res.status(201).send("Fornecedor Inserido");
        }
        catch (e){
            console.log(e);
            res.send(e);
        }       
    },

    async DeleteFornecedor(req, res) {
		try{
            const localCon = await con; 
            const nomeModelCon = nomeModel(localCon); 
            const log = await nomeModelCon.DeletarFornecedor(req.params.fornecedor);
            if (log.rowsAffected == 0) {
                console.log('Fornecedor Inexistente no Sistema: ' + req.params.fornecedor) 
                return res.status(404).json('Fornecedor Inexistente no Sistema');          
            }
            console.log('FORNCEDOR DELETADO: ' + req.params.fornecedor)  
            return res.status(200).json('Fornecedor Deletado');            	
		}
		 catch (e){
            console.log(req.query.fornecedor);
            console.log(e);
            res.send(e);
        }		
    } ,

    async updateFornecedor(req, res) {

        try{
            const localCon = await con;
            const nomeModelCon = nomeModel(localCon);
            //const oQueTemQueVir = {"DESCRICAO": req.body["DESCRICAO"]}; //e se fosse mais de um campo?
            const oQueTemQueVir = req.body;
            console.log(oQueTemQueVir);  //
            await nomeModelCon.AtualizarFornecedor(oQueTemQueVir);
            res.send("FORNECEDOR ATUALIZADO");
        }
        catch (e){
            console.log(e);
            res.send(e);
        }
    },

}