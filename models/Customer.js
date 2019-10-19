var keystone = require('keystone');
var Types = keystone.Field.Types;

var Customer = new keystone.List('Customer', {
	label: 'Clientes',
	singular: 'Cliente',
	plural: 'Clientes',
	// nodelete prevents people deleting the demo admin user
	nodelete: true,
});

Customer.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true, unique: true },
	phone: { type: String, width: 'short' },
	photo: { type: Types.CloudinaryImage, collapse: true },
	password: { type: Types.Password, initial: true, required: false },
});

/**
 * DEMO USER PROTECTION
 * The following code prevents anyone updating the default admin user
 * and breaking access to the demo
 */

Customer.schema.path('password').set(function (newValue) {
	// the setter for the password field is more complicated because it has to
	// emulate the setter on the password type, and ensure hashing before save
	// also, we can't currently escape the hash->set loop, so the hash is harcoded
	// for the demo user for now.
	if (this.isProtected) return '$2a$10$fMeQ6uNsJhJZnY/6soWfc.Mq8T3MwANJK52LQCK2jzw/NjE.JBHV2';
	this.__password_needs_hashing = true;
	return newValue;
});

/**
 * END DEMO USER PROTECTION
 */

Customer.track = true;
Customer.defaultColumns = 'name, email, phone, photo';
Customer.register();
