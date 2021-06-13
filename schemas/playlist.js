const mongoose = require('mongoose');

const reqString = {
    type: String, 
    require: true
};

const reqFile = {
    type:Buffer,
    require: true
}

const playlistSchema = mongoose.Schema({
    name: reqString,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    songs: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'songs'
            }
        ], 
        default: []
    }
});

module.exports = mongoose.model('playlists', playlistSchema);