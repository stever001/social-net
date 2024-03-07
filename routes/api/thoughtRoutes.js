const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
  getReactions
} = require('../../controllers/thoughtsController');

router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Routes for handling reactions
router.route('/:thoughtId/reactions')
  .post(addReaction); // Add a reaction to a thought

  router.route('/:thoughtId/reactions')
  .get(getReactions); //Get all reactions for a specifc thought

  router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction); // Remove a reaction from a thought

module.exports = router;

