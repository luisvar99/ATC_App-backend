const {Router} = require('express')
const {addMatch, GetAllHorarios, GetHorarioById, 
    UpdateHorario, DeleteHorario
} = require('../Controllers/Matches')

const router = new Router();

router.post('/api/createSubtorneoMatch', addMatch)

router.get('/api/getAllHorarios', GetAllHorarios)
router.get('/api/getSingleHorario/:idHorario', GetHorarioById)

router.put('/api/editHorario/:idHorario', UpdateHorario)

router.delete('/api/deleteHorario/:idHorario', DeleteHorario)

module.exports = router;