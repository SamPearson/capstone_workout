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

function build_endpoint_url(endpoint, search_params, language = 2, limit = 250){

  const default_params = `?language=${language}&limit=${limit}&`

  //Using a map to join search parameters and their values
  // each key and value in search_params is joined with '='
  // then, each pair is joined with '&'
  const url_params = default_params + Object.entries(search_params).map(e => e.join('=')).join('&')

  let full_url = 'https://wger.de/api/v2/' + endpoint + url_params
  
  console.log(`Constructed the API url: ${full_url}`)

  return full_url

}


async function wger_api_fetch(url){

  console.log("3 - Now you're in the API fetch function; I expect this to happen third")

  var exercise_list = []
  fetch (url)
    .then((response) => {
      return response.json()
    })
    .then((data) =>{

      //Log data about the results to the console
      if( data.count ){
        console.log(`Number of results: ${data.count}`)
      }

      exercise_list = data.results
      
    })
    .catch((err)=>{
      console.log('---')
      console.log("Hey look an error. How exceptional.")
      console.log(err)
      console.log('---')
      return {}

    })
    .finally( ()=>{
      console.log("4 - Now we have the desired JSON stored in a variable. I expect this to happen fourth")
      console.log(exercise_list) //Uncomment this to show that the desired JSON is present
      return exercise_list // this returns 'undefined' to where the function was called from
    })

}


app.get('/debug/paramtest', function(req, res){

  console.log("1 - You've hit the endpoint. I expect this to happen first.")

  const endpoint = 'exerciseinfo/'

  const param_list = {
    muscles : 1,
    equipment : 3
  }
  
  console.log("Building request URL")
  const request_url = build_endpoint_url(endpoint, param_list)
  console.log("2 - The API URL has been constructed. I expect this to happen second.")
  const results = wger_api_fetch(request_url)
  .then( response => {
    console.log("5 - Now we should have the desired JSON, but we're back in the express route function so we can handle it. I expect this to happen fifth")
    //logging reslts or response at this point returns a promise or 'undefined', respectively 
    console.log(`${results} - ${response} - lol stupid`)
  
    console.log("Sending results to the client")
    res.json(results) 
    })



})

//Fetch all Exercises
app.get('/exercises', function(req,res){

  fetch ('https://wger.de/api/v2/exerciseinfo/?language=2&limit=250')
    .then((response) => {
      return response.json()
    })
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