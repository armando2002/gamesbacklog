import mongoose from 'mongoose';

// use a promise with the mongoose promise method
mongoose.Promise = global.Promise;

// commenting out to test mLab and Heroku
// mongoose method which connects to local MongoDB
export const connect = () => mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/backlog_api');
