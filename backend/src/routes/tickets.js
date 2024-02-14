import express from 'express'
import { getTicketData } from '../utils/getTicketData.js'
// import jwtVerify from '../middleware/jwt-verify.js'

const app = express()

// Apply JWT verification middleware to routes below
// app.use(jwtVerify)

app.get('/', async (req, res) => {
	return res.status(200).json({ message: 'tickets route' })
})

// get all data from 3rd party API, and populate database
app.post('/populate-all-data', async (req, res) => {
	getTicketData(req, res)
})

// app.get('/:id', async (req, res) => {
//   return res.status(404).json({ message: `${req} not found` })
// })

export default app
