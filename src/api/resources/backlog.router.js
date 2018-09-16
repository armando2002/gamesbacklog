import express from 'express';
// imports functions from backlog.controller
import backlogController from './backlog.controller';

// create router using express
export const backlogRouter = express.Router();

// create routes
backlogRouter
    .route('/')
    .get(backlogController.findAll)
    .post(backlogController.create);
