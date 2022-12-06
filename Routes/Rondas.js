const {Router} = require('express')
const {addRondas, 
    GetRondasById, UpdateRondas, 
    DeleteRondas, getAllrondas 
} = require('../Controllers/Rondas')

const router = new Router();

router.post('/api/addRondas', addRondas)

router.get('/api/getRondas', getAllrondas)
router.get('/api/getSingleCancha/:idCancha', GetRondasById)

router.put('/api/editCancha/:idCancha', UpdateRondas)

router.delete('/api/deleteCancha/:idCancha', DeleteRondas)

module.exports = router;