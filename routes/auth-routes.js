const authroutes = require('express').Router()

const {
	authUser,
	registerUser,
	getUserProfile,
} = require('../controllers/auth-controllers')

const { protect } = require('../middlewares/authMiddleware')

//AUTH ROUTES

authroutes.post('/login', authUser)
authroutes.post('/signup', registerUser)
authroutes.get('/profile', (protect, getUserProfile))

module.exports = authroutes
