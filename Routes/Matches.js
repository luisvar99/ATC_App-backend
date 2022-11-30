const {Router} = require('express')
const {addMatch, GetSubtorneoMatchesById, GetSubtorneoMatches, 
    UpdateHorario, DeleteHorario
} = require('../Controllers/Matches')

const router = new Router();

router.post('/api/createSubtorneoMatch', addMatch)

router.get('/api/GetSubtorneoMatchesById/:idPartido', GetSubtorneoMatchesById)
router.get('/api/GetSubtorneoMatches/:idSubtorneo', GetSubtorneoMatches)

router.put('/api/editHorario/:idHorario', UpdateHorario)

router.delete('/api/deleteHorario/:idHorario', DeleteHorario)

module.exports = router;