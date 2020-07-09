const router = require('express').Router();

//
const {  getAllThought, getThoughtById, addThought, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

//SET up GET all and POST at /api/thoughts =====================================================
router
    .route('/')
    .get(getAllThought)

router
    .route('/:bloggerId')
    .post(addThought)
    


//SET up GETONE, PUT, delete at /api/thoughts/:id ===============================================
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//Set up routes for reactions
router
    .route('/:id/reaction')
    .post(addReaction);

//Route to remove reactions
router
    .route('/:id/reaction/:reactionId')
    .delete(removeReaction);


module.exports = router;