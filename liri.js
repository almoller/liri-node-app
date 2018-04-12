require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");

//console.log(keys);


var task = process.argv[2];
var title = process.argv;

switch (task) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        song();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        txtTask();
        break;
}


function tweets() {
    console.log("\nI Hate Tweeting.");
}

function song() {
    console.log("\nthe default song is dumb");
}

function movie() {
    if (process.argv[3] === undefined) {
        var movieTitle = "Mr Nobody";
    } else {
    movieTitle = "";

    for (i=3; i < title.length; i++) {
        if (i>3 && i< title.length){
            movieTitle = movieTitle + "+" + title[i];
        } else {
            movieTitle += title[i];
        }
    }
}

    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            console.log("\nMovie Title: " + movieData.Title);
            console.log("Release Year: " + movieData.Year);
            console.log("Rated: " + movieData.Rated);
            console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
            console.log("Produced in: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
        }
    });
}

function txtTask() {
    console.log("\nDo that thing on the txt file.");
}