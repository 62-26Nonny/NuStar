var express     = require('express'),
    router      = express.Router(),
    userSchema  = require('../schemas/user'),
    playlistSchema = require('../schemas/playlist'),
    songSchema  = require('../schemas/song'),
    searchSchema = require('../schemas/search')

router.get('/', async function(req, res){
    var playlists = await playlistSchema.find().populate('songs');
    
    res.render('song/playlist_all.ejs', {playlists: playlists});
});   

router.get('/:id', async function(req, res){
    var playlist = await playlistSchema.findById(req.params.id).populate({
        path: 'songs',
        populate: {
            path: "artist",
            model: "artists"
        }
    });

    var topSongs = await songSchema.find({}).limit(3).populate('artist').sort({favoriteCount: -1});

    var topSearches = await searchSchema.find({keyword: {$ne: ""}}).limit(10);

    res.render('song/playlist.ejs', {playlist: playlist, topSongs: topSongs, topSearches: topSearches})
});

router.post('/new', async function(req, res){
    var name = req.body.playlistName;
    var userId = req.body.userId;

    var data = {
        name: name,
        author: req.user
    }

    playlistSchema.create(data, function(err, playlist){
        if(err){
            console.log(err);
        } else {
            userSchema.findOne({_id: userId}, function(err, user){
                if(err){
                    console.log(err);
                } else {
                    user.playlists.push(playlist);
                    user.save();
                } 
            })
        }
    })
    res.redirect('/user');
});

module.exports = router;