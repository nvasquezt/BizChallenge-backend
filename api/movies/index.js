const { Router } = require('express');
const multer = require('multer');
const {
    handlerAllMovies,
    handlerGetMovieById,
    handlerCreateMovie,
    handlerUpdateMovie,
    handlerDeleteMovie,
    handlerMoviesByQuery
} = require('./movies.controller');

const router = Router();

const upload = multer({ dest: './temp' });

router.get('/', handlerAllMovies);
router.get('/:id', handlerGetMovieById);
router.post('/', upload.single('file'), handlerCreateMovie);
router.patch('/:id', handlerUpdateMovie);
router.delete('/:id', handlerDeleteMovie);
router.get('/query', handlerMoviesByQuery);


module.exports = router;
