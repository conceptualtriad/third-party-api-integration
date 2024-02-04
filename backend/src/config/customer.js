import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema(
	{
		// A single object contains data returned from 3rd party API
		customerData: { type: Object }
	},
	{ collection: 'customers', timestamps: true } // documents include createdAt and updatedAt
)

export default mongoose.model('Customer', customerSchema)
