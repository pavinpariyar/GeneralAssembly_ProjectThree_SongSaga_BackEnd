import { Request, Response } from 'express'
import Songs from '../models/songs'

export async function getSongs(req: Request, res: Response) {
    try {
        const songs = await Songs.find()
        res.send(songs)
    } catch (e) {
        res.send({ message: 'There was a problem getting the songs.' })
    }
}

export async function getSongById(req: Request, res: Response) {
    try {
        const songId = req.params.songId
        // console.log(req.params)
        const foundSong = await Songs.findById(songId).exec()
        res.send(foundSong)
        // console.log(foundSong)
    } catch (e) {
        console.log(e)
        res.send({ message: 'Song not found. Did you provide a valid songId?'})
    }
}

export async function getSongByArtistName(req: Request, res: Response) {
    try {
        const artist = await Songs.findOne(req.params).exec();
        // console.log(req.params) //? case sensitive to do fix
        res.send(artist)
  } catch (e) {
        res.send({ message: 'Artist not found, check name spelling and resubmitt!'})
  }
}

export async function addSong(req: Request, res: Response) {
    req.body.user = res.locals.currentUser
    try {
        console.log('POSTING!', req.body)
        const song = await Songs.create(req.body)
        res.send({song, message: "Song successfully added, Thank You!"})
  } catch (e) {
    console.log(e)
        res.send({ message: "There was a problem adding song. Check you're provide all required fields." })
  }
}

export async function deleteSong(req: Request, res: Response) {
    try {
    const songToDelete = await Songs.findById(req.params.songId)
    if (!songToDelete) {
      return res.send({ message: 'No song found.' })
    }
    // ? console.logging everything.
    console.log("currentUserID: ", res.locals.currentUser._id)
    console.log("song to delete: ", songToDelete)
    console.log("songUserID: ", songToDelete.user)
  
    if (res.locals.currentUser._id.equals(songToDelete.user)) {
      const songId = req.params.songId
      const deletedSong = await Songs.findByIdAndDelete(songId)
      console.log('DELETING!', req.body)
      return res.send({ deletedSong, message: "Song deleted!!!" })
    } else {
      return res.send({ message: "You are not authorized to delete this song." })
    }
  } catch (e) {
    res.send({ message: "There was a problem deleting your song." })
  }
}

export async function updateSong(req: Request, res: Response) {
    try {
        const songId = req.params.songId // Use the unique ID from Mongoose Compass
        const update = req.body //Updating information
        const updatedSong = await Songs.findByIdAndUpdate(songId, update, { new: true })
        res.send({updatedSong, message: 'Song Updated!'})
        console.log(updatedSong)
  } catch (e) {
        res.send({ message: 'There was a problem updating your song.'})
  }
}