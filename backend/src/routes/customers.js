import express from 'express'
import getCustomerData from '../utils/getCustomerData.js'
// import jwtVerify from '../middleware/jwt-verify.js'

const app = express()

// Apply JWT verification middleware to routes below
// app.use(jwtVerify)

app.get('/', async (req, res) => {
	return res.status(200).json({ message: 'customers route' })
})

// get all data from 3rd party API, and populate database
app.post('/populate-all-data', async (req, res) => {
	getCustomerData(req, res)
})

export default app
