const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

// Middlewares
// Import routes
const tasksRoute = require('./routes/tasks');
const viewsRoute = require('./routes/views');
app.use('/tasks', tasksRoute);
app.use('/views', viewsRoute);

// Connect to database
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log('Connected to the database')
);

app.listen(5000);
