const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/users/:userId/friends
router.route('/:thoughtId/reactions').put(addReaction);

// /api/users/:userId/friends/:friendsId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;