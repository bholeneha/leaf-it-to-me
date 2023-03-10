const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('dotenv').config();

// Connect to db
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());


app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// middleware that adds the user object from a JWT to req.user
// app.use(require('./config/checkToken'));

// API ROUTES
app.use('/api/users', require('./routes/api/users'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/orders', require('./routes/api/orders'));

// CATCH ALL ROUTE 
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Protect all routes in the items router
// const ensureLoggedIn = require('./config/ensureLoggedIn');
// app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
// app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));


// "catch-all" route that will match all GET requests
// that don't match an API route defined above
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});