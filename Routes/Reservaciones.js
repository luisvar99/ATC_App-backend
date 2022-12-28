const {Router} = require('express')
const {addReservacion, GetCanchaReservaciones, GetReservaDetails, 
    UpdateReservacion, DeleteReservacion, GetReservaOwner
} = require('../Controllers/Reservaciones')

const router = new Router();

router.post('/api/createReservation', addReservacion)

router.get('/api/GetCanchaReservaciones/:idCancha/:fecha', GetCanchaReservaciones)
router.get('/api/GetReservaOwner/:id_horario', GetReservaOwner)
router.get('/api/GetReservaDetails/:idReserva/:id_socio', GetReservaDetails)

router.put('/api/updateReservation/:id_reserva', UpdateReservacion)

router.delete('/api/deleteReserva/:idReservacion', DeleteReservacion)

module.exports = router;