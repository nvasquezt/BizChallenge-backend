const {
    handlerAllMovies,
    handlerGetMovieById,
    handlerCreateMovie,
    handlerUpdateMovie,
    handlerDeleteMovie
} = require('./movies.controller');

const router = require('express').Router();


router.get('/', handlerAllMovies);
router.get('/:id', handlerGetMovieById);
router.post('/', handlerCreateMovie);
router.patch('/:id', handlerUpdateMovie);
router.delete('/:id', handlerDeleteMovie);


module.exports = router;
