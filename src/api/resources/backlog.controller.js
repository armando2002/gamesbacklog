// import Joi for easy valdidation
import Joi from 'joi';
// import Backlog model from backlog.model.js
import Backlog from './backlog.model';

export default {

// action for creating a game in the backlog
    async create(req,res){
        // log request body
        console.log(req.body);
        // use a try catch block to catch any exceptions and handle them
        try{
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
        // use the Joi value object with a promise
        const backlogItem = await Backlog.create(value);
        return res.json(backlogItem);
        }
        catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    },
// action for get all games in the backlog
    async findAll(req,res){
        try{
            // use a promise to find all games and return as a JSON object
            const backlog = await Backlog.find();
            return res.json(backlog);
        }
        catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    },
// action for finding one game
    async findGame(req,res){
        try{
            // use destructuring to grab the ID from the request
            let {id} = req.params;
            // use a promise to find a game by ID
            const game = await Backlog.findById(id);
            // if there's no game with the ID, show HTTP 404
            if(!game){
                return res.status(404).json({err: 'Game not found'});
            }
            // return game in response as a JSON object
            return res.json(game);
        }
        catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    },
// create action for delete game by ID
    async deleteGame(req,res){
        try{
            // use destructuring to grab the ID from the request
            let {id} = req.params;
            // use a promise to find and delete the game
            const game = await Backlog.findByIdAndRemove({_id: id});
            // if there's no song with the ID, show HTTP 404
            if(!game){
                return res.status(404).json({err: 'Game not found'});
            }
            return res.json(game);
        }
        catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    }
};