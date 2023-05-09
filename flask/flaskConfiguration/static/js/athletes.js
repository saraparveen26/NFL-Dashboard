
// ------- ATHLETES DATA ------- //

// Read the data files
const offense = "./data-json/offense.json";
const defense = "./data-json/defense.json";
const special = "./data-json/special.json";
const files = [offense, defense, special];
let promises = [];
let athletes_dataset;

// INITIALIZE THE DASHBOARD
// Create a function to initialize the details
function init() {

// Add the player names from each dataset to the dropdown
// Fetch the JSON data
  let dropdownMenu = d3.select('#selPlayer');
  let firstPlayer;

  files.forEach((url) => promises.push(d3.json(url)));
  Promise.all(promises).then(function (data) {
    
    let offense = data[0];
    let defense = data[1];
    let special = data[2];
    firstPlayer = offense[0]['name'];

    [offense, defense, special].forEach(athletes_dataset => {
    athletes_dataset.forEach(player => {
      dropdownMenu.append("option").text(player['name']).property("value", player['name'])     
    });
    });
    
  // Get the selected player name
  const playerName = dropdownMenu.property("value");
  
  // Determine which dataset the player is in based on their name
  if (offense.some(player => player.name === playerName)) {
    athletes_dataset = offense;
  } 
  else if (defense.some(player => player.name === playerName)) {
    athletes_dataset = defense;
  } 
  else if (special.some(player => player.name === playerName)) {
    athletes_dataset = special;
  } 
  else {
    // Handle the case where the player isn't found in any dataset
    console.error(`Player "${playerName}" not found.`);
    return;
  }

  playerDemoInfo(firstPlayer);

});
};
// INIT ENDS HERE
console.log(athletes_dataset);

function playerOptionChanged(playerName) {
    playerDemoInfo(playerName);
};

// ATHLETE INFORMATION
// Create a function to get athlete's Information
function playerDemoInfo(playerName) {
    let player_info;
    let teamName;

    files.forEach((url) => promises.push(d3.json(url)));
    Promise.all(promises).then(function (data) {
    
    let offense = data[0];
    let defense = data[1];
    let special = data[2];

      [offense, defense, special].forEach(athletes_dataset => {
      athletes_dataset.forEach(player => {

        if (player['name'] == playerName) {
            player_info = {
            'Name': player['name'],
            'Team: ':player['teamName'],
            'Weight': player['weight'],
            'Height':player['height'], 
            'Age': player['age'],
            'Birth City': player['birthCity'],
            'Birth Country':player['birthCountry'], 
            'Position':player['position'], 
            'Experience (in years)':player['xp']
            }           
          }
            else{
              return;
            };

          d3.select("#player-logo").html("");
          d3.select("#player-logo").append('img').attr('src', player['headshot']).attr('alt', player['name']).attr('height', 150)

          // console.log(player_info)


          d3.select("#player-metadata").html("");
          let entries = Object.entries(player_info);
          entries.forEach(([key,value]) => {
          d3.select("#player-metadata").append("h5").text(`${key}: ${value}`);
          })})})})};

init();