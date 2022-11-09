const {Router} = require('express')
const {addReservacion, GetCanchaReservaciones, GetReservacionById, 
    UpdateReservacion, DeleteReservacion
} = require('../Controllers/Reservaciones')

const router = new Router();

router.post('/api/addHorario', addReservacion)

router.get('/api/GetCanchaReservaciones/:idCancha', GetCanchaReservaciones)
router.get('/api/getSingleHorario/:idHorario', GetReservacionById)

router.put('/api/editHorario/:idHorario', UpdateReservacion)

router.delete('/api/deleteHorario/:idHorario', DeleteReservacion)

module.exports = router;