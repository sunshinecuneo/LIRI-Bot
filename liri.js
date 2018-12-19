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
            var dateFormat = moment(response.data[0].datetime).format('MM/DD/YYYY');
            var concertData = [`
            Venue Name: ${response.data[0].venue.name}
            Venue Location: ${response.data[0].venue.city}
            Date: ${dateFormat}`].join("/n/r");
            console.log(concertData);
            logSearches(concertData);
        });
}

// Searching the Spotify API for a song name
function spotifyThis(searchTerm) {
    if (searchTerm ==false) {
        searchTerm = "The Sign by Ace of Base"
    }
    spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
            var spotifyData = [`
        Artist Name: ${data.tracks.items[0].album.artists[0].name}
        Song Name: ${data.tracks.items[0].name}
        Album Preview Link: ${data.tracks.items[0].album.preview_url || "No preview link available"}
        Album Name: ${data.tracks.items[0].album.name}
        `].join("/n/r");
        console.log(spotifyData);
        logSearches(spotifyData);
    });
}

// Searching the OMDB for a movie
function getMovie(searchTerm) {
    if (searchTerm ==false) {
        searchTerm = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            var movieData = [`
    Title: ${response.data.Title}
    Year the movie came out: ${response.data.Year}
    IMDB rating: ${response.data.Ratings[0].Value} 
    Rotten Tomatoes rating: ${response.data.Ratings[1].Value} 
    Country Produced: ${response.data.Country} 
    Language: ${response.data.Language} 
    Plot: ${response.data.Plot} 
    Actors: ${response.data.Actors} 
                    `].join("/n/r");
            console.log(movieData);
            logSearches(movieData);
        }
    );
}
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var newSearch = data.split(",");
        var newCommand = newSearch[0];
        var newOperator = newSearch[1];

        switch (newCommand) {
            case "concert-this":
                var artist = newOperator;
                concertThis(artist);
                break;
            case "spotify-this-song":
                var song = newOperator;
                spotifyThis(song);
                break;
            case "movie-this":
                var movie = newOperator;
                movieThis(movie);
                break;
            default:
                console.log("Hit default!");
                return false;
        }
    });
}



// Function for determining which command is executed
var commandThis = function (command, searchTerm) {
    // fs.appendFile('log.txt', command + ",  " + searchTerm + "; ",  function (err) {
    //     if (err) throw err;
    //     console.log("The data to append was appended to file!");
    //   });

    switch (command) {
        case "concert-this":
            concertThis(searchTerm);
            break;
        case "spotify-this-song":
            var song = searchTerm
            if (!searchTerm) {
                song = "The Sign by Ace of Base";
            }
            spotifyThis(searchTerm);
            break;
        case "movie-this":
            getMovie(searchTerm);
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

function logSearches(term) {

    fs.appendFile("log.txt", term, function (err) {
        if (err) throw err;
    })

}



