const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Course = require('./models/courses');


//express app
const app = express();
app.set('view engine', 'ejs');

//connect to mongodb
const dbURI ='mongodb+srv://kbrumback:test1234@cluster0.kpdgknd.mongodb.net/FinalProject?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch((err) => console.log(err));

// mongoose and mongo sandbox routes
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

// home page route
app.get('/', (req, res) => {
    res.redirect('/home');
});

// home page route
app.get('/home', (req, res) => {
    res.render('home', { title: 'Home' });
});

// create page route
app.get('/create', (req, res) => {
    res.render('create', { title: 'Create Course' });
});

//
app.get('/login_create', (req, res) => {
  res.render('login_create', { title: 'New User' });
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

//new course route
app.post('/courses', (req, res) => {
  const { name, credits, description } = req.body;
  const newCourse = new Course({ name, credits, description });
  newCourse.save()
    .then(() => {
      res.redirect('/courses');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error creating course');
    });
});

// create course route
app.post('/create-course', (req, res) => {
  const course = new Course({
    name: req.body.name,
    credits: req.body.credits,
    description: req.body.description
  });

// save to database
  course.save()
    .then(result => {
      res.json({redirect: '/create'});
    })
    .catch(err => {
      console.log(err);
    });
});


// delete course route
app.post('/courses/:id/delete', (req, res) => {
  const courseId = req.params.id;
  Course.findByIdAndDelete(courseId)
    .then(() => {
      res.redirect('/courses');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error deleting course');
    });
});


// courses route
app.get('/courses', (req, res) => {
    const courses = [
      { name: 'Math', credits: 3 },
      { name: 'Science', credits: 4 },
      { name: 'English', credits: 2 }
    ];
    res.render('create', { title: 'Create Course', courses });
});

// Handle POST request to create a new course
app.post('/create-course', (req, res) => {
    const { name, credits, description } = req.body;
      res.redirect('/courses');
  });
  

//courses find route
// app.get('/courses', (req, res) => {
//     Course.find()
//       .then(courses => {
//         res.render('courses', { title: 'Courses', courses });
//       })
//       .catch(err => console.log(err));
//   });
  
// // course details route
// app.get('/courses/:id', (req, res) => {
//     const id = req.params.id;
//     Course.findById(id)
//       .then(course => {
//         res.render('course_details', { title: 'Course Details', course });
//       })
//       .catch(err => console.log(err));
//   });

// 404 page - this HAS to be at the bottom of the page otherwise express will match based on per list item
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
