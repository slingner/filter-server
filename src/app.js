//-------------------------------------- Import/require modules

//Configure create variables written in .env file to the environment
require('dotenv').config();
//Enables access to request and response objects 
const express = require('express');
//Enable HTTP request logger
const morgan = require('morgan');
//Enable Cross Origin Resource Sharing, simplifies the config of CORS in Express
const cors = require('cors');
//Security of HTTP resonse headers
const helmet = require('helmet');
//imports environment from config settings
const { NODE_ENV } = require('./config');
//import logic for validating/securing API token
const validateToken = require('./validateToken');
//imports all error handling logic 
const errorHandling = require('./errorHandling');

//create express app to communicate with express server
const app = express();

// Depends on the condition of the environment
// Morgan - tiny format for production environment
// Morgan - common format for development environment
// Has 6 levels of severity: silly, debug, verbose, info, warn and error
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';




//----------------------------------Mounting Middleware

//always hide HTTP headers with morgan before sending cors
app.use(morgan(morganOption)); 
app.use(helmet());
app.use(cors());
// Use to parse JSON body of request
app.use(express.json());

// Validate API key
app.use(validateToken);

//Create errors if any arise
app.use(errorHandling);

//----------------------------------Endpoints Config
app.get('/', (req, res) => {
  res.json( { message: 'Hello, Scott!' } );
});

module.exports = app;