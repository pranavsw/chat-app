// const express = require('express')  // removed after adding modules
import express from 'express'
import dotenv from 'dotenv' // Importing dotenv to load environment variables
import cookieParser from 'cookie-parser' // Importing cookie-parser to handle cookies


import {connectDB} from "./lib/db.js" // Importing the database connection function

import authRoutes from "./routes/auth.route.js" // Importing the auth routes
import messageRoutes from "./routes/message.route.js" // Importing the message routes

dotenv.config() // Load environment variables from .env file

const app = express()

const PORT = process.env.PORT

app.use(express.json()) // Middleware to parse JSON request bodies
app.use(cookieParser()) // Middleware to parse cookies

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT,() => {
    console.log('Server is running on port ' + PORT)
    connectDB() // Connect to the database when the server starts
})