const {Router} = require('express')
const {addGrupo, GetAllGrupos, GetGrupoById, 
    UpdateGrupo, DeleteGrupo
} = require('../Controllers/Grupos')

const router = new Router();

router.get('/api/getAllGrupos', GetAllGrupos)
router.get('/api/getSingleGrupo/:idGrupo', GetGrupoById)

router.post('/api/addGrupo/idsubtorneo=:idSubtorneo', addGrupo)

router.put('/api/editGrupo/:idGrupo', UpdateGrupo)

router.delete('/api/deleteGrupo/:idGrupo', DeleteGrupo)

module.exports = router;