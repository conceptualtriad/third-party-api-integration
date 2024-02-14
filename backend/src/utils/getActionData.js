// import mongoose from 'mongoose'
import Action from '../config/action.js'
import Ticket from '../config/ticket.js'
import fs from 'node:fs/promises'

let arrayChunkSize = 1000
let arrayChunkNumber = 1
let totalTicketRecords
let totalChunks
let ticketCount = 0
let upsertCount = 0

// for testing
const writeLog = async (content) => {
	try {
		timeStamp()
		// await fs.writeFile(
		await fs.appendFile(
			// './scratch_data_tmp/test.tmp.json',
			'./scratch_data_tmp/test.tmp.log',
			// JSON.stringify(content)
			`${timeStamp()}\t${content} \r\n`
		)
	} catch (err) {
		console.log(err)
	}
}
const timeStamp = () => {
	const today = new Date()
	const yyyy = today.getFullYear()
	let MM = today.getMonth() + 1 // month is zero-based
	let dd = today.getDate()
	let hh = today.getHours()
	let mm = today.getMinutes()
	let ss = today.getSeconds()
	let ms = today.getMilliseconds()

	if (MM < 10) MM = `0${MM}`
	if (dd < 10) dd = `0${dd}`
	if (hh < 10) hh = `0${hh}`
	if (mm < 10) mm = `0${mm}`
	if (ss < 10) ss = `0${ss}`
	if (ms < 100) ms = `0${ms}`
	if (ms < 10) ms = `0${ms}`

	const formatted = `${yyyy}-${MM}-${dd} ${hh}:${mm} ${ss}:${ms}`
	// console.log(formatted) // 24/04/2023
	return formatted // 24/04/2023
}

// get all action data
const getNumActionsAndData = async (ticketIdArray) => {
	for (let ticketId in ticketIdArray) {
		ticketCount += 1
		const response = await fetch(
			// Actions
			`https://app.na2.teamsupport.com/api/json/Tickets/${ticketIdArray[ticketId]}/Actions`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: process.env.AUTHORIZATION_TOKEN
				}
			}
		)
		const data = await response.json()
		// data.Actions.forEach(async (actionRecord) => {
		for (let action in data.Actions) {
			try {
				await Action.findOneAndUpdate(
					{ 'actionData.ID': action.ID },
					{ actionData: action },
					// insert new document, if it doesn't exist
					{ upsert: true, new: true }
				)
			} catch (e) {
				console.log(e.message)
			}
			upsertCount += 1
			// })
		}
		// for testing
		writeLog(`ticketCount: ${ticketCount}`)
		writeLog(`upsertCount: ${upsertCount}`)
		writeLog(`Last ticketID: ${ticketIdArray.pop()}`)
	}
	writeLog(`${upsertCount} records updated`)
}

const getActionData = async (req, res) => {
	fs.writeFile('./scratch_data_tmp/test.tmp.log', '')

	// get action IDs from tickets
	let result = await Ticket.find()
	totalTicketRecords = result.length
	res.status(200).json({
		message: `Actions for ${totalTicketRecords} Tickets populating...`
	})
	totalChunks = Math.ceil(result.length / arrayChunkSize)
	let tempArray = []
	while (arrayChunkNumber <= totalChunks) {
		result.length < arrayChunkSize
			? (tempArray = result)
			: (tempArray = result.splice(0, arrayChunkSize))

		const ticketIdArray = tempArray.map((ticket) => {
			return ticket.ticketData.ID
		})
		fs.writeFile('./scratch_data_tmp/test.tmp.log', '')

		writeLog(
			`
			arrayChunkNumber: ${arrayChunkNumber}, 
			totalChunks: ${totalChunks}, 
			ticketIdArrayLength: ${ticketIdArray.length},
			`
		)
		getNumActionsAndData(ticketIdArray)

		arrayChunkNumber += 1
		// arrayChunkNumber = totalChunks
	}
}

export default getActionData
