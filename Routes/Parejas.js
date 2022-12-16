const {Router} = require('express')
const {addSubtorneoPareja, GetAllParejas, getSubtorneoParejas, 
    UpdatePareja, DeletePareja, addParejaMember, GetParejasMembers, 
    GetColoresParejas, getColoresParejasById, SetEquipoToPareja
} = require('../Controllers/Parejas')

const router = new Router();

router.get('/api/getAllParejas', GetAllParejas)
router.get('/api/getSubtorneoParejas/:idSubtorneo', getSubtorneoParejas)
router.get('/api/getParejasMembers/:idSubtorneo', GetParejasMembers)


router.get('/api/getColoresParejas/:id_torneo', GetColoresParejas)
router.get('/api/getColoresParejasById/:id_pareja', getColoresParejasById)

router.post('/api/addSubtorneoPareja', addSubtorneoPareja)
//router.post('/api/addPareja/idsubtorneo=:idSubtorneo/numberOfGroups=:numberOfGroups', addPareja)

router.put('/api/editPareja/:idPareja', UpdatePareja)
router.put('/api/SetEquipoToPareja/:id_pareja', SetEquipoToPareja)

router.delete('/api/deletePareja/:idPareja', DeletePareja)

module.exports = router;