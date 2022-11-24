# Module18Challenge

## Description

The motivation for this project was to create a social media backend functionality with using a NoSQL database. The database used was MongoDB and the functionality added to this application is to create users, add other users as friends, create thoughts, add reactions(comments) to those thoughts and be able to delete any of those things made. 

## Installation

The following is a step by step instruction on how to download the source code of the project and develop with it:

- Head to https://github.com/ConstantMotion1/Module18Challenge and git clone the https link
- Open git bash terminal and install all packages used but typing 'npm i'
- To run the localhost type 'npm run test'
- open Insomnia and run fetch methods with that

## Usage

To use this application: 

- Follow instructions from the 'installation tab'
- /api/thoughts
  router.route('/').get(getThoughts).post(createThought);

  /api/thoughts/:thoughtId
  router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

  /api/users/:userId/friends
  router.route('/:thoughtId/reactions').put(addReaction);

  /api/users/:userId/friends/:friendsId
  router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

- /api/users
  router.route('/').get(getUsers).post(createUser);

  /api/users/:userId
  router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

  /api/users/:userId/friends
  router.route('/:userId/friends').put(addFriend);

  /api/users/:userId/friends/:friendsId
  router.route('/:userId/friends/:friendsId').delete(removeFriend);

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Link

The following is the link to the video showing the functionsality of the controllers:

https://drive.google.com/file/d/1fFI4ixTp_oTjrRmaihubkje5wjAY_Of6/view