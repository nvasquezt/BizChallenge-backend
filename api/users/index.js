const { Router } = require('express');
const multer = require('multer');
const {
    handlerCreateUser,
    handlerGetUserById,
    handlerUpdateUser
} = require('./users.controller');

const router = Router();

const upload = multer({ dest: './temp' });

router.post('/', upload.single('file'), handlerCreateUser);
router.get('/:id', handlerGetUserById);
router.patch('/:id', handlerUpdateUser);


module.exports = router;
