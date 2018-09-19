import express from 'express';
import logger from 'morgan';

// imports connect from db.js
import {connect} from './config/db';

// imports restRouter from '/api/index/js'
import {restRouter} from './api';

const app = express();
const PORT = 3000;

connect();

// parse the incoming JSON request for express
app.use(express.json());

// use morgan middleware for logging
app.use(logger('dev'));

// for entries that hit the root, serve index.html
app.use('/', express.static('public'));

// for entries that hit '/api' use the backlogRouter (ADD THIS LATER)
app.use('/api', restRouter);


app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});