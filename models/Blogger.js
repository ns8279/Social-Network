const { Schema, model } = require('mongoose');


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const BloggerSchema = new Schema
(
    { 
        username: { 
        type: String, 
        trim: true, 
        unique: true, 
        required: true 
    },

    email: { 
        type: String, 
        unique: true, 
        required: true,
        trim: true,
        validate: [validateEmail, 'Please enter a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    }, 
    
    thoughts: [ 
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Thought' 
        } 
    ],
    
    friends: [ 
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Blogger' 
        } 
    ]
},
//Adding this to be able toaccept virtuals====================================== 
{ 
    toJSON: { 
        virtuals: true, 
        //getters: true 
    },
        id: false 
}


);
// get total count of friends on retrieval
BloggerSchema.virtual('friendCount').get(function() { return this.friends.length; });
BloggerSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.reduce((total, thought) => total + thought.reactions.length + 1 , 0);
});


//create the User model using the UserSchema
const Blogger = model('Blogger', BloggerSchema);
//Users.updateMany( {}, { $rename: { "userName": "username" } } );
//export the Blogger model
module.exports = Blogger;