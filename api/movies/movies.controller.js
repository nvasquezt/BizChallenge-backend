const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
    getMoviesByQuery
} = require('./movies.services');


const uploadImage = async (image) => {
    try{
        const result = await cloudinary.uploader.upload(image);
        return result;
    } catch(error){
        throw new Error(error);
    } finally {
        fs.unlinkSync(image);
    }
}


const handlerAllMovies = async (req, res) => {
    try {
        const movies = await getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const handlerGetMovieById = async (req, res) => {
    try {
        const idMovie = req.params.id;
        const movie = await getMovieById(idMovie);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const handlerCreateMovie = async (req, res) => {
  try {
    const { file } = req;
    if(file){
      try {
        const size = file.size / 1024 / 1024;
        if (size > 5) {
          return res.status(400).json({
            message: 'Image size should be less than 5MB'
          });
        }
      } catch (error) {
        res.status(500).json(error);
      }
      const result  = await uploadImage(file.path);
      const imagen = result.url;
      req.body.image=imagen;
    }
    const cast = req.body.cast.split(",");
    req.body.cast = cast;
    const service = await createMovie(req.body);
    res.status(201).json(service);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const handlerUpdateMovie = async (req, res) => {
    try {
        const idMovie = req.params.id;
        const movie = await updateMovie(idMovie, req.body);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const handlerDeleteMovie = async (req, res) => {
    try {
        const idMovie = req.params.id;
        const movie = await deleteMovie(idMovie);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const handlerMoviesByQuery = async (req, res) => {
    try {
        const { query } = req.query;
        const movies = await getMoviesByQuery(query);
        res.status(200).json(movies);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


module.exports = {
    handlerAllMovies,
    handlerGetMovieById,
    handlerCreateMovie,
    handlerUpdateMovie,
    handlerDeleteMovie,
    handlerMoviesByQuery
}
