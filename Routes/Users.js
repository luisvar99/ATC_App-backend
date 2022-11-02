const {Router} = require('express')
const {addUser, GetAllUsers, GetUserById, 
    UpdateUser, DeleteUser
} = require('../Controllers/Users')

const router = new Router();

router.post('/api/addUser', addUser)
router.get('/api/getAllUsers', GetAllUsers)
router.get('/api/getSingleUser/:idUser', GetUserById)
router.put('/api/editUser/:idUser', UpdateUser)
router.delete('/api/deleteUser/:idUser', DeleteUser)

module.exports = router;