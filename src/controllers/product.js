const productDB = require('../repositories/product');
const { response } = require('../utils/response');

const register = async (ctx) => {
	const { title, description, price, category } = ctx.request.body;
	if (!title || !description || !price || !category) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}
	const product = await productDB.getProductByTitle(title);
	// Faço a checagem da existencia do produto por titulo para evitar produtos duplicados no DB
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
	//Aqui eu fiz a filtragem por queryString para não ter que fazer outra função
	//Se não tiver nenhum dos dois, ele devolve tudo, e se tiver ele faz a filtragem solicitada ou por title ou por category
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
	//Aqui eu checo se tem descrição, porque se tiver descrição quer dizer que pode editar tudo e não só a categoria do produto
	if (description) {
		if (!title || !description || !price || !category || !id) {
			return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
		}
		//Aqui eu vou fazer a checagem da existencia do produto, não vai ter como editar um produto que não existe
		const product = await productDB.getProductByTitle(title);
		if (product) {
			productDB.updateProduct(title, description, price, category, id);
			return response(ctx, 200, {
				mensagem: 'Produto atualizado com sucesso!',
			});
		}
		return response(ctx, 400, { mensagem: 'Produto não existe' });
	}
	if (!title || !category) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}
	const product = await productDB.getProductByTitle(title);
	//Assim como lá em cima, eu faço a checagem da existencia do produto
	if (product) {
		productDB.updateCategory(title, category);
		return response(ctx, 200, {
			mensagem: 'Produto atualizado com sucesso!',
		});
	}
};
const remove = async (ctx) => {
	const { title } = ctx.request.body;
	if (!title) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}
	const productRemoved = productDB.deleteProducts(title);
	if (productRemoved) {
		return response(ctx, 200, {
			mensagem: 'Produto deletado com sucesso!',
		});
	}
};
module.exports = { register, update, get, remove };
