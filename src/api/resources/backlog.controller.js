// import Joi for easy valdidation
import Joi from 'joi';

export default {

// create action for create
    async create(req,res){
        return res.json({msg: 'Add creation actions and replace this'});
    },
// create action for get all
    async findAll(req,res){
        return res.json({msg: 'Add findAll action and replace this'});
    },
// create action for delete game by ID
    async deleteGame(req,res){
        return res.json({msg: 'Add delete game action and replace this'});
    }
};