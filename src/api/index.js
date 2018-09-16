import express from 'express';

// import backlogRouter from resources folder
import { backlogRouter } from './resources';

// main REST router
export const restRouter = express.Router();

// use the backlog router for calls to '/api'
restRouter.use('/', backlogRouter);
