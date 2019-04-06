const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
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
app.use(express.static(path.join(__dirname, '..', 'public')));
// another app.use later to handle 404s:

// mongoose models
const Book = mongoose.model('Book');
const Review = mongoose.model('Review');

app.get('/', (req, res) => {
    res.redirect('/books');
});

app.get('/books', (req, res) => {
    const queryObj = {};
    if(req.query.filter && req.query.filterVal) {
        queryObj[req.query.filter] = req.query.filterVal;
    }
    Book.find(queryObj, (err, result) => {
        if(err) { res.render('books', {title: "Could not find books fitting that query."}); }
        const queryRes = result;
        res.render('books', {queryRes});
    });
    
});


app.get('/books-new', (req, res) => {
    res.render('newbook');
});

app.post('/books-new', (req, res) => {
    const book = new Book({
        title: sanitize(req.body.title),
        author: sanitize(req.body.author),
        isbn: sanitize(req.body.isbn)
    });

    book.save((err, book) => {
        if(err) { 
            const warning = "Uh-oh, we couldn't make your book. Try again?";
            res.render('newbook', {warning});
        } else {
            console.log(`Added ${book} to db`);
            res.redirect('/');
        } 
    });
});

app.get('/books/:slug', (req, res) => {

});

app.post('/books/:slug/comments', (req, res) => {

});

app.get('books/mine', (req, res) => {

});

app.listen(3000);
