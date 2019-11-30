var keystone = require('keystone');
var Types = keystone.Field.Types;

var Order = new keystone.List('Order', {
	label: 'Pedidos',
	plural: 'Pedidos',
	singular: 'Pedido',
});

Order.add({
	products: { label: 'Productos', type: Types.Relationship, ref: 'Post', many: true },
	customer: { label: 'Cliente', type: Types.Relationship, ref: 'Customer', many: false },
	message: { type: Types.Textarea },
});

Order.track = true;
Order.defaultSort = '-createdAt';
Order.defaultColumns = 'customer, message, createdAt';
Order.register();
