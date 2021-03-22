//This file provides generic methods to build an wger.de API request URL
// and fetch the specified data from the api

//Using fetch for API calls
const fetch = require('node-fetch')
//Lodash provides various utitility functions such as searching arrays
const _ = require('lodash')



function build_endpoint_url(endpoint, search_params = {}, language = 2, limit = 250){

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
        exercise_list = data.results
      } else if (data.detail === 'Not found.') {
        console.log("No data returned from the API. bad news!")
        exercise_list = data
      } else if( data ) {
        exercise_list = data
      } else {
        console.log("Probably an error, api data is not")
      }
      
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


//Exporting these methods so they can be pulled into various express route files
module.exports = { build_endpoint_url, wger_api_fetch }