import mongoose from 'mongoose'
import Songs from '../models/songs'
import Users from '../models/users'

const adminUser = [
    {
        "username": "admin",
        "email": "admin@admin.com",
        "password": "Admin#123"
    }
]

const songData = [
    { artist: 'The Winking Owl', name: 'Silver Lining', album: 'Blooming', genre: 'Rock', albumCover: 'sometempalbumcover', songLink: 'moretempsonglink' },
    { artist: 'Jay Park', name: 'To Life', album: 'To Life', genre: 'Rock', albumCover: 'sometempalbumcover', songLink: 'moretempsonglink' },
    { artist: 'Kiiara', name: 'Intentions', album: 'Lil Kiiwi', genre: 'Rock', albumCover: 'sometempalbumcover', songLink: 'moretempsonglink' },
    { artist: 'Whipped Cream', name: 'Cry', album: 'Cry', genre: 'Rock', albumCover: 'sometempalbumcover', songLink: 'moretempsonglink' }
]

async function seed() {

    //? Connects to Mongodb via Mongoose. Include database name and 'db' at the end of the file path.
    await mongoose.connect('mongodb://127.0.0.1:27017/songsdb')
    console.log('Connected to the database! 🧬')

    //? Removes all previous entries to the database.
    await mongoose.connection.db.dropDatabase()
    console.log('Remove existing data.')

    //? Before songs is seeded, we seed adminUser.
    const users = await Users.create(adminUser)
    const user = users[0]
    console.log(user)

    //? Add the user to each song. Now each song has a user.
    songData.forEach((song: any) => song.user = user)
    console.log(songData)

    //? Adds the songData to the database.
    const songs = await Songs.create(songData)
    console.log('Here are the songs:')
    console.log(songs)

    //? Should always disonnect from Mongodb. 
    console.log('Disconnecting 🧨..')
    await mongoose.disconnect()
}

seed()
