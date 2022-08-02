const serviceModel = require('./movies.model');

const getAllMovies = async () => {
    return await serviceModel.find();
}

const getMovieById = async (id) => {
    const movie = await serviceModel.findById(id);
    if (!movie) {
        throw new Error('Movie not found');
    }
    return movie;
}

const createMovie = async (movie) => {
    const newMovie = new serviceModel(movie);
    return await newMovie.save();
}

const updateMovie = async (id, movie) => {
    const updatedMovie = await serviceModel.findByIdAndUpdate(id, movie, { new: true });
    if (!updatedMovie) {
        throw new Error('Movie not found');
    }
    return updatedMovie;
}


const deleteMovie = async (id) => {
    const deletedMovie = await serviceModel.findByIdAndDelete(id);
    if (!deletedMovie) {
        throw new Error('Movie not found');
    }
    return deletedMovie;
}


module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
}
