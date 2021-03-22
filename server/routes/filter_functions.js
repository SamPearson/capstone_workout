
//Lodash provides various utitility functions such as searching arrays
const _ = require('lodash')

const { build_endpoint_url, wger_api_fetch } = require('./wger_api_functions.js')

//Fetching a list of equipment
async function equipment_list(){
  const request_url = build_endpoint_url( "equipment" )
  const results = await wger_api_fetch(request_url)
  return results

}


//Fetching a list of muscles
async function muscle_list(){
  const request_url = build_endpoint_url( "muscle" )
  const results = await wger_api_fetch(request_url)
  return results

}


//Fetching a list of muscle group categories
async function muscle_group_list(){
  const request_url = build_endpoint_url( "exercisecategory" )
  const results = await wger_api_fetch(request_url)
  return results

}


module.exports = {equipment_list, muscle_list, muscle_group_list}
