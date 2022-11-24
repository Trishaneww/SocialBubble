const { Thought, User, Reaction } = require('../models');


module.exports = {
// /api/thoughts
getThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
  .catch((err) => res.status(500).json(err));
},
getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
},
createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => 
      User.findOneAndUpdate(     
        {_id:req.body.userId},
        {$push: { thoughts: thought._id}},
        {new: true}
        )
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
updateThought(req, res) {
Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
)
    .then((thought) =>
    !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          :  User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));

},
addReaction(req, res) {
  console.log('You are adding a reaction');
  console.log(req.body);
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((reaction) =>
      !reaction
        ? res
            .status(404)
            .json({ message: 'No reaction found with that ID :(' })
        : res.json(reaction)
    )
    .catch((err) => res.status(500).json(err));
},
removeReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: {_id: req.params.reactionId} } },
    { runValidators: true, new: true }
  )
    .then((reaction) =>
      !reaction
        ? res
            .status(404)
            .json({ message: 'No reaction found with that ID :(' })
        : res.json(reaction)
    )
    .catch((err) => res.status(500).json(err));
},
};
