const {Router} = require('express')
const {addSubtorneoPareja, GetAllParejas, getSubtorneoParejas, 
    UpdatePareja, DeletePareja, addParejaMember, GetParejasMembers, 
    /* GetColoresParejas, */ getColoresParejasById, /* SetEquipoToPareja, */
    getPlayersByTeam, /* DeleteColoresPareja, */ MakeColoresInscripcion,
    /* GetColoresParejasMoreInfo, */ DeleteSubTorneoPareja, getColoresParticipantes,
    DeleteColoresParticipante, SetEquipoToParticipante, GetColoresParticipantesMoreInfo
} = require('../Controllers/Parejas')

const router = new Router();

router.get('/api/getAllParejas', GetAllParejas)
router.get('/api/getSubtorneoParejas/:idSubtorneo', getSubtorneoParejas)
router.get('/api/getParejasMembers/:idSubtorneo', GetParejasMembers)
router.get('/api/getPlayersByTeam/:id_equipo', getPlayersByTeam)


/* router.get('/api/getColoresParejas/:id_torneo', GetColoresParejas) */
router.get('/api/getColoresParticipantes/:id_torneo', getColoresParticipantes)
router.get('/api/getColoresParejasById/:id_pareja', getColoresParejasById)
/* router.get('/api/GetColoresParejasMoreInfo/:id_torneo', GetColoresParejasMoreInfo) */
router.get('/api/GetColoresParticipantesMoreInfo/:id_torneo', GetColoresParticipantesMoreInfo)

router.post('/api/addSubtorneoPareja', addSubtorneoPareja)
router.post('/api/MakeColoresInscripcion', MakeColoresInscripcion)
//router.post('/api/addPareja/idsubtorneo=:idSubtorneo/numberOfGroups=:numberOfGroups', addPareja)

router.put('/api/editPareja/:idPareja', UpdatePareja)
/* router.put('/api/SetEquipoToPareja/:id_pareja', SetEquipoToPareja) */
router.put('/api/SetEquipoToPareja/:user_id/:id_torneo', SetEquipoToParticipante)

router.delete('/api/deletePareja/:idPareja', DeletePareja)
router.delete('/api/DeleteSubTorneoPareja/:idPareja/:id_subtorneo', DeleteSubTorneoPareja)


/* router.delete('/api/DeleteColoresPareja/:idPareja', DeleteColoresPareja)*/
router.delete('/api/DeleteColoresParticipante/:idPareja/:id_torneo', DeleteColoresParticipante)

module.exports = router;