var express     = require('express'),
    router      = express.Router(),
    middleware  = require('../middleware/index'),
    userSchema  = require('../schemas/user'),
    playlistSchema = require('../schemas/playlist'),
    songSchema  = require('../schemas/song'),
    searchSchema = require('../schemas/search')

// HOME
router.get('/', middleware.isSigned, async function(req,res){
    userSchema.findOne({_id: req.user._id}).populate({
        path: 'playlists',
        populate: {
            path: 'songs',
            model: 'songs'
        }
    }).populate({
        path: 'favorites',
        populate: {
            path: "artist",
            model: "artists"
        }
    }).exec(function(err, user){
        if(err){
            console.log(err);
        } else {
            console.log(user);
            res.render('user.ejs', {user: user});
        }
    })
});

// UPDATE
router.post('/update_profile', middleware.isSigned, async function(req,res){
    var username = req.body.username;
    var email = req.body.email;
    var userImage = req.body.userImage;
    var newValues = {
        username: username,
        email: email,
        image: userImage
    }
    userSchema.findByIdAndUpdate(req.user._id, newValues, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    })

    res.redirect('/user');
});

// PLAYLIST
router.get('/playlist/:id', middleware.isSigned, async function(req, res){
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

// PAYMENT
router.get('/payment', middleware.isSigned, async function(req, res){

    res.render('payment.ejs', {order: req.query.order, order_price: req.query.order_price});
});

router.post('/payment/:promotion', middleware.isSigned, async function(req, res){

    var promotion = req.params.promotion;

    var newValues = {$set: {
        privilage: "Membership"
    }}

    if(promotion == "Mouthly"){
        var newValues = {
            $set: {
                privilage: "Membership"
            },
            $inc: {
                NuRank: 1
            }
        }
    } else if(promotion == "Yearly"){
        var newValues = {
            $set: {
                privilage: "Membership"
            },
            $inc: {
                NuRank: 20
            }
        }
    }

    userSchema.updateOne({_id: req.user._id}, newValues, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    })

    res.redirect('/');
});

module.exports = router;