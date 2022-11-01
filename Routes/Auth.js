const {Router} = require('express')
const AuthController = require('../Controllers/AuthController')

const router = new Router();

router.post("/api/login",AuthController.Login)
router.post('/api/signup', AuthController.SignUp)

module.exports = router;