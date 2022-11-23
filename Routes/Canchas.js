const {Router} = require('express')
const {addCancha, getAllTennisCanchas, GetCanchaById, 
    UpdateCancha, DeleteCancha, getAllPadelCanchas,getAllCanchas
} = require('../Controllers/Canchas')

const router = new Router();

router.post('/api/addCancha', addCancha)

router.get('/api/getAllTennisCanchas', getAllTennisCanchas)
router.get('/api/getAllPadelCanchas', getAllPadelCanchas)
router.get('/api/getAllCanchas', getAllCanchas)
router.get('/api/getSingleCancha/:idCancha', GetCanchaById)

router.put('/api/editCancha/:idCancha', UpdateCancha)

router.delete('/api/deleteCancha/:idCancha', DeleteCancha)

module.exports = router;