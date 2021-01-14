const database = require('../utils/database');

const registerProduct = async (title, description, price, category) => {
	if (!title || !description || !price || !category) {
		return null;
	}
	const query = `INSERT INTO catalog (title, description, price,category)VALUES ($1,$2,$3,$4) RETURNING *`;
	const result = await database.query({
		text: query,
		values: [title, description, price, category],
	});
	return result.rows;
};
const getPrducts = async () => {
	const query = `SELECT * FROM catalog`;
	const result = await database.query({
		text: query,
	});
	console.log(result.rows);
	return result.rows;
};
const getProductByTitle = async (title) => {
	if (!title) {
		return null;
	}
	const query = `SELECT * FROM catalog WHERE title = $1`;
	const result = await database.query({
		text: query,
		values: [title],
	});
	return result.rows.length > 0;
};
const getProductByCategoryOrTitle = async (title, category) => {
	if (!title && !category) {
		return null;
	}
	const query = `select * from catalog  where title = $1 or category = $2`;
	const result = await database.query({
		text: query,
		values: [title, category],
	});
	console.log(result.rows);
	return result.rows;
};
const updateProduct = async (title, description, price, category, id) => {
	if (!title || !description || !price || !category || !id) {
		return null;
	}
	const query = `UPDATE catalog SET title = $1,description = $2, price = $3, category = $4 WHERE id = $5 RETURNING * `;
	const result = await database.query({
		text: query,
		values: [title, description, price, category, id],
	});
	return result.rows;
};
module.exports = {
	registerProduct,
	getProductByTitle,
	updateProduct,
	getPrducts,
	getProductByCategoryOrTitle,
};
