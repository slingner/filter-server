require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const morganOption = process.env.NODE_ENV === 'production' 
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption)); 
app.use(cors());
app.use(helmet());

app.get('/', (req, res, next) => {
  res.json( { message: 'Hello World' } );
});

app.use((error, req, res, next) => {
  let response;
  if(process.env.NODE_ENV === 'production') {
    response = { error: 'Internal server error' };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }

  res.status(500).json(response);
});


module.exports = app;