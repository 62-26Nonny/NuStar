const mongoose = require('mongoose');

const reqString = {
    type: String, 
    require: true
};

const reqFile = {
    type:Buffer
}

const songSchema = mongoose.Schema({
    name: reqString,
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artists'
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'albums',
        default: "----"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    cover: reqFile,
    lyrics: reqFile,
    file: reqFile,
    favoriteCount: {
        type: Number,
        default: 0
    } 
});

module.exports = mongoose.model('songs', songSchema);