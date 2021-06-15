var express         = require('express'),
    router          = express.Router(),
    artistSchema    = require('../schemas/artist'),
    songSchema      = require('../schemas/song')

router.get('/', async function(req, res){
    var artists = await artistSchema.find({}).limit(12).sort({followCount: -1});
    
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