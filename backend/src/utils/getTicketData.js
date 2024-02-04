import Ticket from '../config/ticket.js'
import fs from 'node:fs/promises'

let pageSize = '1000'
let totalTicketRecords
let ticketCount = 0
let totalPages

// for testing
const writeTestData = async (content) => {
	try {
		await fs.writeFile(
			'./scratch_data_tmp/test.tmp.json',
			JSON.stringify(content)
		)
	} catch (err) {
		console.log(err)
	}
}

// for testing
const testQuery = async () => {
	const result = await Ticket.find().limit(10)
	const ticketIdArray = result.map((ticket) => {
		return ticket.ticketData.ID
	})
	writeTestData(ticketIdArray)
}

// refresh ticket data
const getTicketData = async (req, res) => {
	const getNumTickets = async () => {
		const response = await fetch(
			// Tickets (Pagination)
			`https://app.na2.teamsupport.com/api/json/Tickets?pageNumber=1&pageSize=1`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: `${process.env.AUTHORIZATION_TOKEN}`
				}
			}
		)
		const data = await response.json()
		totalTicketRecords = data.TotalRecords
		totalPages = Math.ceil(totalTicketRecords / pageSize)
		return res
			.status(200)
			.json({ message: `${totalTicketRecords} records populating...` })
	}
	const populateTicketData = async (numPages) => {
		let page = 1
		while (page <= numPages) {
			const response = await fetch(
				// Tickets (Pagination)
				`https://app.na2.teamsupport.com/api/json/Tickets?pageNumber=${page}&pageSize=${pageSize}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization: process.env.AUTHORIZATION_TOKEN
					}
				}
			)
			const data = await response.json()
			// insert ticket data for each result
			data.Tickets.forEach(async (ticketRecord) => {
				try {
					await Ticket.findOneAndUpdate(
						{ 'ticketData.ID': ticketRecord.ID },
						{ ticketData: ticketRecord },
						// insert new document, if it doesn't exist
						{ upsert: true, new: true }
					)
				} catch (e) {
					console.log(e.message)
				}
				ticketCount += 1
			})
			page += 1
		}
	}
	await getNumTickets()
	await populateTicketData(totalPages)
}

export { getTicketData, writeTestData, testQuery }
