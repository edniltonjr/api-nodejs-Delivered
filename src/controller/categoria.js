const nomeModel = require('../model/categoria');
const con = require('../database/connection');

module.exports = {
    async getCategorias(req, res, next) {
        const localCon = await con; 
        const nomeModelCon = nomeModel(localCon); 
        const { rows } = await nomeModelCon.ListarCategorias();
        res.json(rows);
    },

    
    async getCategoria(req, res) {
		try{
            const localCon = await con; 
			const nomeModelCon = nomeModel(localCon); 
            const categoria = await nomeModelCon.ListarCategoria(req.query.id_categoria);
            console.log(categoria.rows);
            return res.status(200).json(categoria.rows);	   
		}
		 catch (e){

            console.log(req.query.id_categoria);

            console.log(e);
            res.send(e);

        }		
    },

    async InsertCategoria(req, res) {

        try{
        const localCon = await con;
        const nomeModelCon = nomeModel(localCon);
        //const oQueTemQueVir = req.body
        const oQueTemQueVir = {"DESCRICAO": req.body["DESCRICAO"]};
        await nomeModelCon.InserirCategoria(oQueTemQueVir);
        console.log(req.body);
        res.status(201).send("Categoria Adicionada");
        }
        catch (e){
            console.log(e);
            res.send(e);
        }       
    },

    async DeleteCategoria(req, res) {
		try{
            const localCon = await con; 
            const nomeModelCon = nomeModel(localCon); 
            const log = await nomeModelCon.DeletarCategoria(req.params.categoria);
            if (log.rowsAffected == 0) {
                console.log('Categoria Inexistente no Sistema: ' + req.params.categoria) 
                return res.status(404).json('Categoria Inexistente no Sistema');          
            }
            console.log('CATEGORIA DELETADA: ' + req.params.categoria)  
            return res.status(200).json('Categoria Deletada');            	
		}
		 catch (e){
            console.log(req.query.categoria);
            console.log(e);
            res.send(e);
        }		
    } ,

    async updateCategoria(req, res) {

        try{
            const localCon = await con;
            const nomeModelCon = nomeModel(localCon);
            //const oQueTemQueVir = {"DESCRICAO": req.body["DESCRICAO"]}; //e se fosse mais de um campo?
            const oQueTemQueVir = req.body;
            console.log(oQueTemQueVir);  //
            await nomeModelCon.AtualizarCategoria(oQueTemQueVir);
            res.send("CATEGORIA ATUALIZADA");
        }
        catch (e){
            console.log(e);
            res.send(e);
        }
    },

}