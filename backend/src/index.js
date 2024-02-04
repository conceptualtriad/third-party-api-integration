import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import tickets from './routes/tickets.js'
import customers from './routes/customers.js'
import actions from './routes/actions.js'

dotenv.config()

await mongoose.connect(
	`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`,
	{
		authSource: 'aus-teamsupport',
		user: process.env.DATABASE_USER,
		pass: process.env.DATABASE_PASSWORD,
		dbName: 'aus-teamsupport'
	}
)

// Default port is 3000, if no Environment Variable set
const port = process.env.ENV_PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
	return res.status(200).json('TeamSupport Dashboard API')
})

app.use('/tickets', tickets)
app.use('/customers', customers)
app.use('/actions', actions)
// app.use(errorHandler)

app.listen(port, () =>
	console.log(`API server ready on http://localhost:${port}`)
)

export default app
