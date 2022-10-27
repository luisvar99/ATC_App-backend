const {Router} = require('express')
const {addTorneo, GetAllTorneos, GetTorneoById, 
    UpdateTorneo, DeleteTorneo
} = require('../Controllers/Torneos')

const router = new Router();

router.get('/api/getAllTorneos', GetAllTorneos)

router.get('/api/getSingleTorneo/:idTorneo', GetTorneoById)
router.post('/api/addTorneo', addTorneo)
router.put('/api/editTorneo/:idTorneo', UpdateTorneo)
router.delete('/api/deleteTorneo/:idTorneo', DeleteTorneo)

module.exports = router;