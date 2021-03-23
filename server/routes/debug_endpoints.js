//The express router lets us break groups of routes out into separate files
const express = require("express")
const router = express.Router()

//Using fetch for API calls
const fetch = require('node-fetch')
//Lodash provides various utitility functions such as searching arrays
const _ = require('lodash')


const { build_endpoint_url, wger_api_fetch } = require('./wger_api_functions.js')


router.get('/paramtest', async function(req, res){
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
router.get('/exercises', function(req,res){

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

module.exports = router