const Router = require('koa-router');
const router = new Router();
const product = require('../src/controllers/product');

router.post('/register', product.register);

module.exports = router;
