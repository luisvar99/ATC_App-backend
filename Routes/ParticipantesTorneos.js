const {Router} = require('express')
const {addParticipant, Desinscripcion
} = require('../Controllers/ParticipantesTorneos')

const router = new Router();

router.post('/api/addParticipant', addParticipant)
router.delete('/api/Desinscripcion/:id_subtorneo/:user_id/:modalidad/:id_pareja', Desinscripcion)

module.exports = router;