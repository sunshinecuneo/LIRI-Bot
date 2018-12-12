// Code to read and set any environment variables with the dotenv package
require("dotenv").config();

// To include the Node File System module
var fs = require("fs");

// Setting a variable for the Node Spotify package
var Spotify = require("node-spotify-api");

// Setting a variable for the Node Axios package
var axios = require("axios");

// Importing the Spotify keys
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


// Setting a variable for Moment for the date format
var moment = require("moment");


// Searching the BandsInTown API for a concert
function concertThis(searchTerm) {
    var concertUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
    axios.get(concertUrl).then(
        function (response) {
            console.log(response.data[0].venue);
            //  var dateFormat = moment(response.data[0].datetime;
            // console.log(response.data[0].datetime.format("MM/DD/YYYY"));

        });
}

// Searching the Spotify API for a song name
function spotifyThis(searchTerm) {
    // var Spotify = require("node-spotify-api");
    spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].album.artists[0].name);

        console.log(data.tracks.items[0].album.preview_url || data.tracks.items[0].album.href);
        //   console.log(data.tracks.items[0].album.href); 
        console.log(data.tracks.items[0].album.name);
    });
}

function getMeMovie(searchTerm) {
    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            console.log(response.data.Ratings[1]);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
        }
    );
}

// Function for determining which command is executed
var commandThis = function (command, searchTerm) {
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
var runCommand = function (argOne, argTwo) {
    commandThis(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runCommand(process.argv[2], process.argv.slice(3).join(" "));



