const fetch = require("node-fetch")

//Fetching a list of all exercises
//returns an object with "count", "next", "previous" and "results"
//results is limited to 20 by default, can be set as high as 100
//next and previous will be urls for the next/previous set of results
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

// Example data: Single exercise -
// {
//   id: 74,
//   name: 'Biceps Curls With Barbell',
//   uuid: 'c56078d2-ae85-4524-a467-d1e143b6df1a',
//   category: { id: 8, name: 'Arms' },
//   description: '<p>Hold the Barbell shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement.</p>\n' +
//     "<p>Don't allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows).</p>",
//   creation_date: '2013-05-05',
//   muscles: [ { id: 1, name: 'Biceps brachii', is_front: true } ],
//   muscles_secondary: [ { id: 13, name: 'Brachialis', is_front: true } ],
//   equipment: [ { id: 1, name: 'Barbell' } ],
//   language: { id: 2, short_name: 'en', full_name: 'English' },
//   license: {
//     id: 1,
//     full_name: ' Creative Commons Attribution Share Alike 3',
//     short_name: 'CC-BY-SA 3',
//     url: 'https://creativecommons.org/licenses/by-sa/3.0/deed.en'
//   },
//   license_author: 'wger.de',
//   images: [
//     {
//       id: 27,
//       exercise: 74,
//       image: 'https://wger.de/media/exercise-images/74/Bicep-curls-1.png',
//       status: '2',
//       is_main: true
//     },
//     {
//       id: 28,
//       exercise: 74,
//       image: 'https://wger.de/media/exercise-images/74/Bicep-curls-2.png',
//       status: '2',
//       is_main: false
//     }
//   ],
//   variations: { id: 16 },
//   comments: [
//     { id: 118, exercise: 74, comment: 'Keep your upper body straight' },
//     {
//       id: 68,
//       exercise: 74,
//       comment: 'Fluid movements with no pauses at the top or the bottom'
//     }
//   ]
// }

