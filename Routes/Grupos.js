const {Router} = require('express')
const {addGrupo, GetAllGrupos, getSubtorneoGrupos, 
    UpdateGrupo, DeleteGrupo, addGrupoMember, GetGruposMembers,
    DeleteSubTorneoGroupParticipant, GetGruposById, PublishGrupos,
    CreateColoresGrupo, GetColoresGrupo, CreateColoresEquipo,
    GetColoresTeamsByGroup, GetEquiposColores, PublishColoresTeamsAndGroups,
    DeleteColoresGrupo, getColoresEquipoById, UpdateColoresEquipo,
    DeleteColoresEquipo, UpdateColoresGrupo, getColoresGrupoById,
    GetColoresGrupoForUsers
} = require('../Controllers/Grupos')

const router = new Router();

router.get('/api/getAllGrupos', GetAllGrupos)
router.get('/api/getSubtorneoGrupos/:idSubtorneo', getSubtorneoGrupos)
router.get('/api/getGruposMembers/:idSubtorneo', GetGruposMembers)
router.get('/api/GetGruposById/:idGrupo/:id_subtorneo', GetGruposById)
router.get('/api/GetColoresGrupo/:id_torneo', GetColoresGrupo)
router.get('/api/GetColoresGrupoForUsers/:id_torneo', GetColoresGrupoForUsers)
router.get('/api/GetColoresTeamsByGroup/:id_bombo', GetColoresTeamsByGroup)
router.get('/api/GetEquiposColores/:id_torneo', GetEquiposColores)
router.get('/api/getColoresEquipoById/:id_torneo/:id_equipo', getColoresEquipoById)
router.get('/api/getColoresGrupoById/:id_bombo', getColoresGrupoById)

router.post('/api/addGrupo/idsubtorneo=:idSubtorneo/numberOfGroups=:numberOfGroups', addGrupo)
router.post('/api/addGrupoMember', addGrupoMember)
router.post('/api/CreateColoresGrupo', CreateColoresGrupo)
router.post('/api/CreateColoresEquipo', CreateColoresEquipo)

router.put('/api/editGrupo/:idGrupo', UpdateGrupo)
router.put('/api/PublishGrupos/:idSubtorneo', PublishGrupos)
router.put('/api/PublishColoresTeamsAndGroups/:id_torneo', PublishColoresTeamsAndGroups)
router.put('/api/UpdateColoresEquipo/:id_torneo/:id_equipo', UpdateColoresEquipo)
router.put('/api/UpdateColoresGrupo/:id_bombo', UpdateColoresGrupo)

router.delete('/api/deleteGrupo/idGrupo=:idGrupo', DeleteGrupo)
router.delete('/api/DeleteColoresGrupo/:id_bombo', DeleteColoresGrupo)
router.delete('/api/DeleteColoresEquipo/:id_equipo', DeleteColoresEquipo)
router.delete('/api/deleteSubTorneoGroupParticipant/idGrupo=:idGrupo/idUser=:idUser', DeleteSubTorneoGroupParticipant)

module.exports = router;