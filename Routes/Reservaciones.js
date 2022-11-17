const {Router} = require('express')
const {addReservacion, GetCanchaReservaciones, GetReservaDetails, 
    UpdateReservacion, DeleteReservacion, GetReservaOwner
} = require('../Controllers/Reservaciones')

const router = new Router();

router.post('/api/createReservation', addReservacion)

router.get('/api/GetCanchaReservaciones/:idCancha/:fecha', GetCanchaReservaciones)
router.get('/api/GetReservaOwner/:id_horario', GetReservaOwner)
router.get('/api/GetReservaDetails/:idReserva', GetReservaDetails)

router.put('/api/editHorario/:idHorario', UpdateReservacion)

router.delete('/api/deleteReserva/:idReservacion', DeleteReservacion)

module.exports = router;