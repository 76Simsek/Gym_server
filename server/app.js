const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const gym = require('./routes/gym');
const { errorHandler, notFound } = require('./middleware/errorHandler');

require('colors');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(require('cors')());

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use('/', gym);

app.use(errorHandler);
app.use(notFound);
const PORT = process.env.PORT ?? 5000;

console.log(`Server listens on port: ${PORT}`.blue.bold);
app.listen(PORT);
