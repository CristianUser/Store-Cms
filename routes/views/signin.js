var keystone = require('keystone');
var Customer = keystone.list('Customer');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'signin';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.customerSubmitted = false;

	// On POST requests, add the Customer item to the database
	view.on('post', { action: 'signin' }, function (next) {
		let q = Customer.model.findOne({ email: req.body.email });

		q.exec((err, res) => {
			if (res) {

			} else {
				locals.validationErrors.email = 'User not found';
			}
		});
	});

	view.render('signin');
};
