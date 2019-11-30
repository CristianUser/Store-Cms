/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Inicio', key: 'home', href: '/' },
		{ label: 'Productos', key: 'blog', href: '/blog' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Contact', key: 'contact', href: '/contact' }
	];
	res.locals.user = req.user;

	next();
};

/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) {
		return msgs.length;
	})
		? flashMessages
		: false;
	next();
};

exports.requireCustomer = function (req, res, next) {
	// get the token from the header if present
	const token = req.cookies['ecommerce-auth'];
	// if no token found, return response (without going to the next middelware)
	if (!token) return res.status(401).send('Access denied. No token provided.');

	try {
		// if can verify the token, set req.user and pass to next middleware
		const decoded = jwt.verify(token, config.get('secret'));
		req.customer = decoded;
		next();
	} catch (ex) {
		// if invalid token
		res.status(400).send('Invalid token.');
	}
};

exports.setCustomer = function (req, res, next) {
	const token = req.cookies['ecommerce-auth'];
	try {
		const decoded = jwt.verify(token, config.get('secret'));
		req.customer = decoded;
		res.locals.user = res.locals.user || decoded;
		next();
	} catch (ex) {
		next();
	}
};

/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
