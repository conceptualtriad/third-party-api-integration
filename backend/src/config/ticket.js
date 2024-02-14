import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema(
	{
		// A single object contains data returned from 3rd party API
		ticketData: { type: Object }
	},
	{ collection: 'tickets', timestamps: true } // documents include createdAt and updatedAt
)

export default mongoose.model('Ticket', ticketSchema)
