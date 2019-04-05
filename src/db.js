// db.js
const mongoose = require('mongoose');

// schema
const ReviewSchema = new mongoose.Schema({
    rating: {type: Number, required: true},
    name: {type: String},
    text: {type: String, required: true}
});

const BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    isbn: {type: String, required: true},
    reviews: [ReviewSchema]
});

mongoose.model("Book", BookSchema);
mongoose.model("Review", ReviewSchema);

mongoose.connect('mongodb://localhost/hw05');