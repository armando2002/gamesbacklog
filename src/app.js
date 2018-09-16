import express from 'express';
import logger from 'morgan';

const app = expresss();
const PORT = 3000;

// use morgan middleware for logging
app.use(logger('dev'));


// for entries that hit '/' use the indexRouter
app.use('/', indexRouter);
// for entries that hit '/api' use the backlogRouter
app.use('/api', backlogRouter);


app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});