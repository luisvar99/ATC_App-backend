const {Router} = require('express')
const {addSubTorneo, GetSubTorneoById, 
    UpdateSubTorneo, DeleteSubTorneo, GetSubTorneosByTorneoId
} = require('../Controllers/SubTorneos')

const router = new Router();

//router.get('/api/getAllSubTorneos', GetAllSubTorneos)

router.get('/api/getSingleSubTorneo/:idSubTorneo', GetSubTorneoById)
router.get('/api/getSubTorneoByTorneoId/:idTorneo', GetSubTorneosByTorneoId)
router.post('/api/addSubTorneo', addSubTorneo)
router.put('/api/editSubTorneo/:idSubTorneo', UpdateSubTorneo)
router.delete('/api/deleteSubTorneo/:idSubTorneo', DeleteSubTorneo)

module.exports = router;