const { Schema, model } = require('mongoose');

// Reaction subdocument schema
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
    // Use a getter method to format the timestamp on query
  },
}, {
  toJSON: {
    getters: true,
  },
  _id: false, // Prevents creation of an _id for each reaction subdocument
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
