module.exports.isLoggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash('error', "Sign up or log in to create a listing");
        return res.redirect("/login"); // Redirect and stop further execution
    }
    next();
};





