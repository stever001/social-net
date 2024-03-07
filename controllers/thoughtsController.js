const { Thought, User } = require('../models');

const thoughtsController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .sort({ createdAt: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  getThoughtById(req, res) {
    Thought.findById(req.params.id)
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findByIdAndUpdate(
          req.body.userId,
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json({ message: 'Thought created and added to user' });
      })
      .catch(err => res.json(err));
  },

  updateThought(req, res) {
    Thought.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },

  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.id)
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json({ message: 'Thought deleted' });
      })
      .catch(err => res.json(err));
  },
  
  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },

  getReactions(req, res) {
    Thought.findById(req.params.thoughtId)
      .select('reactions -_id') // Select only the reactions field, exclude the thought _id
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json(dbThoughtData.reactions); // Return only the reactions
      })
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
},

  removeReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId, // The ID of the thought to update
      { $pull: { reactions: { _id: req.params.reactionId } } }, // Command to remove the reaction with the specified _id
      { new: true } // Option to return the updated document
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
  },
};

module.exports = thoughtsController;
