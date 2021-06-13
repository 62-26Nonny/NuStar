var express         = require('express'),
    router          = express.Router(),
    artistSchema    = require('../schemas/artist'),
    songSchema      = require('../schemas/song')

router.get('/', async function(req, res){
    var artists = await artistSchema.find({}, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.render('song/artist_all.ejs', {artists: artists});
});

router.get('/:id', async function(req, res){
    var artist = await artistSchema.findById(req.params.id);

    songSchema.find({artist: artist._id}, function(err, songs){
        if(err){
            console.log(err);
        } else {
            res.render('song/artist.ejs', {artist: artist, songs: songs});
        }
    })
});

module.exports = router;