var express         = require('express'),
    router          = express.Router(),
    categorySchema  = require('../schemas/category'),
    songSchema      = require('../schemas/song')

router.get('/', async function(req, res){
    var categories = await categorySchema.find({}, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    })
    res.render('song/category_all.ejs', {categories: categories});
});

router.get('/:id', async function(req, res){
    var category = await categorySchema.findById(req.params.id);

    var songs = await songSchema.find({category: category._id}).populate('artist');

    res.render('song/category.ejs', {category: category, songs: songs});
});

module.exports = router;