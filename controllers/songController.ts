import { Request, Response } from 'express'; // Importing necessary modules from Express
import Songs from '../models/songs'; // Importing Songs model

export async function getSongs(req: Request, res: Response) { // Function to get all songs
    try {
        const songs = await Songs.find(); // Finding all songs in the database
        res.send(songs); // Sending the songs as response
    } catch (e) {
        res.send({ message: 'There was a problem getting the songs.' }); // Sending error message if there's an issue
    }
}

export async function getSongById(req: Request, res: Response) { // Function to get a song by ID
    try {
        const songId = req.params.songId; // Getting song ID from request parameters
        const foundSong = await Songs.findById(songId).exec(); // Finding song by ID
        res.send(foundSong); // Sending the found song as response
    } catch (e) {
        console.log(e);
        res.send({ message: 'Song not found. Did you provide a valid songId?' }); // Sending error message if song is not found
    }
}

export async function getSongByArtistName(req: Request, res: Response) { // Function to get a song by artist name
    try {
        const artist = await Songs.findOne(req.params).exec(); // Finding song by artist name
        res.send(artist); // Sending the found song as response
    } catch (e) {
        res.send({ message: 'Artist not found, check name spelling and resubmit!' }); // Sending error message if artist is not found
    }
}

export async function addSong(req: Request, res: Response) { // Function to add a new song
    req.body.user = res.locals.currentUser; // Adding current user to the request body
    try {
        console.log('POSTING!', req.body);
        const song = await Songs.create(req.body); // Creating a new song in the database
        res.send({ song, message: "Song successfully added, Thank You!" }); // Sending success message
    } catch (e) {
        console.log(e);
        res.send({ message: "There was a problem adding song. Check you've provided all required fields." }); // Sending error message if there's an issue
    }
}

export async function deleteSong(req: Request, res: Response) { // Function to delete a song
    try {
        const songToDelete = await Songs.findById(req.params.songId); // Finding the song to delete by ID
        if (!songToDelete) {
            return res.send({ message: 'No song found.' }); // Sending error message if song is not found
        }
        // ? console.logging everything.
        console.log("currentUserID: ", res.locals.currentUser._id);
        console.log("song to delete: ", songToDelete);
        console.log("songUserID: ", songToDelete.user);
    
        if (res.locals.currentUser._id.equals(songToDelete.user)) { // Checking if current user is authorized to delete the song
            const songId = req.params.songId; // Getting song ID from request parameters
            const deletedSong = await Songs.findByIdAndDelete(songId); // Deleting the song from the database
            console.log('DELETING!', req.body);
            return res.send({ deletedSong, message: "Song deleted!!!" }); // Sending success message
        } else {
            return res.send({ message: "You are not authorized to delete this song." }); // Sending error message if user is not authorized
        }
    } catch (e) {
        res.send({ message: "There was a problem deleting your song." }); // Sending error message if there's an issue
    }
}

export async function updateSong(req: Request, res: Response) { // Function to update a song
    try {
        const songId = req.params.songId; // Getting song ID from request parameters
        const update = req.body; // Getting update data from request body
        const updatedSong = await Songs.findByIdAndUpdate(songId, update, { new: true }); // Updating the song in the database
        res.send({ updatedSong, message: 'Song Updated!' }); // Sending success message
        console.log(updatedSong);
    } catch (e) {
        res.send({ message: 'There was a problem updating your song.' }); // Sending error message if there's an issue
    }
}