const router = require('express').Router();
const bloggerRoutes = require('./blogger-routes.js');
const thoughtRoutes = require('./thought-routes.js');

//add prefix of `/bloggers` to the routes created in `pizza-rotes`
router.use('/bloggers', bloggerRoutes);

//add prefix of '/thoughts' to the routes created in 'comment-routes'
router.use('/thoughts', thoughtRoutes);

module.exports = router;