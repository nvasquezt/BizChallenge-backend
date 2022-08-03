const moviesModel = require('./movies.model');

const getAllMovies = async () => {
    return await moviesModel.find();
}

const getMovieById = async (id) => {
    const movie = await moviesModel.findById(id);
    if (!movie) {
        throw new Error('Movie not found');
    }
    return movie;
}

const createMovie = async (movie) => {
    const newMovie = new moviesModel(movie);
    return await newMovie.save();
}

const updateMovie = async (id, movie) => {
    const updatedMovie = await moviesModel.findByIdAndUpdate(id, movie, { new: true });
    if (!updatedMovie) {
        throw new Error('Movie not found');
    }
    return updatedMovie;
}


const deleteMovie = async (id) => {
    const deletedMovie = await moviesModel.findByIdAndDelete(id);
    if (!deletedMovie) {
        throw new Error('Movie not found');
    }
    return deletedMovie;
}

const getMoviesByQuery = async (query) => {
    return await moviesModel.find({category: query});
}

    module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    getMoviesByQuery
}
