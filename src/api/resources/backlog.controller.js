// import Joi for easy valdidation
import Joi from 'joi';

export default {

// create action for create
    async create(req,res){
        // log request body
        console.log(req.body);
        // use Joi to validate that object provided matches schema
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            platform: Joi.string(),
            status: Joi.string(),
            comments: Joi.string(),
            dateAdded: Joi.string(),
            lastPlayed: Joi.string()
        });
        const {value, error} = Joi.validate(req.body, schema);
        // if validation is false, use the included error and show HTTP 400
        if(error && error.details){
            return res.status(400).json(error);
        }
        return res.json(value);
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