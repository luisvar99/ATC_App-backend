const {Router} = require('express')
const {addSubTorneo, GetSubTorneoById, 
    UpdateSubTorneo, DeleteSubTorneo, GetSubTorneosByTorneoId,
    GetSubTorneosParticipants, GetNumberOfParticipants, GetSingleSubTorneo
} = require('../Controllers/SubTorneos')

const router = new Router();

//router.get('/api/getAllSubTorneos', GetAllSubTorneos)

router.get('/api/getSingleSubTorneo/:idSubTorneo', GetSubTorneoById)
router.get('/api/getSubTorneoByTorneoId/:idTorneo', GetSubTorneosByTorneoId)
router.get('/api/GetSubTorneosParticipants/:idSubTorneo', GetSubTorneosParticipants)
router.get('/api/GetNumberOfParticipants/:idSubTorneo', GetNumberOfParticipants)
router.get('/api/GetSingleSubTorneoById/:idSubTorneo', GetSingleSubTorneo)

router.post('/api/addSubTorneo', addSubTorneo)

router.put('/api/editSubTorneo/:idSubTorneo', UpdateSubTorneo)

router.delete('/api/deleteSubTorneo/:idSubTorneo', DeleteSubTorneo)

module.exports = router;