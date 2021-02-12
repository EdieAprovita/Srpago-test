const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema(
	{
		movie: {
			type: Schema.Types.ObjectId,
			ref: 'Movie',
		},

		attendance: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
