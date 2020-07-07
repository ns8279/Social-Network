const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
        //set custome id to avoid confusion with parent thoughts id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: {
            type: String
        },

        username: {
            type: String,
            //ref: 'User',
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },

    //Adding this to be able toaccept getters======================================
    {
        toJSON: {
          getters: true
        }
       
    }

)

// Thoughts Schema ========================================================================================================
const ThoughtSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    thoughtBody: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

    reactions: [ReactionSchema]
},

//Adding this to be able toaccept virtuals======================================
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
}

);

// get total count of reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;