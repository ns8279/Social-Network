const router = require('express').Router();
const { getAllBlogger, getBloggerById, createBlogger, updateBlogger, deleteBlogger, addFriend, removeFriend } = require('../../controllers/Blogger-controller');
//SET up GET all and POST at /api/bloggers =====================================================
router 
    .route('/') 
    .get(getAllBlogger) 
    .post(createBlogger);

//SET up GETONE, PUT, delete at /api/Bloggers/:id ===============================================
router 
    .route('/:id') 
    .get(getBloggerById) 
    .put(updateBlogger) 
    .delete(deleteBlogger);

//SET up the friendlist route
// router 
// .route('/:BloggerId/friends/friendId') 
// .post(addFriend) 
// .delete(removeFriend)

module.exports = router;