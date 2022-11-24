const { User } = require('../models');

module.exports = {
// /api/users
    getUsers(req, res) {
        User.find()
        .populate('thoughts')
        .populate('friends')
        .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
    },
    // /api/users/userId
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('thoughts')
          .populate('friends')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No User with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
      User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
      },
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((course) =>
        !course
            ? res.status(404).json({ message: 'No User with this id!' })
            : res.json(course)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No User with that ID' })
              : User.deleteMany( {_id: { $in: user.thoughts }})
          )
          .then(() => res.json({ message: 'User and Thoughts deleted!' }))
          .catch((err) => res.status(500).json(err));

    },
    addFriend(req, res) {
      console.log('You are adding a friend');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friends } },
        { runValidators: true, new: true }
      )
        .then((friend) =>
          !friend
            ? res
                .status(404)
                .json({ message: 'No student found with that ID :(' })
            : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      )
        .then((friend) =>
          !friend
            ? res
                .status(404)
                .json({ message: 'No friend found with that ID :(' })
            : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
    },
};

