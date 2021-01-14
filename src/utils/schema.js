const database = require('./database');

const schema = {
	1: `CREATE TABLE catalog(
        id SERIAL,
        title TEXT,
        description TEXT,
        price INTEGER,
        category TEXT
    )`,
};

const drop = async (tableName) => {
	if (tableName) {
		await database.query(`DROP TABLE ${tableName}`);
		console.log('Tabela dropada!');
	}
};

const up = async (number = null) => {
	if (!number) {
		for (const value in schema) {
			await database.query({ text: schema[value] });
		}
	} else {
		await database.query({ text: schema[number] });
	}
};
up(1)
	.then(() => console.log('Ok'))
	.catch((error) => console.log('Migration negada: ' + error));
