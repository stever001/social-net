const { Schema, model } = require('mongoose');

// Reaction subdocument schema without disabling _id
const ReactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Consider implementing a getter method here to format the timestamp
  },
}, {
  toJSON: {
    getters: true,
  }
  // Removed the _id: false option, so Mongoose will add an _id field automatically
});


// Thought schema
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Use a getter method to format the timestamp on query
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema], // Embedding Reaction subdocuments in Thought documents
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
});

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
