const users= require('../api/users');
 const movies= require('../api/movies');
 const authLocal= require('../auth/local');

 function routes(app) {
    app.use('/api/users', users);
    app.use('/api/movies', movies);
    app.use('/auth', authLocal);
 }

 module.exports = routes;