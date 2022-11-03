const {Router} = require('express')
const {addSubtorneoPareja, GetAllParejas, getSubtorneoParejas, 
    UpdatePareja, DeletePareja, addParejaMember, GetParejasMembers
} = require('../Controllers/Parejas')

const router = new Router();

router.get('/api/getAllParejas', GetAllParejas)
router.get('/api/getSubtorneoParejas/:idSubtorneo', getSubtorneoParejas)
router.get('/api/getParejasMembers/:idSubtorneo', GetParejasMembers)

router.post('/api/addSubtorneoPareja', addSubtorneoPareja)
//router.post('/api/addPareja/idsubtorneo=:idSubtorneo/numberOfGroups=:numberOfGroups', addPareja)

router.put('/api/editPareja/:idPareja', UpdatePareja)

router.delete('/api/deletePareja/:idPareja', DeletePareja)

module.exports = router;