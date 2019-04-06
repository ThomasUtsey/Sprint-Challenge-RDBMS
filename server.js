const express = require('express'); // importing a CommonJS module

const project = require('./routes/project')
const action = require('./routes/action');

const helmet = require('helmet');

const morgan = require('morgan');

const server = express();


function logger(req,res,next){
  console.log(new Date(), req.method,req.url);
  next ();
}


server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);

server.use('/api/project', project);
server.use('/api/action', action);


server.get('/', async (req, res) => {
  res.send(`
    <h2>Lambda Project API</h2>
    <p>Welcome to the Lambda Project API</p>
    `);
});

module.exports = server;