var express         = require('express'),
    router          = express.Router(),
    middleware      = require('../middleware/index'),
    songSchema      = require('../schemas/song'),
    artistSchema    = require('../schemas/artist'),
    albumSchema     = require('../schemas/album'),
    categorySchema  = require('../schemas/category'),
    userSchema      = require('../schemas/user')

// MANAGE
router.get('/song_management/song', middleware.isSigned, async function(req,res){
    var user = req.user;

    var artists = await artistSchema.find();

    var albums = await albumSchema.find();

    var categories = await categorySchema.find();

    var keyword = req.query.keyword || "";

    if(req.query.sort){
        var songs = await songSchema.find({name: {$regex: ".*" + keyword + ".*", $options: 'i'}})
                                    .populate('artist').populate('album').populate('category')
                                    .sort({name: req.query.sort})
                                    .collation({locale: 'en'});
    } else {
        var songs = await songSchema.find({name: {$regex: ".*" + keyword + ".*", $options: 'i'}})
                                    .populate('artist').populate('album').populate('category')
                                    .collation({locale: 'en'});
    }
    
    res.render('admin/songManage.ejs', {user: user, songs: songs, artists: artists, albums: albums, categories: categories, keyword: keyword});
});

router.get('/song_management/artist', middleware.isSigned, async function(req,res){
    var user = req.user;
    
    var keyword = req.query.keyword || "";

    if(req.query.sort){
        var artists = await artistSchema.find({name: {$regex: ".*" + keyword + ".*", $options: 'i'}})
                                        .sort({name: req.query.sort})
                                        .collation({locale: 'en'});
    } else {
        var artists = await artistSchema.find({name: {$regex: ".*" + keyword + ".*", $options: 'i'}})
                                        .collation({locale: 'en'});
    }

    res.render('admin/artistManage.ejs', {user: user, artists: artists, keyword: keyword});
});

router.get('/song_management/album', middleware.isSigned, async function(req,res){
    var user = req.user;
    
    var keyword = req.query.keyword || "";

    if(req.query.sort){
        var albums = await albumSchema.find({name: {$regex: ".*" + keyword + ".*", $options: 'i'}})
                                    .sort({name: req.query.sort})
                                    .collation({locale: 'en'});
    } else {
        var albums = await albumSchema.find({name: {$regex: ".*" + keyword + ".*", $options: 'i'}})
                                    .collation({locale: 'en'});
    }

    res.render('admin/albumManage.ejs', {user: user, albums: albums, keyword: keyword});
});

router.get('/song_management/category', middleware.isSigned, async function(req,res){
    var user = req.user;
    
    var keyword = req.query.keyword || "";

    if(req.query.sort){
        var categories = await categorySchema.find({name: {$regex: ".*" + keyword + ".*", $options: 'i'}})
                                            .sort({name: req.query.sort})
                                            .collation({locale: 'en'});
    } else {
        var categories = await categorySchema.find({name: {$regex: ".*" + keyword + ".*", $options: 'i'}})
                                            .collation({locale: 'en'});
    }

    res.render('admin/categoryManage.ejs', {user: user, categories: categories, keyword: keyword});
});

router.get('/user_management', middleware.isSigned, async function(req,res){
    var user = req.user;

    var keyword = req.query.keyword || "";

    if(req.query.sort){
        var users = await userSchema.find({username: {$regex: ".*" + keyword + ".*", $options: 'i', $nin: req.user.username}})
                                    .sort({username: req.query.sort})
                                    .collation({locale: 'en'});
    } else {
        var users = await userSchema.find({username: {$regex: ".*" + keyword + ".*", $options: 'i', $nin: req.user.username}})
                                    .collation({locale: 'en'});
    }

    res.render('admin/userManage.ejs', {user: user, users: users, keyword: keyword});
});

// SONG
router.post('/song/new', middleware.isSigned, async function(req,res){
    var name = req.body.songName

    var artistName = req.body.songArtist
    var artist = await artistSchema.findOne({name: artistName}, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });

    var albumName = req.body.songAlbum
    var album = await albumSchema.findOne({name: albumName}, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });

    var categoryName = req.body.songCategory
    var category = await categorySchema.findOne({name: categoryName}, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });

    var cover = req.body.songCover; 
    var lyrics = req.body.songLyrics;
    var file = req.body.songFile;

    var data = {
        name: name,
        artist: artist,
        album: album,
        category: category,
        cover: cover,
        lyrics: lyrics,
        file: file
    };

    songSchema.create(data, function(err, song){
        if(err){
            console.log(err);
        } else {
            console.log(song);
        }
    });
    res.redirect('/admin/song_management/song');
});

