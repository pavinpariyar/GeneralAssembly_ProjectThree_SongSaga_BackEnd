import mongoose, { Schema } from 'mongoose'; // Importing mongoose and Schema
import uniqueValidator from 'mongoose-unique-validator'; // Importing mongoose unique validator

interface ISong { // Interface for Song schema
    artist: string,
    name: string,
    album: string,
    user: mongoose.Schema.Types.ObjectId // Reference to user schema
    genre: string,
    albumCover: string,
    songLink: string,
}

const songSchema: Schema<ISong> = new mongoose.Schema<ISong>({ // Defining song schema
    artist: {
        type: String,
        min: [1, 'Too short of an artist name'], // Minimum length validation
        required: [true, 'Missing artist name'] // Required field validation
    },
    name: {
        type: String,
        min: [1, 'Too short for a song title'], // Minimum length validation
        required: [true, 'Missing song title'] // Required field validation
    },
    album: {
        type: String,
        min: [1, 'Too short of an album name'], // Minimum length validation
        required: [true, 'Missing album name'] // Required field validation
    },
    genre: {
        type: String,
        min: [1, 'Too short of a genre name'], // Minimum length validation
        required: [true, 'Missing genre name'] // Required field validation
    },
    albumCover: {
        type: String,
        min: [1, 'Too short of an album cover name'], // Minimum length validation
        required: [true, 'Missing album cover name'] // Required field validation
    },
    songLink: {
        type: String,
        min: [1, 'Too short of a song link'], // Minimum length validation
        required: [true, 'Missing song link'] // Required field validation
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true // Reference to User schema, required field
    }
});

songSchema.plugin(uniqueValidator); // Applying unique validator plugin

export default mongoose.model<ISong>('Song', songSchema); // Exporting model with Song interface and schema