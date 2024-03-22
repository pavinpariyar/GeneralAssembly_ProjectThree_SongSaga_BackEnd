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
    { artist: 'The Winking Owl', name: 'Silver Lining', album: 'Blooming', genre: 'Rock', albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/12/f6/d0/12f6d016-0388-862a-9e7f-b9f85b257491/dj.wohwtjcq.jpg/600x600bf-60.jpg', songLink: 'https://www.youtube.com/watch?v=smeZ3tJJSFw' },
    { artist: 'Jay Park', name: 'To Life', album: 'To Life', genre: 'Rock', albumCover: 'https://i.scdn.co/image/ab67616d00001e02978aebe8d5533f2ee7ab5a26', songLink: 'https://www.youtube.com/watch?v=0kUPSYm8pNE' },
    { artist: 'Kiiara', name: 'Intentions', album: 'Lil Kiiwi', genre: 'Rock', albumCover: 'https://upload.wikimedia.org/wikipedia/en/d/d0/Lil_kiiwi_Kiiara.jpg', songLink: 'https://www.youtube.com/watch?v=M49RQzhri5E' },
    { artist: 'Whipped Cream', name: 'Cry', album: 'Cry', genre: 'Rock', albumCover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5FRMhAHH2ooVg-C4ukdGRXrnmct9DYFZEHxzt46xvdA&s', songLink: 'https://www.youtube.com/watch?v=joFRkyW-szk' },
    { artist: 'Taylor Swift', name: 'Daylight', album: 'Lover', genre: 'Pop', albumCover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTldCJ_XRWId85O3Z8y9yI4yvKUF176h8YbQ-1QcygJjw&s', songLink:'https://www.youtube.com/watch?v=u9raS7-NisU'},
    { artist: 'Taylor Swift', name: 'State of Grace', album: 'Red (Taylors Version)', genre: 'Pop', albumCover:'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Taylor_Swift_-_Red_%28Taylor%27s_Version%29.png/220px-Taylor_Swift_-_Red_%28Taylor%27s_Version%29.png', songLink: "https://www.youtube.com/watch?v=gr4cqcqnAN0" },
    { artist: 'Concrete Blonde', name: 'Tomorrow, Wendy', album:'Bloodletting', genre: 'Rock', albumCover: 'https://upload.wikimedia.org/wikipedia/en/6/66/Concrete_Blonde_-_Bloodletting_-_Front.jpg', songLink: 'https://www.youtube.com/watch?v=Lc1na692wUU'}, 
    { artist: 'Arlo Parks ft. Phoebe Bridgers', name: 'Pegasus', album:'My Soft Machine', genre: 'Indie', albumCover:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deezer.com%2Fen%2Falbum%2F429098067&psig=AOvVaw3YLLCDJ0iEfabgTWglW0-3&ust=1711207941692000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCZ0b2YiIUDFQAAAAAdAAAAABAE', songLink: 'https://www.youtube.com/watch?v=SjvzQxGELlE' },
    { artist: 'Phoebe Bridgers', name: 'Moon Song', album: 'Punisher', genre: 'Indie', albumCover: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FPunisher_%2528album%2529&psig=AOvVaw2l0Du1YblLK7rxSEuXFqlo&ust=1711208047741000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODv3PCYiIUDFQAAAAAdAAAAABAE', songLink: 'https://www.youtube.com/watch?v=DXqZ66XK3z8'}, 
    { artist: 'Phoebe Bridgers', name: 'Scott Street', album: 'Stranger in the Alp s', genre:'Indie', albumCover: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Phoebe_Bridgers_%E2%80%93_Stranger_in_the_Alps.png', songLink: 'https://www.youtube.com/watch?v=BBBxzmyeNdw'}, 
    { artist: 'Kacey Musgraves', name: 'Space Cowboy', album: 'Golden Hour', genre: 'Country', albumCover: 'https://upload.wikimedia.org/wikipedia/en/6/65/Kacey_Musgraves_-_Golden_Hour.png', songLink: 'https://www.youtube.com/watch?v=Kw0ih4jPOBo'}, 
    { artist: 'Lana Del Rey', name: 'The Blackest Day', album: 'Honeymoon', genre: 'Pop', albumCover: 'https://upload.wikimedia.org/wikipedia/en/7/75/Lana_Del_Rey_-_Honeymoon_%28Official_Album_Cover%29.png', songLink: 'https://www.youtube.com/watch?v=BiKYRNoyzZ0' }, 
    { artist: 'Lana Del Rey', name: 'White Mustang', album: 'Lust for Life', genre: 'Pop', albumCover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR42azaxEK0s41fEYcl5rNeV2Ceay2-tkOw1EigLVlaYA&s', songLink: 'https://www.youtube.com/watch?v=F4ELqraXx-U'  }, 
    { artist: 'Fleetwood Mac', name: 'Silver Springs', album: 'Rumours', genre: 'Rock', albumCover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx4xCp0AejGkkp1BFL260JGGJMu3FicfspS6eOz8dyUw&s", songLink: 'https://www.youtube.com/watch?v=kVE4aOUX2iM' }, 
    { artist: 'Ed Sheeran', name: 'Shivers', album: '=', genre: 'Pop', albumCover: 'https://upload.wikimedia.org/wikipedia/en/b/b0/Ed_Sheeran_-_Shivers.png', songLink: 'https://www.youtube.com/watch?v=z2_Lrg6rRks&ab_channel=EdSheeran' },
    { artist: 'Dua Lipa', name: 'Levitating', album: 'Future Nostalgia', genre: 'Pop', albumCover: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Dua_Lipa_Levitating_%28DaBaby_Remix%29.png', songLink: 'https://www.youtube.com/watch?v=WHuBW3qKm9g&ab_channel=DuaLipa' },
    { artist: 'The Weeknd', name: 'Take My Breath', album: 'Single', genre: 'R&B', albumCover: 'https://upload.wikimedia.org/wikipedia/en/1/11/The_Weeknd_-_Take_My_Breath.png', songLink: 'https://www.youtube.com/watch?v=eT1E3gmST9U&ab_channel=TheWeekndVEVO' },
    { artist: 'Tame Impala', name: 'New Person, Same Old Mistakes', album: 'Currents', genre: 'Psychedelic Pop', albumCover: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png', songLink: 'https://www.youtube.com/watch?v=_9bw_VtMUGA&ab_channel=tameimpalaVEVO' },
    { artist: 'Doja Cat', name: 'Kiss Me More (feat. SZA)', album: 'Planet Her', genre: 'Pop', albumCover: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Doja_Cat_-_Kiss_Me_More.png', songLink: 'https://www.youtube.com/watch?v=1oMgxa32A7g&ab_channel=SyrebralVibes' },
    { artist: 'Justin Bieber', name: 'Peaches (feat. Daniel Caesar & Giveon)', album: 'Justice', genre: 'Pop', albumCover: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Justin_Bieber_-_Peaches.png', songLink: 'https://www.youtube.com/watch?v=kGcoKuK08-c&ab_channel=LatinHype' },
    { artist: 'Post Malone', name: 'Circles', album: "Hollywood's Bleeding", genre: 'Hip-Hop', albumCover: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Post_Malone_-_Circles.png', songLink: 'https://www.youtube.com/watch?v=0sca9FP6zl8&ab_channel=PopularMusic' },
    { artist: 'SZA', name: 'Good Days', album: 'Single', genre: 'R&B', albumCover: 'https://upload.wikimedia.org/wikipedia/en/7/7c/SZA_-_Good_Days.png', songLink: 'https://www.youtube.com/watch?v=oh64haEP9g8&ab_channel=SZAVEVO' },
    { artist: 'BTS', name: 'Butter', album: 'Single', genre: 'K-Pop', albumCover: 'https://upload.wikimedia.org/wikipedia/en/d/db/BTS_-_Butter.png', songLink: 'https://www.youtube.com/watch?v=mAv9olaNzr8&ab_channel=LyricsZone' },
    { artist: 'Glass Animals', name: 'Heat Waves', album: 'Dreamland', genre: 'Alternative', albumCover: 'https://upload.wikimedia.org/wikipedia/en/b/b0/Glass_Animals_-_Heat_Waves.png', songLink: 'https://www.youtube.com/watch?v=rfTgO9rpqck&ab_channel=LatinHype' },
    { artist: 'Ailee', name: 'Insane', album: 'VIVID', genre: 'K-Pop', albumCover: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Vivid-Ailee.jpg/220px-Vivid-Ailee.jpg', songLink: 'https://www.youtube.com/watch?v=nKQvL-jzvvw&pp=ygUMYWlsZWUgaW5zYW5l' },
    { artist: 'Yuuri', name: 'Dried Flower', album: 'Ichi', genre: 'Rock', albumCover: 'https://static.wikia.nocookie.net/jpop/images/6/67/Ichi.jpg/revision/latest?cb=20220401124020', songLink: 'https://www.youtube.com/watch?v=kzZ6KXDM1RI' },
    { artist: 'Keshi', name: '2 Soon', album: 'The Reaper - EP', genre: 'Hip-Hop', albumCover: 'https://static.wikia.nocookie.net/keshi/images/6/65/The_Reaper.jpg/revision/latest/scale-to-width-down/1000?cb=20220416080659', songLink: 'https://www.youtube.com/watch?v=LKZyp2cSAy4&pp=ygUMa2VzaGkgMiBzb29u' },
    { artist: 'JO1', name: '16(Sixteen)', album: 'Midnight Sun', genre: 'J-Pop', albumCover: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Midnight_Sun_Normal_Edition_cover.jpg/220px-Midnight_Sun_Normal_Edition_cover.jpg', songLink: 'https://www.youtube.com/watch?v=VQgPP1u_DME&pp=ygULam8xIHNpeHRlZW4%3D' },
    { artist: 'Mew Suppasit', name: 'Nan Na', album: '365', genre: 'Hip-Hop', albumCover: 'https://static.wikia.nocookie.net/thai_entertainment/images/9/94/Mew_Suppasit_365_cover_image.png/revision/latest/scale-to-width-down/1000?cb=20230222145705', songLink: 'https://www.youtube.com/watch?v=a7q-lDoGnoc&pp=ygUUbWV3IHN1cHBhc2l0IG5hbiBuYSA%3D' },
    { artist: 'Mukade & Inman', name: 'Hitorijanai', album: 'Episode III', genre: 'Rap', albumCover: 'https://e-cdn-images.dzcdn.net/images/cover/f12df1d2ffa37706054eb6c9a0482e3f/500x500-000000-80-0-0.jpg', songLink: 'https://www.youtube.com/watch?v=u7rBhwaMGwM' },

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
