const {Router} = require('express')
const {addSubtorneoPareja, GetAllGrupos, getSubtorneoGrupos, 
    UpdateGrupo, DeleteGrupo, addGrupoMember, GetGruposMembers
} = require('../Controllers/Parejas')

const router = new Router();

router.get('/api/getAllGrupos', GetAllGrupos)
router.get('/api/getSubtorneoGrupos/:idSubtorneo', getSubtorneoGrupos)
router.get('/api/getGruposMembers/:idSubtorneo', GetGruposMembers)

router.post('/api/addSubtorneoPareja', addSubtorneoPareja)
router.post('/api/addGrupo/idsubtorneo=:idSubtorneo/numberOfGroups=:numberOfGroups', addGrupo)

router.put('/api/editGrupo/:idGrupo', UpdateGrupo)

router.delete('/api/deleteGrupo/:idGrupo', DeleteGrupo)

module.exports = router;