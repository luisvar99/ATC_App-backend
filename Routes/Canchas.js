const {Router} = require('express')
const {addCancha, GetAllCanchas, GetCanchaById, 
    UpdateCancha, DeleteCancha
} = require('../Controllers/Canchas')

const router = new Router();

router.post('/api/addCancha', addCancha)
router.get('/api/getAllCanchas', GetAllCanchas)
router.get('/api/getSingleCancha/:idCancha', GetCanchaById)
router.put('/api/editCancha/:idCancha', UpdateCancha)
router.delete('/api/deleteCancha/:idCancha', DeleteCancha)

module.exports = router;