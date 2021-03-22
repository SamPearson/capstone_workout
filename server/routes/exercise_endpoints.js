//The express router lets us break groups of routes out into separate files
const express = require("express")
const router = express.Router()

//Using fetch for API calls
const fetch = require('node-fetch')
//Lodash provides various utitility functions such as searching arrays
const _ = require('lodash')


const { build_endpoint_url, wger_api_fetch } = require('./wger_api_functions.js')
const wger_filter = require('./filter_functions.js')

//Fetch all Exercises
router.get('/all', async function(req,res){

  const request_url = build_endpoint_url( "exerciseinfo" )
  const results = await wger_api_fetch(request_url)
  res.send(results)

})

// id
router.get('/id/:exercise_id', async function(req,res){

  const request_url = build_endpoint_url( `exerciseinfo/${req.params.exercise_id}` )
  const results = await wger_api_fetch(request_url)
  res.send(results)

})

router.get('/', async function(req,res){

  let endpoint = "exerciseinfo"
  let params = {}
  
  // muscle group
  // URL - http://localhost:3000/exercises?muscle_group=2
  // Doesn't work.
  if( req.query.muscle_group ){
    let qparam = req.query.muscle_group
    console.log(`Searching for exercises in a muscle group = '${qparam}'`)
    
    if( isNaN(qparam) ){

      console.log(`got a string or something, searching for a muscle group that matches '${qparam}'`)
      let muscle_groups = await wger_filter.muscle_group_list()
      let target_index = _.findIndex(muscle_groups, function(o) { return o.name.toLowerCase().includes(qparam.toLowerCase()) } )

      console.log( `Found a match for ${qparam}, ${target_index}`)
      params.exercisecategory = target_index

    } else {

      endpoint = "exercise"
      params.exercisecategory = qparam
      console.log(params)

    }

  }
  
  // specific muscle
  // URL - http://localhost:3000/exercises?muscle=2
  // Search for exercises that use a specific muscle
  if( req.query.muscle ){
    let qparam = req.query.muscle
    console.log(`Searching for exercises using specific a muscle= '${qparam}'`)
    
    if( isNaN(qparam) ){

      console.log(`got a string or something, searching for a muscle that matches '${qparam}'`)
      let muscles = await wger_filter.muscle_list()
      let target_index = _.findIndex(muscles, function(o) { return o.name.toLowerCase().includes(qparam.toLowerCase()) } )

      console.log( `Found a match for ${qparam}, ${target_index}`)
      params.category = target_index

    } else {

      params.muscles = qparam
      console.log(params)

    }

  }


  // equipment
  // URL - http://localhost:3000/exercises?equipment=2
  if( req.query.equipment ){
    let qparam = req.query.equipment
    console.log(`Searching for exercises matching equipment = '${qparam}'`)
    
    if( isNaN(qparam) ){

      console.log(`got a string or something, searching for equipment that matches '${qparam}'`)
      let equipment_list = await wger_filter.equipment_list()
      let target_index = _.findIndex(equipment_list, function(o) { return o.name.toLowerCase().includes(qparam.toLowerCase()) } )

      console.log( `Found a match for ${qparam}, ${target_index}`)
      params.category = target_index

    } else {

      params.equipment = qparam
      console.log(params)

    }

  }


  // w/ images
  if( req.query.has_image ){
    
    console.log(`Searching for exercises with images`)

  }

  // by name
  if( req.query.name_contains ){
    console.log(`Searching for exercises whose name contains ${req.query.name_contains}`)

  }


  const request_url = build_endpoint_url( endpoint, params )
  const results = await wger_api_fetch(request_url)
  res.send(results)


})



module.exports = router