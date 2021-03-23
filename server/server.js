//Using express as the web server
const express = require('express')

//Creating a variable to call express from
const app = express()
//Lodash provides various utitility functions such as searching arrays
const _ = require('lodash')

//Save whatever port we're going to use. If the environment doesn't
// restrict what ports we can use, use port 3000.
const PORT = process.env.port || 3000

//Use express (instead of bodyparser) to handle json posted to the server
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//A sandbox for creating new routes or just goofin around
const debug_endpoints = require("./routes/debug_endpoints")
app.use("/debug", debug_endpoints )

//Endpoints that will return an exercise or a list of exercises
const exercise_endpoints = require("./routes/exercise_endpoints")
app.use("/exercises", exercise_endpoints )


app.listen(PORT)
console.log(`Listening on port ${PORT}`)