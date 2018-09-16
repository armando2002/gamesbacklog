import express from 'express';
// imports functions from backlog.controller
import backlogController from './backlog.controller';

// create router using express
export const backlogRouter = express.Router();

// create routes for standard actions
backlogRouter
    .route('/')
    .get(backlogController.findAll)
    .post(backlogController.create);

// create routes for game-specific actions
backlogRouter
    .route('/:id')
    .get(backlogController.findGame)
    .delete(backlogController.deleteGame)
    .put(backlogController.updateGame);
