const fetch = require("node-fetch")

//Fetching a list of all exercise objects
//returns an object with "count", "next", "previous" and "results"
//results is limited to 20 by default, can be set as high as 100
//next and previous will be urls for the next/previous set of results

/************************************************************
fetch ('https://wger.de/api/v2/exerciseinfo/?language=2')
  .then((response) => {
    return response.json()
  })
  .then((data) =>{
    // Work with json data here
    console.log(data)
  })
  .catch((err)=>{
    //do something for an error here
    console.log("Oopsiedoodle! An error!")
  })
*************************************************************/

//Fetching a single exercise

fetch ('https://wger.de/api/v2/exerciseinfo/74/?language=2')
  .then((response) => {
    return response.json()
  })
  .then((data) =>{
    // Work with json data here
    console.log(data)
  })
  .catch((err)=>{
    //do something for an error here
    console.log("Oopsiedoodle! An error!")
  })
