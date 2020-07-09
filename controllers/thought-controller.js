const { Thought, Blogger } = require('../models');

const thoughtController = {
    
    //get all Thoughts ==============================================================
    getAllThought(req,res) {
        Thought.find({})
            .select('-__v')
            //.sort({ _id: -1 }) //this sorts them in descding order
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //get Thought by id ===============================================================
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
        //console.log(params.id)
            .then(dbThoughtData => {
                //if no Thought found, send 404
                if(!dbThoughtData) {
                    res.status(404).json({ message: "No Thought found" });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });       
    },

    //create Thought ======================================================================
   
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
          .then(({ _id }) => {
            return Blogger.findOneAndUpdate(
              { _id: params.bloggerId },
              { $push: { thoughts: _id } },
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
    },

    //update a Thought ======================================================================
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: "No Thought found with this ID" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });  
    },

    //delete a Thought ======================================================================
    deleteThought({ params }, res) {
        Thought.findOneAndDelete( { _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "No Thought found with this ID" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });  
            
    },


    //add reactions to the thoughts ===========================================================
    addReaction ({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            {new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            select: '-__v',
            //select: 'reactionId'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought associated with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }); 

    },

    //Remove reactions from the thought ===========================================================
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId }} },
            {new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought associated with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }); 

    }



};



module.exports = thoughtController;