const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const reqString = {
    type: String, 
    require: true
};

const userSchema = mongoose.Schema({
    email: reqString,
    username: reqString,
    password: reqString,
    privilage: {
        type: String,
        default: "User"
    },
    image: {
        type: Buffer,
        default: ""
    },
    NuRank: {
        type: Number,
        default: 1
    },
    favorites: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'songs'
            }
        ], 
        default: []
    },
    playlists: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'playlists'
            }
        ], 
        default: []
    },
    follow: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'artists'
            }
        ],
        default: []
    },
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', userSchema);