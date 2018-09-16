import express from 'express';
import logger from 'morgan';

// imports connect from db.js
import {connect} from './config/db';


const app = express();
const PORT = 3000;

connect();

// use morgan middleware for logging
app.use(logger('dev'));

// for entries that hit '/' show a message
app.get('/', (req, res) => res.json({msg: 'This is the games backlog app.'}));

// for entries that hit '/' use the indexRouter (ADD THIS LATER)
// app.use('/', indexRouter);

// for entries that hit '/api' use the backlogRouter (ADD THIS LATER)
// app.use('/api', backlogRouter);


app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});