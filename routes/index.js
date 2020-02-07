var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var async = require("async");

/* GET home page. */
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         next();
//     }
//     else{
//         res.redirect("/login");
//     }
// }
router.get('/', function(req, res, next) {
	console.log("amr");
  res.render('index', { title: 'zbook' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'zbook' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'zbook' });
});

router.get('/writeposts', function(req, res, next) {
  res.render('writeposts', { title: 'zbook' });
});
router.get('/posts', function(req, res, next) {
  res.render('posts', { title: 'zbook' });
});


router.get('/writecity', function(req, res, next) {
  res.render('writecity', { title: 'zbook' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'zbook' });
});

router.get('/cv', function(req, res, next) {
  res.render('cv', { title: 'zbook' });
});


router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'zbook' });
});


router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'zbook' });
});


// router.post('/', function (req, res) {
//     console.log(req.body.title);
//     console.log(req.body.description);
//     res.send('Post page');
// });

module.exports = router;
