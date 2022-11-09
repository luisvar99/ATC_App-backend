const {Router} = require('express')
const {addHorario, GetAllHorarios, GetHorarioById, 
    UpdateHorario, DeleteHorario
} = require('../Controllers/Horarios')

const router = new Router();

router.post('/api/addHorario', addHorario)

router.get('/api/getAllHorarios', GetAllHorarios)
router.get('/api/getSingleHorario/:idHorario', GetHorarioById)

router.put('/api/editHorario/:idHorario', UpdateHorario)

router.delete('/api/deleteHorario/:idHorario', DeleteHorario)

module.exports = router;