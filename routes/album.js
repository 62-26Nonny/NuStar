var express     = require('express'),
    router      = express.Router(),
    albumSchema = require('../schemas/album'),
    songSchema  = require('../schemas/song'),
    searchSchema = require('../schemas/search')

router.get('/', async function(req, res){
    var albums = await albumSchema.find({}, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    })
    res.render('song/album_all.ejs', {albums: albums});
});   

router.get('/:id', async function(req, res){
    var album = await albumSchema.findById(req.params.id);

    var songs = await songSchema.find({album: album._id}).populate('artist');

    var topSongs = await songSchema.find({}).limit(3).populate('artist').sort({favoriteCount: -1});

    var topSearches = await searchSchema.find({keyword: {$ne: ""}}).limit(10).sort({count: -1});

    res.render('song/album.ejs', {album: album, songs: songs, topSongs: topSongs, topSearches: topSearches})

});

module.exports = router;