const Router = require('koa-router');
const router = new Router();
const product = require('../src/controllers/product');

router.post('/register', product.register);
router.get('/get', product.get);
router.put('/update', product.update);
router.delete('/remove', product.remove);

module.exports = router;
