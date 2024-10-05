const mongoose = require('mongoose');
const {Schema} = mongoose;
const bookSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    author : {
        type: String,
        required: true,
    }, 
    genre : {
        type: String,
        required: true,
    },
    createdBy : {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    
});

const Books = mongoose.model('books', bookSchema);

module.exports = Books;