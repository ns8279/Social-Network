const router = require('express').Router();
//Import all of the API routes from /api/index.js
const apiRoutes = require('./api');


//add prefix of /api to all of the pai routes
router.use('/api', apiRoutes);



router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;