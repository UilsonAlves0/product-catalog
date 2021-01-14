const productDB = require('../repositories/product');
const { response } = require('../utils/response');

const register = async (ctx) => {
	const { title, description, price, category } = ctx.request.body;
	if (!title || !description || !price || !category) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}
	const product = await productDB.getProductByTitle(title);

	if (product) {
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
const get = async (ctx) => {
	const title = ctx.query.title;
	const category = ctx.query.category;
	console.log(title, category);
	if (!title && !category) {
		const products = await productDB.getPrducts();
		if (products.length > 0) {
			return response(ctx, 200, { products });
		}
	}
	const products = await productDB.getProductByCategoryOrTitle(
		title,
		category
	);
	if (products.length > 0) {
		return response(ctx, 200, { products });
	}
};
const update = async (ctx) => {
	const { title, description, price, category, id } = ctx.request.body;
	if (!title || !description || !price || !category || !id) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}
	const product = await productDB.getProductByTitle(title);
	if (product) {
		const updateDB = await productDB.updateProduct(
			title,
			description,
			price,
			category,
			id
		);
		return response(ctx, 200, {
			mensagem: 'Produto atualizado com sucesso!',
		});
	}
	return response(ctx, 400, { mensagem: 'Produto não existe' });
};
module.exports = { register, update, get };
