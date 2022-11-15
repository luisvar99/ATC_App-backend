const {Router} = require('express')
const {addReservacion, GetCanchaReservaciones, GetReservaDetails, 
    UpdateReservacion, DeleteReservacion
} = require('../Controllers/Reservaciones')

const router = new Router();

router.post('/api/createReservation', addReservacion)

router.get('/api/GetCanchaReservaciones/:idCancha', GetCanchaReservaciones)
router.get('/api/GetReservaDetails/:id_horario', GetReservaDetails)
//router.get('/api/getSingleHorario/:idHorario', GetReservacionById)

router.put('/api/editHorario/:idHorario', UpdateReservacion)

router.delete('/api/deleteHorario/:idHorario', DeleteReservacion)

module.exports = router;