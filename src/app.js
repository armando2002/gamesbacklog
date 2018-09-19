import express from 'express';
import logger from 'morgan';

// imports connect from db.js
import {connect} from './config/db';

// imports restRouter from '/api/index/js'
import {restRouter} from './api';

const app = express();

// commenting out for promises below
//const PORT = 3000;

connect();

// parse the incoming JSON request for express
app.use(express.json());

// use morgan middleware for logging
app.use(logger('dev'));

// for entries that hit the root, serve index.html
app.use('/', express.static('public'));

// for entries that hit '/api' use the backlogRouter
app.use('/api', restRouter);


// commenting this out to try mocha-chai approach with runServer and closeServer promises

//app.listen(PORT, () => {
  //  console.log(`Server is running at PORT http://localhost:${PORT}`);
//});

// both runServer and closeServer need to access the same
// server object, so we declare `server` here, and then when
// runServer runs, it assigns a value.
let server;

// this function starts our server and returns a Promise.
// In our test code, we need a way of asynchronously starting
// our server, since we'll be dealing with promises there.
function runServer() {
  const port = process.env.PORT || 3000;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on("error", err => {
        reject(err);
      });
  });
}

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };