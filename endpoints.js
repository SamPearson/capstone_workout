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
  //This function was built to fetch data from the API and halt control flow of
  // the program until that data is retrieved. Calls to this function should 
  // use 'await' and thus be inside of another async function.
  console.log(`Fetching data from the API using the url ${url}`)

  var exercise_list = {}

  await fetch (url)
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

    //You may want to put similar logspam right after the call to this function
    // as a means of double-checking whether you have the data before attempting
    // to modify or use it.
    console.log("Finished fetching API data.")
    return exercise_list

}


app.get('/debug/paramtest', async function(req, res){
  //In this function, the desired endpoint and list of parameters
  // are hard-coded. This is simply to show that the api fetch function
  // can be passed an endpoint and some params. In more realistic use cases,
  // the endpoint and paramters would be pulled out of post variables from 
  // the request, which would in turn be constructed by an html form.

  const endpoint = 'exerciseinfo/'
  const param_list = {
    muscles : 1,
    equipment : 3
  }

  const request_url = build_endpoint_url(endpoint, param_list)
  const results = await wger_api_fetch(request_url)
  res.send(results)

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