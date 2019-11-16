var keystone = require('keystone');
var Customer = keystone.list('Customer');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'signup';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.customerSubmitted = false;

	// On POST requests, add the Customer item to the database
	view.on('post', { action: 'signup' }, function (next) {

		var newEnquiry = new Customer.model();
		var updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, password',
			errorMessage: 'There was a problem submitting your Customer:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.customerSubmitted = true;
			}
			next();
		});
	});

	view.render('signup');
};
