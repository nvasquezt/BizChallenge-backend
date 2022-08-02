const { Router } = require('express');
const multer = require('multer');
const {
    handlerCreateUser,
    handlerGetUserById,
    handlerGetUserByEmail,
    handlerUpdateUser
} = require('./users.controller');

const router = Router();

const upload = multer({ dest: './temp' });

router.post('/', upload.single('file'), handlerCreateUser);
router.get('/:id', handlerGetUserById);
router.get('/:email', handlerGetUserByEmail);
router.patch('/:id', handlerUpdateUser);


module.exports = router;
