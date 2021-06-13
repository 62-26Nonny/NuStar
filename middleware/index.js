var middlewareObj = {}

middlewareObj.isSigned = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    var BackURL = req.header('Referer') || '/';
    req.flash('error', 'You need to sign in first.');
    res.redirect('/sign_in?BackURL=' + BackURL);
}

module.exports = middlewareObj;