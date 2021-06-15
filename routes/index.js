var express     = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    userSchema  = require('../schemas/user'),
    songSchema  = require('../schemas/song'),
    artistSchema  = require('../schemas/artist'),
    albumSchema  = require('../schemas/album'),
    categorySchema  = require('../schemas/category')

// HOME
router.get('/', async function(req,res){

    var songs = await songSchema.find({}).limit(10).sort({_id: -1});

    var topSongs = await songSchema.find({}).limit(3).populate('artist').sort({favoriteCount: -1});

    var artists = await artistSchema.find({}).limit(5).sort({_id: -1});
    
    var albums = await albumSchema.find({}).limit(4).sort({_id: -1});

    var categories = await categorySchema.find({}).limit(5).sort({_id: -1});

    res.render('home.ejs', {songs: songs, topSongs: topSongs, artists: artists, albums: albums, categories: categories});
});

// SIGN UP
router.post('/sign_up', function(req, res){
    var username = req.body.username;
    var email = req.body.email;
    var data = {
        username: username,
        email: email
    }
    var newUser = new userSchema(data);
    userSchema.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.render('sign_up.ejs');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to NuStar ' + user.username);
            res.redirect('/');
        });
    });
});
router.get('/sign_up', function(req,res){
    res.render('sign_up.ejs');
}); 

// SIGN IN
router.post('/sign_in', passport.authenticate('local',
    {
        failureRedirect: '/sign_in',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Successfully sign in',
        failureFlash: 'Invalid username or email'
    }), function(req, res){
        if(req.user.admin){
            res.redirect('/admin/song_management/song');
        } else {
            if(req.query.BackURL){
                res.redirect(req.query.BackURL);
            } else {
                res.redirect('/');
            }
        }
});
router.get('/sign_in', function(req,res){
    res.render('sign_in.ejs', {BackURL: req.query.BackURL});
});

// SIGN OUT
router.get('/sign_out', function(req, res){
    req.logOut();
    req.flash('success', 'You have sign out.');
    res.redirect('/');
})

// MEMBERSHIP
router.get('/membership', function(req, res){
    res.render('member.ejs');
})

module.exports = router;