var keystone = require('keystone');
var Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
	label: 'Publicaciones',
	singular: 'Publicacion',
	plural: 'Publicaciones',
	autokey: { from: 'name', path: 'key', unique: true },
});

Post.add({
	name: { label: 'Titulo', type: String, required: true },
	state: { label: 'Estado', type: Types.Select, options: [
		{ label: 'Borrador', value: 'draft' },
		{ label: 'Publico', value: 'published' },
		{ label: 'Archivado', value: 'archived' },
	], default: 'draft', index: true },
	author: { label: 'Autor', type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { label: 'Fecha de Publicacion', type: Types.Date, index: true, noedit: true, default: new Date() },
	price: { label: 'Precio', type: Types.Money },
	image: { label: 'Imagen principal', type: Types.CloudinaryImage },
	images: { label: 'Imagenes del producto', type: Types.CloudinaryImages },
	description: { label: 'Descripcion', type: Types.Html, wysiwyg: true, height: 250 },
	categories: { label: 'Categorias', type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.relationship({ path: 'comments', ref: 'PostComment', refPath: 'post' });
Post.relationship({ ref: 'Order', refPath: 'products' });

Post.track = true;
Post.defaultColumns = 'name, state|20%, price|20%,  author|20%, publishedDate|20%';
Post.register();
