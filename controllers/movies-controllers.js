const Movie = require('../models/Movies')
const asyncHandler = require('express-async-handler')

// @desc    Fetch all movies
// @route   GET /api/movies
// @access  Public

exports.getAllMovies = asyncHandler(async (req, res) => {
	try {
		const movies = await Movie.find({})
		res.status(200).json(movies)
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
})

exports.getMovie = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params
		const movie = await Movie.findById(id)
		res.status(200).json({ movie })
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
})
