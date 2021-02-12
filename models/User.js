const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Please write a username'],
			unique: [true, 'This username is already in use'],
		},

		password: {
			type: String,
			required: [true, 'Please write a password!'],
		},
	},
	{
		timestamps: true,
	}
)

userSchema.methods.mathPassword = async function () {
	return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
module.exports = User
