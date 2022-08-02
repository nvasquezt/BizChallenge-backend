const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    image: {
        type: String,
        required: true,
        default: 'https://res.cloudinary.com/dbsumvu1d/image/upload/v1650855803/Imagen-destacada-post-VN-1_ssfest.png',
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
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
    }
}
, {
    timestamps: true,
    versionKey: false
});


const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
