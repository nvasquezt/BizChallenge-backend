const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    image: {
        type: String,
        required: true,
        default: 'https://res.cloudinary.com/dunrpkkpq/image/upload/v1659503550/Movies/movies-photo_pdkjk7.png',
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    },
    director: {
        type: String,
        required: true,
        trim: true
    },
    cast: {
        type: Array,
        required: true,
        trim: true
    },
    synopsis: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    }
}
, {
    timestamps: true,
    versionKey: false
});


const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
