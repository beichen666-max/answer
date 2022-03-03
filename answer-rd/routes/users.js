const router = require('koa-router')()

const user = require('../controllers/user')

router.post('/loginWeb', user.loginWeb);
router.post('/loginApp', user.loginApp);
router.post('/checkLogin', user.checkLogin);
router.get('/getUserInfo', user.getUserInfo);
router.post('/register', user.register);
router.post('/goanswer', user.answer);

module.exports = router