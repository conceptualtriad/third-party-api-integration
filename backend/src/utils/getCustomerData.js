// import mongoose from 'mongoose'
import Customer from '../config/customer.js'
import fs from 'node:fs/promises'

let pageSize = '1000'
let totalCustomerRecords
let totalPages

// for testing
const writeTestData = async content => {
  try {
    await fs.writeFile(
      './scratch_data_tmp/test.tmp.json',
      JSON.stringify(content)
    )
  } catch (err) {
    console.log(err)
  }
}

// refresh customer data
const getCustomerData = async (req, res) => {
  const getNumCustomers = async () => {
    const response = await fetch(
      // Customers (Pagination)
      `https://app.na2.teamsupport.com/api/json/Customers?pageNumber=1&pageSize=1`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `${process.env.AUTHORIZATION_TOKEN}`
        }
      }
    )
    const data = await response.json()
    totalCustomerRecords = data.TotalRecords
    totalPages = Math.ceil(totalCustomerRecords / pageSize)
    return res
      .status(200)
      .json({ message: `${totalCustomerRecords} records populating...` })
  }
  const populateCustomerData = async numPages => {
    let page = 1
    while (page <= numPages) {
      const response = await fetch(
        // Customers (Pagination)
        `https://app.na2.teamsupport.com/api/json/Customers?pageNumber=${page}&pageSize=${pageSize}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: process.env.AUTHORIZATION_TOKEN
          }
        }
      )
      const data = await response.json()
      // insert customer data for each result
      for (let record in data) {
        try {
          await Customer.findOneAndUpdate(
            { ID: data[record].ID },
            record,
            // insert new document, if it doesn't exist
            { upsert: true, new: true }
          )
        } catch (e) {
          console.log(e.message)
        }
      }
      page += 1
    }
  }
  await getNumCustomers()
  await populateCustomerData(totalPages)
}

export default getCustomerData
