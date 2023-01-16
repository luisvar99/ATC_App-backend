const {Router} = require('express')
const {AddJornada, 
    getJornadaById, UpdateJornada, 
    DeleteJornada, getJornadas
} = require('../Controllers/Jornadas')

const router = new Router();

router.post('/api/AddJornada', AddJornada)

router.get('/api/getJornadas', getJornadas)
router.get('/api/GetJornadaByID/:id_jornada', getJornadaById)

router.put('/api/UpdateJornada/:id_jornada', UpdateJornada)

router.delete('/api/DeleteJornada/:id_jornada', DeleteJornada)

module.exports = router;