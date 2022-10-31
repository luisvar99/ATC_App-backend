const {Router} = require('express')
const {addParticipant, 
} = require('../Controllers/ParticipantesTorneos')

const router = new Router();

router.post('/api/addParticipant', addParticipant)

module.exports = router;