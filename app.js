if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const mongoose = require('mongoose');
const Listing = require('./models/listings');
const Review = require("./models/review/review.js")
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const wrapAsync = require('./utils/wrapasync')
const ExpressError = require('./utils/ExpressError');
const { error } = require('console');
const middleware = require('./views/middleware.js')
app.use(methodOverride('X-HTTP-Method-Override'))
ejsMate = require('ejs-mate'),
    app.engine('ejs', ejsMate)
const multer = require('multer')
const { storage } = require('./cloudinary.js')
const upload = multer({ storage })
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const MAP_TOKEN = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: MAP_TOKEN });

//Main mongose connection.
main().then(() => {
    console.log('mongoose working well')
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}
 
//passport
const User = require("./models/users/users.js")
const passport = require('passport')
const LocalStrategy = require('passport-local')

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
    console.log(`App is listening at port:${port}`);
});
const MongoStore = require('connect-mongo');
const store=MongoStore.create({
    mongoUrl:process.env.MONGO_URL,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter: 24*3600
})
//Using express-session
app.use(session(
    {   store,
        secret: 'airbnb',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: Date.now() * 7 * 24 * 60 * 60 * 100,
            expires: 7 * 24 * 60 * 60 * 100,
            httpOnly: true
        }
    }))

    store.on(error,(error)=>{
        console.log(error)
    })
//using connect-flash
app.use(flash())

//passport middlewares

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//res.locals to send flash to ejs tempelates
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.user
    next();
})




//All listings route
app.get("/listings", wrapAsync(async (req, res) => {

    let listings = await Listing.find({});
    res.render('listings.ejs', { listings });
}));



//new listing route to render to form 
app.get("/listings/new", middleware.isLoggedin, (req, res) => {
    res.render('new.ejs')
})

//View listing
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "review", populate: { path: "author" } }).populate('owner')
    console.log(listing)
    if (!listing) {
        req.flash("error", "Listing does not exist")
        res.redirect('/listings')
    }
    res.render('viewlisting.ejs', { listing })
}))

//create new listing
app.post("/listings", upload.single('image'), wrapAsync(async (req, res, next) => {
    let { title, description, price, location, country } = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, filename)
    if (!title || !description || !price || !location || !country) {
        throw new ExpressError(400, "Please fill in all required fields");
    }
    req.flash('success', 'Listing created successfully')

    let newListing = new Listing({
        title: title,
        description: description,
        price: price,
        location: location,
        country: country
    });

    let response = await geocodingClient.forwardGeocode({
        query: newListing.location,
        limit: 1
    })
        .send()
    newListing.image.url = url;
    newListing.image.filename = filename;
    newListing.owner = req.user._id;
    newListing.geometry=response.body.features[0].geometry;
    console.log(newListing)
    return newListing.save()
        .then(() => {
            console.log('Listing saved successfully');
            res.redirect('/listings');
        })
        .catch(err => {
            console.log('Error saving listing:', err);
            next(err);
        });
}));

//Edit listing route to render to edit form
app.get("/listings/:id/edit", middleware.isLoggedin, wrapAsync(async (req, res) => {

    let { id } = req.params;
    let listing = await Listing.findById(id)
    if (!listing) {
        req.flash("error", "Listing does not exist")
        res.redirect('/listings')
    }
    let originalListingimage = listing.image.url;
    let decListindimg = originalListingimage.replace("/upload", "/upload/w_250")
    res.render("edit.ejs", { listing, decListindimg })
}
))

//Saving edit listing
app.post("/listings/:id/edit", upload.single('image'), wrapAsync(async (req, res) => {

    const { id } = req.params;
    if (!req.body.title) {
        next(new ExpressError("400", "Please enter valid information"))
    }
    req.flash('success', 'Listing edited successfully')
    const newData = req.body;
    const updatedListing = await Listing.findByIdAndUpdate(id, newData, { new: true })

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename };
        await updatedListing.save();
    }
    console.log(updatedListing)
    res.redirect("/listings");
}));

//delete listing
app.get("/listings/:id/delete", middleware.isLoggedin, wrapAsync(async (req, res) => {

    let { id } = req.params;
    req.flash('success', 'Listing deleted successfully')
    await Listing.findByIdAndDelete(id).then((result) => { console.log("deleted") }).catch((err) => { console.log(err) })
    res.redirect("/listings");
}))

//Add reviews
app.post("/listings/:id/reviews", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
    let review = req.body.review;
    req.flash('success', 'Review created successfully')
    console.log(review)
    let newReview = new Review({
        rating: review.rating,
        Comment: review.comment
    })
    newReview.author = req.user._id;
    await newReview.save();
    listing.review.push(newReview)
    await listing.save();

    res.redirect(`/listings/${id}`)
}));


//Delete reviews
app.get("/listings/:id/review/:reviewid", async (req, res) => {
    let { id, reviewid } = req.params;
    req.flash('success', 'Review deleted successfully')
    await Review.findByIdAndDelete(reviewid).then((res) => { console.log(res) }).catch((err) => { console.log(err) })
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewid } });
    res.redirect(`/listings/${id}`)
})


//User signup Get

app.get("/signup", (req, res) => {
    res.render('signup.ejs')
})

//User signup post

app.post("/signup", async (req, res) => {

    try {
        let { username, email, password } = req.body;
        let newUser = new User({
            email: email,
            username: username
        })
        let reguser = await User.register(newUser, password)
        req.logIn(reguser, (err) => {
            if (err) { next(err) }
            req.flash('success', (`Welcome ${username}`))
            res.redirect('/listings')
        }
        )

    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/signup')
    }
})

//user login get
app.get("/login", (req, res) => {
    res.render('login.ejs')
})

app.post("/login",
    passport.authenticate('local', { failureRedirect: "/login", failureFlash: true }),
    async (req, res) => {

        req.flash('sucess', 'Login successfull')
        res.redirect('/listings')

    })

app.get("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            req.flash('error', 'Error while logging you out')
            res.redirect("/listings")
        }
        else {
            req.flash('success', 'logged out sucessfully')
            res.redirect("/listings")
        }
    })

})

//Page 404 route
app.get("*", (req, res, next) => {
    throw new ExpressError(404, "Page Not found")
})


//error handling middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Something broke" } = err
    res.render('error.ejs', { err });
})

