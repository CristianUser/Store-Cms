var keystone = require('keystone');
var Types = keystone.Field.Types;

var Gallery = new keystone.List('Gallery', {
	label: 'Galeria',
	autokey: { from: 'name', path: 'key', unique: true },
	plural: 'Albums',
	singular: 'Album',
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Types.Date, default: Date.now },
	images: { type: Types.CloudinaryImages },
	section: { label: 'Sección', type: Types.Select, options: [
		{ label: 'Highlight', value: 'highlight' },
		{ label: 'Featured', value: 'featured' },
	] },
});

Gallery.track = true;
Gallery.defaultSort = 'name';
Gallery.defaultColumns = 'name, publishedDate';
Gallery.register();
