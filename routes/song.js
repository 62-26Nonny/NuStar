var express         = require('express'),
    router          = express.Router(),
    songSchema      = require('../schemas/song'),
    artistSchema    = require('../schemas/artist'),
    albumSchema     = require('../schemas/album'),
    playlistSchema  = require('../schemas/playlist'),
    categorySchema  = require('../schemas/category'),
    searchSchema    = require('../schemas/search'),
    userSchema      = require('../schemas/user')

router.post('/search', function(req, res){
    var keyword = "";
    keyword = keyword + req.body.search;

    var data = {
        keyword: keyword.toLocaleLowerCase(),
    }

    searchSchema.updateOne(data, {
        $inc: {
            count: 1
        }
    }, {
        upsert: true
    }, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    })

    res.redirect('/song/search?keyword=' + keyword);
});

router.post('/search/sort', async function(req,res){
    var field = req.query.field;
    var sort = req.body.sort;
    var keyword = req.body.search;
    
    res.redirect('/song/search?keyword=' + keyword + '&sort=' + sort + '&field=' + field);
});

router.get('/search', async function(req,res){
    var field = req.query.field;
    if(field == "name"){
        var songs = await songSchema.find({name: {$regex: ".*" + req.query.keyword + ".*", $options: 'i'}})
                                    .populate('artist')
                                    .sort({name: req.query.sort})
                                    .collation({locale: 'en'});
        
        var artists = await artistSchema.find({name: {$regex: ".*" + req.query.keyword + ".*", $options: 'i'}})
                                    .sort({name: req.query.sort})
                                    .collation({locale: 'en'});
    
        var albums = await albumSchema.find({name: {$regex: ".*" + req.query.keyword + ".*", $options: 'i'}})
                                    .populate("songs")
                                    .sort({name: req.query.sort})
                                    .collation({locale: 'en'});
    } else if(field == "_id"){
        var songs = await songSchema.find({name: {$regex: ".*" + req.query.keyword + ".*", $options: 'i'}})
                                    .populate('artist')
                                    .sort({_id: req.query.sort})
                                    .collation({locale: 'en'});
        
        var artists = await artistSchema.find({name: {$regex: ".*" + req.query.keyword + ".*", $options: 'i'}})
                                    .sort({_id: req.query.sort})
                                    .collation({locale: 'en'});
    
        var albums = await albumSchema.find({name: {$regex: ".*" + req.query.keyword + ".*", $options: 'i'}})
                                    .populate("songs")
                                    .sort({_id: req.query.sort})
                                    .collation({locale: 'en'});
    } else {
        var songs = await songSchema.find({name: {$regex: ".*" + req.query.keyword + ".*", $options: 'i'}})
                                    .populate('artist')
                                    .collation({locale: 'en'});
        
        var artists = await artistSchema.find({name: {$regex: ".*" + req.query.keyword + ".*", $options: 'i'}})
                                    .collation({locale: 'en'});
    
        var albums = await albumSchema.find({name: {$regex: ".*" + req.query.keyword + ".*", $options: 'i'}})
                                    .populate("songs")
                                    .collation({locale: 'en'});
    }

    res.render('song/search.ejs', {songs: songs, artists: artists, albums: albums, keyword: req.query.keyword});
});

router.get('/top', async function(req,res){
    var topSongs = await songSchema.find().populate('artist').limit(12).sort({favoriteCount: -1});

    res.render('song/top_all.ejs', {topSongs: topSongs});
});

router.get('/:id', async function(req,res){
    var song_id = req.params.id;

    var song = await songSchema.findById(song_id).populate('artist').populate('album').populate('category');

    var topSongs = await songSchema.find({}).limit(3).populate('artist').sort({favoriteCount: -1});

    var topSearches = await searchSchema.find({keyword: {$ne: ""}}).limit(10).sort({count: -1});

    var familairSongs = await songSchema.find({category: song.category, _id: {$ne: song_id}}).populate('artist');

    if(req.isAuthenticated()){
        var userPlaylists = await playlistSchema.find({author: req.user._id});
        res.render('song/song.ejs', {song: song, topSongs: topSongs, topSearches: topSearches, familairSongs: familairSongs, userPlaylists: userPlaylists});
    } else {
        res.render('song/song.ejs', {song: song, topSongs: topSongs, topSearches: topSearches, familairSongs: familairSongs});
    }
});

router.post('/:id/add_to_playlist', async function(req,res){
    var songId = req.params.id;
    var playlistId = req.body.playlistId;

    var song = await songSchema.findOne({_id: songId});

    playlistSchema.findOne({_id: playlistId}, function(err, playlist){
        if(err){
            console.log(err);
        } else {
            playlist.songs.push(song);
            playlist.save();
            res.redirect('/song/' + songId);
        }
    })

});

router.post('/:id/remove_from_playlist', async function(req,res){
    var songId = req.params.id;
    var playlistId = req.body.playlistId;

    playlistSchema.findOne({_id: playlistId}, function(err, playlist){
        if(err){
            console.log(err);
        } else {
            var index = playlist.songs.indexOf(songId);
            playlist.songs.splice(index, 1);
            playlist.save();
            res.redirect('/song/' + songId);
        }
    })

});

router.post('/:id/add_to_favorite', async function(req,res){
    var songId = req.params.id;

    var song = await songSchema.findOneAndUpdate({_id: songId}, {$inc: {favoriteCount: 1}});

    userSchema.findOne({_id: req.user._id}, function(err, user){
        if(err){
            console.log(err);
        } else {
            user.favorites.push(song);
            user.save();
            res.redirect('/song/' + songId);
        }
    })

});

router.post('/:id/remove_from_favorite', async function(req,res){
    var songId = req.params.id;

    await songSchema.findOneAndUpdate({_id: songId}, {$inc: {favoriteCount: -1}});

    userSchema.findOne({_id: req.user._id}, function(err, user){
        if(err){
            console.log(err);
        } else {
            var index = user.favorites.indexOf(songId);
            user.favorites.splice(index, 1);
            user.save();
            res.redirect('/song/' + songId);
        }
    });
});

module.exports = router;