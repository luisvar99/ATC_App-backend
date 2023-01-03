const {Router} = require('express')
const {addUser, GetAllUsers, GetUserById, 
    UpdateUser, DeleteUser, GetUserByName,
    ChangePassword
} = require('../Controllers/Users')

const router = new Router();

router.post('/api/addUser', addUser)

router.get('/api/getAllUsers', GetAllUsers)
router.get('/api/getSingleUser/:idUser', GetUserById)
router.get('/api/getUsersByApellido/:apellido', GetUserByName)
router.get('/api/GetUserById/:user_id', GetUserById)

router.put('/api/EditUsers/:user_id', UpdateUser)
router.put('/api/ChangePassword/:user_id', ChangePassword)

router.delete('/api/deleteUser/:id_user', DeleteUser)

module.exports = router;