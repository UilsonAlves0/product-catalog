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
const getProduct = async (title) => {
	if (!title) {
		return null;
	}
	const query = `SELECT * FROM catalog WHERE title = $1`;
	const result = await database.query({
		text: query,
		values: [title],
	});
	return result.rows;
};
const updateProduct = async (title) => {
	if (!title) {
		return null;
	}
	const query = `UPDATE catalog SET `;
};
module.exports = { registerProduct, getProduct };
