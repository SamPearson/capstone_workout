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

//Define exercise list as an empty object. Later, api calls will
// populate it with json strings representing exercises
let exercise_list = []


//Fetch all Exercises
app.get('/exercises', function(req,res){

  fetch ('https://wger.de/api/v2/exerciseinfo/?language=2')
    .then((response) => {
      return response.json()
    })
    //TODO: max out results per page and use a do/while loop to 
    // continue fetching while data.next exists, then concat all 
    // results into one list
    .then((data) =>{
      //Log data about the results to the console
      if( data.count ){
        console.log(`Number of results: ${data.count}`)
      }
      if( data.next ){
        console.log(`Next page of results ${data.next}`)
      }
      if( data.previous ){
        console.log(`Previous page of results: ${data.previous}`)
      }
    
      // Work with json data here
      exercise_list = data.results

      res.json(exercise_list)

    })
    .catch((err)=>{
      //do something for an error here.
      //TODO: something not stupid
      console.log("Oopsiedoodle! An error!")
      res.send()

    })


})

app.listen(PORT)
console.log(`Listening on port ${PORT}`)