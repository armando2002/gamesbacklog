import mongoose from 'mongoose';

// use a promise with the mongoose promise method
mongoose.Promise = global.Promise;

// mongoose method which connects to local MongoDB
export const connect = () => mongoose.connect('mongodb://localhost/backlog_api');