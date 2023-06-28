const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    author:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }, 
    bookImg:{
        type: String,
        required: true,
    },
    genre: {
        type:String
    },
    tags:{
        type: String,
    },

    fav: {
        type: Boolean,
        default: true,
    },
    isFinishedReading: {
        type: Boolean,
        default: false,
    },
    quote: {
        type: [Schema.Types.ObjectId],
        ref: "Quote"
    }

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book