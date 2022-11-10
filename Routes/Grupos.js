const {Router} = require('express')
const {addGrupo, GetAllGrupos, getSubtorneoGrupos, 
    UpdateGrupo, DeleteGrupo, addGrupoMember, GetGruposMembers
} = require('../Controllers/Grupos')

const router = new Router();

router.get('/api/getAllGrupos', GetAllGrupos)
router.get('/api/getSubtorneoGrupos/:idSubtorneo', getSubtorneoGrupos)
router.get('/api/getGruposMembers/:idSubtorneo', GetGruposMembers)

router.post('/api/addGrupo/idsubtorneo=:idSubtorneo/numberOfGroups=:numberOfGroups', addGrupo)
router.post('/api/addGrupoMember', addGrupoMember)

router.put('/api/editGrupo/:idGrupo', UpdateGrupo)

router.delete('/api/deleteGrupo/:idGrupo', DeleteGrupo)

module.exports = router;