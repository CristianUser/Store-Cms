var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {
		posts: [],
		album: [],
	};

	view.on('init', function (next) {

		var q = keystone.list('Post').model.find().limit(6)
			.sort('-publishedDate');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});
	});

	view.on('init', function (next) {

		var q = keystone.list('Gallery').model.find().limit(1);

		q.exec(function (err, results) {
			locals.data.album = results[0].images;
			next(err);
		});
	});

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Render the view
	view.render('index');
};
