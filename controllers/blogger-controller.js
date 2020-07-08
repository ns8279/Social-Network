const { Blogger } = require('../models');

const bloggerController = {
    
    //get all Bloggers ==============================================================
    getAllBlogger(req,res) {
        Blogger.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            //.sort({ _id: -1 }) //this sorts them in descding order
            .then(dbBloggerData => res.json(dbBloggerData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //get Blogger by id ===============================================================
    getBloggerById({ params }, res) {
        Blogger.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
        //console.log(params.id)
            .then(dbBloggerData => {
                //if no Blogger found, send 404
                if(!dbBloggerData) {
                    res.status(404).json({ message: "No Blogger found" });
                    return;
                }
                res.json(dbBloggerData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });       
    },

    //create Blogger ======================================================================
    createBlogger({ body }, res) {
        Blogger.create(body)
            .then(dbBloggerData => res.json(dbBloggerData))
            .catch(err => res.status(400).json(err));
    },

    //update a Blogger ======================================================================
    updateBlogger({ params, body }, res) {
        Blogger.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
            .then(dbBloggerData => {
                if(!dbBloggerData) {
                    res.status(404).json({ message: "No Blogger found with this ID" });
                    return;
                }
                res.json(dbBloggerData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });  
    },

    //delete a Blogger ======================================================================
    deleteBlogger({ params }, res) {
        Blogger.findOneAndDelete( { _id: params.id })
        .then(dbBloggerData => {
            if(!dbBloggerData) {
                res.status(404).json({ message: "No Blogger found with this ID" });
                return;
            }
            res.json(dbBloggerData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });  
            
    },


    //add friend ===============================================================================

    // addReply({ params, body }, res) {                                                           
    //     Comment.findOneAndUpdate(
    //       { _id: params.commentId },
    //       { $push: { replies: body } },
    //       { new: true }
    //     )
    //       .then(dbPizzaData => {
    //         if (!dbPizzaData) {
    //           res.status(404).json({ message: 'No pizza found with this id!' });
    //           return;
    //         }
    //         res.json(dbPizzaData);
    //       })
    //       .catch(err => res.json(err));
    //   },


    //   addThought({ params, body }, res) {
    //     console.log(body);
    //     Thought.create(body)
    //       .then(({ _id }) => {
    //         return Blogger.findOneAndUpdate(
    //           { _id: params.bloggerId },
    //           { $push: { thoughts: _id } },
    //           { new: true }
    //         );
    //       })
    //       .then(dbBloggerData => {
    //         if (!dbBloggerData) {
    //           res.status(404).json({ message: 'No user found with this id!' });
    //           return;
    //         }
    //         res.json(dbBloggerData);
    //       })
    //       .catch(err => res.json(err));
    // },

    addFriend({ params, body }, res) {
        Blogger.create(body)
            .then(({ _id }) => {
                return Blogger.findOneAndUpdate(
                    { _id: params.bloggerId },
                    { $push: { friends: _id }},
                    { new: true }
                );
            })
            .then(dbBloggerData => {
                if (!dbBloggerData) {
                  res.status(404).json({ message: 'No user found with this id!' });
                  return;
                }
                res.json(dbBloggerData);
              })
              .catch(err => res.json(err));
    }

    


};

module.exports = bloggerController;