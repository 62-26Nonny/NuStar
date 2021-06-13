const   express         = require('express'),
        app             = express(),
        bodyPaser       = require('body-parser'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        multer          = require('multer'),
        flash           = require('connect-flash')

const   songRoute       = require('./routes/song'),
        playlistRoute   = require('./routes/playlist'),
        artistRoute     = require('./routes/artist'),
        albumRoute      = require('./routes/album'),
        categoryRoute   = require('./routes/category'),
        indexRoute      = require('./routes/index'),
        userRoute       = require('./routes/user'),
        adminRoute      = require('./routes/admin')

const   userSchema      = require('./schemas/user')

mongoose.connect('mongodb://localhost/NuStar',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyPaser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(flash());
app.set('view engine', 'ejs');

// Passport Setup
app.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
    // usernameField: 'email'
}, userSchema.authenticate()));
passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoute);
app.use('/song', songRoute);
app.use('/playlist', playlistRoute);
app.use('/album', albumRoute);
app.use('/artist', artistRoute);
app.use('/category', categoryRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);

// 404 PAGE
app.get('*', function(req, res){
    res.render('error.ejs');
})

app.listen('3000', function(req, res){
    console.log('Server is running');
});

