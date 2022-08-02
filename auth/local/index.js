const { Router } = require('express');
const { handlerLoginUser } = require ('./local.controller');

const router = Router();

router.post('/login', handlerLoginUser);

module.exports = router;