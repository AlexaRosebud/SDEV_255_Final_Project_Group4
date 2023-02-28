const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Course = require('./models/courses');

//express app
const app = express();

// listen for requests
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

//connect to mongodb
// const dbURI ='mongodb+srv://kbrumback:test1234@cluster0.kpdgknd.mongodb.net/node-tuts?retryWrites=true&w=majority';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
//     .then((result) => app.listen(3000))
//     .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes

// home page route
app.get('/', (req, res) => {
    res.redirect('/index');
});

// index page route
app.get('/index', (req, res) => {
    res.render('index', { title: 'Home' });
});

// about page route
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// contact page route
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

// login page route
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// shopping cart route
app.get('/cart', (req, res) => {
    res.render('cart', { title: 'Shopping Cart' });
});

// confirmation route
app.get('/confirmation', (req, res) => {
    res.render('confirmation', { title: 'Confirmation' });
});

// shop route
app.get('/shop', (req, res) => {
    res.render('shop', { title: 'Shop' });
});

// courses route
app.get('/courses', (req, res) => {
    res.render('courses', { title: 'Courses' });
});

// 404 page - this HAS to be at the bottom of the page otherwise express will match based on per list item
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
