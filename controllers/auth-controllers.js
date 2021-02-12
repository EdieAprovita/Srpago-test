const User = require('../models/User')
const generateToken = require('../utils/generateToken')
const asyncHandler = require('express-async-handler')

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public

exports.authUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body

	const user = await User.findOne({ username })

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			username: user.username,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('Invalid username or password')
	}
})

// @desc    Register a new user
// @route   POST /api/auth
// @access  Public

exports.registerUser = asyncHandler(async (req, res) => {
	try {
		const { username, password } = req.body

		const userExists = await User.findOne({ username })

		if (userExists) {
			res.status(400).json({ message: `This user already exist ${userExists}`.red })
		}

		const user = await User.create({
			username,
			password,
		})

		if (user) {
			res.status(201).json({
				_id: user._id,
				username: user.username,
				token: generateToken(user._id),
			})
		}
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
})

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private

exports.getUserProfile = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.user._id)

		if (user) {
			res.json({
				_id: user._id,
				username: user.username,
			})
		}
	} catch (error) {
		res.status(400).json({ message: 'Not authorized to enter!!' })
	}
})
