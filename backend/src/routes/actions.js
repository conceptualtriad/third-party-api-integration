import express from 'express'
import getActionData from '../utils/getActionData.js'
// import jwtVerify from '../middleware/jwt-verify.js'

const app = express()

// Apply JWT verification middleware to routes below
// app.use(jwtVerify)

app.get('/', async (req, res) => {
	return res.status(200).json({ message: 'actions route' })
})

// get all data from 3rd party API, and populate database
app.post('/populate-all-data', async (req, res) => {
	getActionData(req, res)
})

export default app
