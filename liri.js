// Code to read and set any environment variables with the dotenv package
require("dotenv").config();

// To include the Node File System module
var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");

// Importing the Spotify keys
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


// var command = process.argv[2].toLowerCase() || "spotify-this-song";
// var searchTerm = process.argv.slice(3).join(" ");

// Searching by Artist
function concertThis(searchTerm) {
    var concertUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
    axios.get(concertUrl).then(
     function(response) {
        for (var i = 0; i < response.data.length; i++) {  var show = response.data[i] console.log(show.venue.city)}
     }   
    )
}




// Searching by song name
function spotifyThis(searchTerm) {
    spotify.search({ type: 'track', query: searchTerm }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items[0].album.artists[0].name); 
      console.log(data.tracks.items[0].album.name); 
      console.log(data.tracks.items[0].album.preview_url || data.tracks.items[0].album.href); 
      console.log(data.tracks.items[0].album.href); 
      });
}

// Function for determining which command is executed
var commandThis = function(command, searchTerm) {
    switch (command) {
    case "concert-this":
      concertThis(searchTerm);
      break;
    case "spotify-this-song":
      spotifyThis(searchTerm);
      break;
    case "movie-this":
      getMeMovie(searchTerm);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI doesn't know that");
    }
  };
  
  // Function which takes in command line arguments and executes correct function accordingly
  var runCommand = function(argOne, argTwo) {
    commandThis(argOne, argTwo);
  };
  
  // MAIN PROCESS
  // =====================================
  runCommand(process.argv[2], process.argv.slice(3).join(" "));



