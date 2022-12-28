const {Router} = require('express')
const {addUser, GetAllUsers, GetUserById, 
    UpdateUser, DeleteUser, GetUserByName
} = require('../Controllers/Users')

const router = new Router();

router.post('/api/addUser', addUser)

router.get('/api/getAllUsers', GetAllUsers)
router.get('/api/getSingleUser/:idUser', GetUserById)
router.get('/api/getUsersByApellido/:apellido', GetUserByName)
router.get('/api/GetUserById/:user_id', GetUserById)

router.put('/api/EditUsers/:user_id', UpdateUser)

router.delete('/api/deleteUser/:id_user', DeleteUser)

module.exports = router;