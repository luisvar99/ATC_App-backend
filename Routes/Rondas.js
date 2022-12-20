const {Router} = require('express')
const {addRondas, 
    GetRondasById, UpdateRondas, 
    DeleteRondas, getAllrondas 
} = require('../Controllers/Rondas')

const router = new Router();

router.post('/api/addRondas', addRondas)

router.get('/api/getRondas', getAllrondas)
router.get('/api/getRondaById/:id_ronda', GetRondasById)

router.put('/api/editRonda/:id_ronda', UpdateRondas)

router.delete('/api/deleteRonda/:id_ronda', DeleteRondas)

module.exports = router;