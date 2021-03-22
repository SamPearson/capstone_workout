//The express router lets us break groups of routes out into separate files
const express = require("express")
const router = express.Router()

//Using fetch for API calls
const fetch = require('node-fetch')
//Lodash provides various utitility functions such as searching arrays
const _ = require('lodash')


const { build_endpoint_url, wger_api_fetch } = require('./wger_api_functions.js')

//Fetch all Exercises
router.get('/all', async function(req,res){

  const request_url = build_endpoint_url( "exerciseinfo" )
  const results = await wger_api_fetch(request_url)
  res.send(results)

})

// id
router.get('/:exercise_id', async function(req,res){

  const request_url = build_endpoint_url( `exerciseinfo/${req.params.exercise_id}` )
  const results = await wger_api_fetch(request_url)
  res.send(results)

})


// equipment needed

// muscle group

// specific muscle(?)

// w/ images

// by name

// Fetching a list of chest exercises that don't require equipment
//fetch ('https://wger.de/api/v2/exercise/?language=2&category=11&equipment=7')



module.exports = router