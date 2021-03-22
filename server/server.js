//Using express as the web server
const express = require('express')
//Using fetch for API calls
const fetch = require('node-fetch')
//Using bodyparser to handle JS sent in the request
const bodyParser = require('body-parser')
//Creating a variable to cal express from
const app = express()
//Lodash provides various utitility functions such as searching arrays
const _ = require('lodash')

//Save whatever port we're going to use. If the environment doesn't
// restrict what ports we can use, use port 3000.
const PORT = process.env.port || 3000

//Use bodyparser to handle json posted to the server
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//A sandbox for creating new routes or just goofin around
const debug_endpoints = require("./routes/debug_endpoints")
app.use("/debug", debug_endpoints )

//Endpoints that will return an exercise or a list of exercises
const exercise_endpoints = require("./routes/exercise_endpoints")
app.use("/exercises", exercise_endpoints )

//Endpoints that will return lists of things that exercises can be filtered by
const filter_endpoints = require("./routes/filter_info_endpoints")
app.use("/filters", filter_endpoints )


app.listen(PORT)
console.log(`Listening on port ${PORT}`)