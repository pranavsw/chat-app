// const express = require('express')  // removed after adding modules
import express from 'express'
import dotenv from 'dotenv' // Importing dotenv to load environment variables

import {connectDB} from "./lib/db.js" // Importing the database connection function
import authRoutes from "./routes/auth.route.js" // Importing the auth routes

dotenv.config() // Load environment variables from .env file

const app = express()

const PORT = process.env.PORT

app.use(express.json()) // Middleware to parse JSON request bodies

app.use("/api/auth", authRoutes)

app.listen(PORT,() => {
    console.log('Server is running on port ' + PORT)
    connectDB() // Connect to the database when the server starts
})