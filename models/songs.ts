import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

interface ISong {
    artist: string,
    name: string,
    album: string,
    user: mongoose.Schema.Types.ObjectId
    genre: string,
    albumCover: string,
    songLink: string,
}

const songSchema: Schema<ISong> = new mongoose.Schema<ISong>({
    artist: {
        type: String,
        min: [1, 'Too short artist name'],
        required: [true, 'Missing artist name']
    },
    name: {
        type: String,
        min: [1, 'Too short for a song title'],
        required: [true, 'Missing song title']
    },
    album: {
        type: String,
        min: [1, 'Too short of an album name'],
        required: [true, 'Missing album name']
    },
    genre: {
        type: String,
        min: [1, 'Too short of a genre name'],
        required: [true, 'Missing genre name']
    },
    albumCover: {
        type: String,
        min: [1, 'Too short of an album cover'],
        required: [true, 'Missing album cover']
    },
    songLink: {
        type: String,
        min: [1, 'Too short of a song link'],
        required: [true, 'Missing song link']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
    }
})

songSchema.plugin(uniqueValidator)

export default mongoose.model<ISong>('Song', songSchema)