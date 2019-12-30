const nomeModel = require('../model/produto');
const con = require('../database/connection');

module.exports = {
    async getProdutos(req, res, next) {
        const localCon = await con; 
        const nomeModelCon = nomeModel(localCon); 
        const { rows } = await nomeModelCon.ListarProdutos();
        return res.status(200).json(rows);	 
    },

    
    async getProduto(req, res) {
		try{
            const localCon = await con; 
			const nomeModelCon = nomeModel(localCon); 
            const produto = await nomeModelCon.ListarProduto(req.query.id_produto);
            console.log(produto.rows);
            return res.status(200).json(produto.rows);	   
		}
		 catch (e){

            console.log(req.query.id_produto);

            console.log(e);
            res.send(e);

        }		
    },

    async InsertProduto(req, res) {

        try{
        const localCon = await con;
        const nomeModelCon = nomeModel(localCon);
        //const oQueTemQueVir = req.body
        const oQueTemQueVir = {"DESCRICAO": req.body["DESCRICAO"], "ID_CATEGORIA": req.body["ID_CATEGORIA"], "ID_FORNECEDOR": req.body["ID_FORNECEDOR"]};
        await nomeModelCon.InserirProduto(oQueTemQueVir);
        console.log(req.body);
        res.status(201).send("Produto Adicionado");
        }
        catch (e){
            console.log(e);
            res.send(e);
        }       
    },

    async DeleteProduto(req, res) {
		try{
            const localCon = await con; 
            const nomeModelCon = nomeModel(localCon); 
            const log = await nomeModelCon.DeletarProduto(req.params.produto);
            if (log.rowsAffected == 0) {
                console.log('Produto Inexistente no Sistema: ' + req.params.produto) 
                return res.status(404).json('Produto Inexistente no Sistema');          
            }
            console.log('PRODUTO DELETADO: ' + req.params.produto)  
            return res.status(200).json('Produto Deletado');            	
		}
		 catch (e){
            console.log(req.query.produto);
            console.log(e);
            res.send(e);
        }		
    } ,

    async updateProduto(req, res) {

        try{
            const localCon = await con;
            const nomeModelCon = nomeModel(localCon);
            //const oQueTemQueVir = {"DESCRICAO": req.body["DESCRICAO"]}; //e se fosse mais de um campo?
            const oQueTemQueVir = req.body;
            console.log(oQueTemQueVir);  //
            await nomeModelCon.AtualizarProduto(oQueTemQueVir);
            res.send("PRODUTO ATUALIZADO");
        }
        catch (e){
            console.log(e);
            res.send(e);
        }
    },

}