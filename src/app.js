const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoSanitize = require('mongo-sanitize');
const path = require('path');
const app = express();
require('./db');

const sessionOptions = { 
	secret: 'secret for signing session id', 
	saveUninitialized: false, 
	resave: false 
};

app.set('view engine', 'hbs');
app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// another app.use later to handle 404s:

// mongoose models
const Book = mongoose.model('Book');
const Review = mongoose.model('Review');

app.get('/', (req, res) => {
    res.redirect('/books');
});

app.get('/books', (req, res) => {
    res.render('books');
});

app.get('/books-new', (req, res) => {

});

app.post('/books-new', (req, res) => {

});

app.get('/books/:slug', (req, res) => {

});

app.post('/books/:slug/comments', (req, res) => {

});

app.get('books/mine', (req, res) => {

});

app.listen(3000);
