const {Router} = require('express')
const {addMatch, GetSubtorneoMatchesById, GetSubtorneoMatches, 
    UpdateHorario, DeleteMatch, GetColoresMatches, addColoresMatch,
    GetColoresEnfretamientosPlayers
} = require('../Controllers/Matches')

const router = new Router();

router.post('/api/createSubtorneoMatch', addMatch)
router.post('/api/addColoresMatch', addColoresMatch)

router.get('/api/GetSubtorneoMatchesById/:idPartido', GetSubtorneoMatchesById)
router.get('/api/GetSubtorneoMatches/:idSubtorneo', GetSubtorneoMatches)
router.get('/api/GetColoresMatches/:id_torneo', GetColoresMatches)
router.get('/api/GetColoresEnfretamientosPlayers/:id_torneo/:id_partido', GetColoresEnfretamientosPlayers)

router.put('/api/editHorario/:idHorario', UpdateHorario)

router.delete('/api/DeleteMatch/:idMatch', DeleteMatch)

module.exports = router;