import express  from "express"
import Songs from '../models/songs'
import users from "../models/users"
import { addSong, deleteSong, getSongByArtistName, getSongById, getSongs, updateSong } from "../controllers/songController"
import { deleteUser, getCurrentUser, getUserById, getUsers, login, signup, updateUser } from "../controllers/userController"
import secureRoute from "../middleware/secureRoute"

const router = express.Router()
// <--------Get Songs--------->
router.route('/api/songs').get(getSongs)

// <----------Get a single item---------->
router.route('/api/songs/:songId').get(getSongById)

router.route('/api/songs/artist/:artist').get(getSongByArtistName)

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
router.route('/api/users').get(secureRoute, getUsers)

// get user by userId
//! Route is secured.
router.route('/api/users/:userId').get(secureRoute, getUserById)

// signup a new user
router.route('/api/signup').post(signup)

// delete a user 
//! Route is secured.
router.route('/api/users/:userId').delete(secureRoute, deleteUser)

// updating a user
//! Route is secured.
router.route('/api/users/:userId').put(secureRoute, updateUser)

// login a user
router.route('/api/login').post(login)

//! Get current user.
router.route('/api/user').get(secureRoute, getCurrentUser)

export default router