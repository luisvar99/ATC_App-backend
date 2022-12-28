const {Router} = require('express')
const {addMatch, GetSubtorneoMatchesById, GetSubtorneoMatches, 
    UpdateHorario, DeleteMatch, GetColoresMatches, addColoresMatch,
    GetColoresEnfretamientosPlayers, DeleteColoresEnfrentamiento,
    GetColoresMatchById, editColoresMatch
} = require('../Controllers/Matches')

const router = new Router();

router.post('/api/createSubtorneoMatch', addMatch)
router.post('/api/addColoresMatch', addColoresMatch)

router.get('/api/GetSubtorneoMatchesById/:idPartido', GetSubtorneoMatchesById)
router.get('/api/GetSubtorneoMatches/:idSubtorneo', GetSubtorneoMatches)
router.get('/api/GetColoresMatches/:id_torneo', GetColoresMatches)
router.get('/api/GetColoresEnfretamientosPlayers/:id_torneo/:id_partido', GetColoresEnfretamientosPlayers)
router.get('/api/GetColoresMatchById/:id_torneo/:id_partido', GetColoresMatchById)

router.put('/api/editHorario/:idHorario', UpdateHorario)
router.put('/api/editColoresMatch/:id_partido', editColoresMatch)

router.delete('/api/DeleteMatch/:idMatch', DeleteMatch)
router.delete('/api/DeleteColoresEnfrentamiento/:id_partido/:id_cancha/:id_horario/:fecha', DeleteColoresEnfrentamiento)

module.exports = router;