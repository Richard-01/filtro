const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Book = model('Book', bookSchema);

module.exports = { 
    Book
};

