const {Router} = require('express')
const {addMatch, GetSubtorneoMatchesById, GetSubtorneoMatches, 
    UpdateHorario, DeleteMatch, GetColoresMatches
} = require('../Controllers/Matches')

const router = new Router();

router.post('/api/createSubtorneoMatch', addMatch)

router.get('/api/GetSubtorneoMatchesById/:idPartido', GetSubtorneoMatchesById)
router.get('/api/GetSubtorneoMatches/:idSubtorneo', GetSubtorneoMatches)
router.get('/api/GetColoresMatches/:id_torneo', GetColoresMatches)

router.put('/api/editHorario/:idHorario', UpdateHorario)

router.delete('/api/DeleteMatch/:idMatch', DeleteMatch)

module.exports = router;