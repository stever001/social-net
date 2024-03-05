const router = require('express').Router();
//const userRoutes = require('./userRoutes');
//router.use('/users', userRoutes);


//console.log({ getAllUsers, createUser, getUserById, updateUser, deleteUser, addFriend, removeFriend });

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/usersController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
