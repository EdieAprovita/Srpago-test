const router = require('express').Router()
const { buyTicket } = require('../controllers/order-controllers')
const { protect } = require('../middlewares/authMiddleware')

//ROUTES ORDERS

router.get('/buy-movie/:movieID', protect, buyTicket)

module.exports = router
