require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");

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
    if (process.argv[3] === undefined) {
        var songTitle = "The Sign";
    } else {
        songTitle = "";

        for (i = 3; i < title.length; i++) {
            if (i > 3 && i < title.length) {
                songTitle = songTitle + " " + title[i];
            } else {
                songTitle += title[i];
            }
        }
    }
    console.log(songTitle);

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (i = 0; i < data.tracks.items.length; i++) {
            var info = data.tracks.items[i];

            if (info.name === songTitle) {
                var artist = info.artists[0].name;
                    console.log("\nArtist: " + artist);
                var song = info.name;
                    console.log("Song Name: " + song);
                var preview = info.external_urls.spotify;
                    console.log("Preview Link: " + preview);
                var album = info.album.name;
                    console.log("Album Name: " + album);
            } 
            // else {
            //     return //console.log("\nInfo Not Found");
            // }
        }
    });

}



function movie() {
    if (process.argv[3] === undefined) {
        var movieTitle = "Mr Nobody";
    } else {
        movieTitle = "";

        for (i = 3; i < title.length; i++) {
            if (i > 3 && i < title.length) {
                movieTitle = movieTitle + " " + title[i];
            } else {
                movieTitle += title[i];
            }
        }
    }
    console.log(movieTitle);

    movieTitle = encodeURIComponent(movieTitle).replace(/'/g, "%27");
    //encodeURIComponent(query).replace(/'/g,"%27").replace(/"/g,"%22");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            console.log("\nMovie Title: " + movieData.Title);
            console.log("Release Year: " + movieData.Year);
            console.log("Rated: " + movieData.Rated);
            console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
            console.log("Produced in: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
        } else {
            return console.log(body.Error);
        }
    });
}



function txtTask() {
    console.log("\nDo that thing on the txt file.");
}