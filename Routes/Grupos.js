const {Router} = require('express')
const {addGrupo, GetAllGrupos, getSubtorneoGrupos, 
    UpdateGrupo, DeleteGrupo, addGrupoMember, GetGruposMembers,
    DeleteSubTorneoGroupParticipant, GetGruposById, PublishGrupos,
    CreateColoresGrupo, GetColoresGrupo, CreateColoresEquipo,
    GetColoresTeamsByGroup, GetEquiposColores
} = require('../Controllers/Grupos')

const router = new Router();

router.get('/api/getAllGrupos', GetAllGrupos)
router.get('/api/getSubtorneoGrupos/:idSubtorneo', getSubtorneoGrupos)
router.get('/api/getGruposMembers/:idSubtorneo', GetGruposMembers)
router.get('/api/GetGruposById/:idGrupo', GetGruposById)
router.get('/api/GetColoresGrupo/:id_torneo', GetColoresGrupo)
router.get('/api/GetColoresTeamsByGroup/:id_bombo', GetColoresTeamsByGroup)
router.get('/api/GetEquiposColores/:id_torneo', GetEquiposColores)

router.post('/api/addGrupo/idsubtorneo=:idSubtorneo/numberOfGroups=:numberOfGroups', addGrupo)
router.post('/api/addGrupoMember', addGrupoMember)
router.post('/api/CreateColoresGrupo', CreateColoresGrupo)
router.post('/api/CreateColoresEquipo', CreateColoresEquipo)

router.put('/api/editGrupo/:idGrupo', UpdateGrupo)
router.put('/api/PublishGrupos/:idSubtorneo', PublishGrupos)

router.delete('/api/deleteGrupo/idGrupo=:idGrupo', DeleteGrupo)
router.delete('/api/deleteSubTorneoGroupParticipant/idGrupo=:idGrupo/idUser=:idUser', DeleteSubTorneoGroupParticipant)

module.exports = router;