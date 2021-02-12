const router = require('express').Router()
const { getAllMovies, getMovie } = require('../controllers/movies-controllers')

//MOVIES ROUTES

router.get('/', getAllMovies)
router.get('/:id', getMovie)

module.exports = router