router.post('/song/update', middleware.isSigned, async function(req,res){
    var id = req.body.submit;
    var query = {_id: id};

    var artistName = req.body.songArtist;
    var artist = await artistSchema.findOne({name: artistName}, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });

    var albumName = req.body.songAlbum;
    var album = await albumSchema.findOne({name: albumName}, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });

    var categoryName = req.body.songCategory;
    var category = await categorySchema.findOne({name: categoryName}, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });

    var name = req.body.songName;
    var cover = req.body.songCover; 
    var lyrics = req.body.songLyrics;
    var file = req.body.songFile;

    var newValues = { $set: {
        name: name,
        artist: artist,
        album: album,
        category: category,
        cover: cover,
        lyrics: lyrics,
        file: file
        }
    }

    songSchema.updateOne(query, newValues, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/admin/song_management/song');
});

router.post('/song/:id/delete', middleware.isSigned, function(req,res){
    var id = req.params.id;
    var query = {_id: id};

    songSchema.deleteOne(query, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/admin/song_management/song');
});

// ARTIST
router.post('/artist/new', middleware.isSigned, function(req,res){
    var name = req.body.artistName;
    var image = req.body.artistImage;
    var data = {
        name: name,
        image: image
    };

    artistSchema.create(data, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/admin/song_management/artist');
});

router.post('/artist/update', middleware.isSigned, function(req,res){
    var id = req.body.submit;
    var query = {_id: id};

    var name = req.body.artistName;
    var image = req.body.artistImage;

    if(image === null){
        var newValues = {$set: {
            name: name,
        }}
    } else {
        var newValues = {$set: {
            name: name,
            image: image
        }}
    }

    artistSchema.updateOne(query, newValues, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/admin/song_management/artist');
});

router.post('/artist/:id/delete', middleware.isSigned, function(req,res){
    var id = req.params.id;
    var query = {_id: id};

    artistSchema.deleteOne(query, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/admin/song_management/artist');
});

// ALBUM
router.post('/album/new', middleware.isSigned, function(req,res){
    var name = req.body.albumName;
    var cover = req.body.albumCover;
    var data = {
        name: name,
        cover: cover
    };

    albumSchema.create(data, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/admin/song_management/album');
});

router.post('/album/update', middleware.isSigned, function(req,res){
    var id = req.body.submit;
    var query = {_id: id};

    var name = req.body.albumName;
    var cover = req.body.albumCover;

    if(cover === null){
        var newValues = {$set: {
            name: name,
        }}
    } else {
        var newValues = {$set: {
            name: name,
            cover: cover
        }}
    }

    albumSchema.updateOne(query, newValues, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/admin/song_management/album');
});

router.post('/album/:id/delete', middleware.isSigned, function(req,res){
    var id = req.params.id;
    var query = {_id: id};

    albumSchema.deleteOne(query, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/admin/song_management/album');
});

// CATEGORY
router.post('/category/new', middleware.isSigned, function(req,res){
    var name = req.body.categoryName;
    var image = req.body.categoryImage;
    var data = {
        name: name,
        image: image
    };

    categorySchema.create(data, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/admin/song_management/category');
});

router.post('/category/update', middleware.isSigned, function(req,res){
    var id = req.body.submit;
    var query = {_id: id};

    var name = req.body.categoryName;
    var image = req.body.categoryImage;

    if(image === null){
        var newValues = {$set: {
            name: name,
        }}
    } else {
        var newValues = {$set: {
            name: name,
            image: image
        }}
    }

    categorySchema.updateOne(query, newValues, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/admin/song_management/category');
});

router.post('/category/:id/delete', middleware.isSigned, function(req,res){
    var id = req.params.id;
    var query = {_id: id};

    categorySchema.deleteOne(query, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/admin/song_management/category');
});

// USER
router.post('/user/:id/delete', middleware.isSigned, function(req,res){
    var id = req.params.id;
    var query = {_id: id};

    userSchema.deleteOne(query, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/admin/user_management');
});

// SEARCH
router.post('/search', middleware.isSigned, function(req, res){
    var keyword = "";
    keyword = keyword + req.body.keyword;

    res.redirect(req.query.BackURL + '?keyword=' + keyword);
});

// SORT
router.post('/sort', middleware.isSigned, function(req, res){
    var keyword = "";
    keyword = keyword + req.body.keyword;

    res.redirect(req.query.BackURL + '?keyword=' + keyword + '&sort=' + req.body.sort);
});

module.exports = router;