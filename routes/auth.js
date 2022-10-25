var passport = require('passport'),
    config = require('../config/index.js'),
    logger = config.logger,
    _ = require('underscore'),
    mixins = require('../modules/mixins');

// var RateLimit = require('express-rate-limit');

// var signUpLimiter = new RateLimit({
//   windowMs: 60*60*1000, // 1 hour window
//   delayAfter: 1, // begin slowing down responses after the first request
//   delayMs: 3*1000, // slow down subsequent responses by 3 seconds per request
//   max: 3, // start blocking after 5 requests
//   message: "Too many accounts created from this IP, please try again after an hour. Go jerk off or something."
// });

module.exports = function authentication(router) {

	// Twitter
	// router.get('/auth/twitter', signUpLimiter, passport.authenticate('twitter'));
	// Callback
	router.get('/auth/twitter/callback', passport.authenticate('twitter', 
		{ 
			// successReturnToOrRedirect: '/profile',
			failureRedirect: '/',
			// failureFlash: 'Invalid Twitter account.',
			// successFlash: 'Welcome!',
		}),
		function(req, res) {
	    	req.session.locals.loggedIn = 'performer';
	    	req.session.user = mixins.User(req.user);
			req.session.user.logins++;
	    	req.session.save(function(err) {
	  			if (err) logger.warn(err);
	  			logger.log('login successful (twitter): %s',req.user.username);
		    	res.redirect('/');
	  		});
		}
	);

	// Logout
	router.get('/logout', mixins.loggedIn, function (req, res) {
		var name = req.session.user.username;
    	logger.log('logging out: %s',name);
	    req.logout();
    	req.session.locals.loggedIn = false;
    	req.flash('success',"Logout successful!");
    	req.session.locals.user = null;
    	req.session.user = null;
  		req.session.save(function(err) {
  			if (err) logger.warn(err);
  			logger.log('logout successful: %s',name);
	    	res.redirect('/');
  		});
	});
}