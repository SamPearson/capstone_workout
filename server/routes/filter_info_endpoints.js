//The express router lets us break groups of routes out into separate files
const express = require("express")
const router = express.Router()

//Lodash provides various utitility functions such as searching arrays
const _ = require('lodash')

const { build_endpoint_url, wger_api_fetch } = require('./wger_api_functions.js')

//Fetching a list of equipment
router.get('/equipment', async function(req,res){

  const request_url = build_endpoint_url( "equipment" )
  const results = await wger_api_fetch(request_url)
  res.send(results)

})


//Fetching a list of muscles
router.get('/muscles', async function(req,res){

  const request_url = build_endpoint_url( "muscle" )
  const results = await wger_api_fetch(request_url)
  res.send(results)

})


//Fetching a list of exercise categories
router.get('/muscle_groups', async function(req,res){

  const request_url = build_endpoint_url( "exercisecategory" )
  const results = await wger_api_fetch(request_url)
  res.send(results)

})



module.exports = router