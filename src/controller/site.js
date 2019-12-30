const nomeModel = require('../model/auth');
const con = require('../database/connection');

module.exports = {
    index(req, res){
        res.send(req.user)
    },
    
    


    async Carreg(req, res) {
        
		try{
            const localCon = await con; 
			const nomeModelCon = nomeModel(localCon); 
            const carregamentos = await nomeModelCon.carregamento(req.query.numcar);
			return res.status(200).json(carregamentos.rows);	
		}
		 catch (e){

            console.log(req.query.numcar);

            console.log(e);
            res.send(e);

        }
		
		

    }

}