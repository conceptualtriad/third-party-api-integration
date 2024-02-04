import mongoose from 'mongoose'

const actionSchema = new mongoose.Schema(
	{
		// A single object contains data returned from 3rd party API
		actionData: { type: Object }
	},
	{ collection: 'actions', timestamps: true } // documents include createdAt and updatedAt
)

export default mongoose.model('Action', actionSchema)
