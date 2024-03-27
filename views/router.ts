import express  from "express"
import Songs from '../models/songs'
import users from "../models/users"
import { addSong, deleteSong, getSongById, getSongs, updateSong, } from "../controllers/songController"
import { getCurrentUser, getUserById, getUsers, login, signup, } from "../controllers/userController"
import secureRoute from "../middleware/secureRoute"

const router = express.Router()
// <--------Get Songs--------->
router.route('/api/songs').get(getSongs)

// <----------Get a single item---------->
router.route('/api/songs/:songId').get(getSongById)
// router.route('/api/songs/artist/:artist').get(getSongByArtistName) //? Possibly deletion, will test front end search function. 

// <--------Post a song--------->
//! Route is secured.
router.route('/api/songs').post(secureRoute, addSong)

// <--------Delete----------->
//! Route is secured.
router.route('/api/songs/:songId').delete(secureRoute, deleteSong)

//<--------Put---------->
//! Route is secured.
router.route('/api/songs/:songId').put(secureRoute, updateSong)

// get all users
//! Route is secured.
router.route('/api/users').get(secureRoute, getUsers) //? possible deletion, maybe stretch goal.

// get user by userId
//! Route is secured.
router.route('/api/users/:userId').get(secureRoute, getUserById) //? possible deletion, maybe stretch goal.

// signup a new user
router.route('/api/signup').post(signup)

// delete a user 
//! Route is secured.
// router.route('/api/users/:userId').delete(secureRoute, deleteUser)//? possible deletion, maybe stretch goal.

// updating a user
//! Route is secured.
// router.route('/api/users/:userId').put(secureRoute, updateUser)//? possible deletion, maybe stretch goal.

// login a user
router.route('/api/login').post(login)

// ! Get current user.
router.route('/api/user').get(secureRoute, getCurrentUser)//? possible deletion, maybe stretch goal.

export default router