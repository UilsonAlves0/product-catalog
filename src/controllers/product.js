const productDB = require('../repositories/product');
const { response } = require('../utils/response');

const register = async (ctx) => {
	const { title, description, price, category } = ctx.request.body;
	if (!title || !description || !price || !category) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}
	const product = await productDB.getProduct(title);
	console.log(product);
	if (product.length > 0) {
		return response(ctx, 400, { mensagem: 'Produto ja existe' });
	}
	const registerDB = await productDB.registerProduct(
		title,
		description,
		price,
		category
	);
	if (registerDB) {
		return response(ctx, 200, { mensagem: 'Produto cadastrado' });
	}
};

module.exports = { register };
