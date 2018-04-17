require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter")

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

    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    var params = { screen_name: 'Geyser_Grand' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            return console.log("error: "+ error);
        }

        fs.appendFile("log.txt", " ***** TWITTER ***** ", function(err){});

        for (i = 0; i < 20; i++) {
            console.log("\nDate Created: " + tweets[i].created_at);
            console.log("\nTweet: \n" + tweets[i].text);
            console.log("\n-------------------------");

            fs.appendFile("log.txt", " ----- " + tweets[i].text, function(err){});
        }
    });
     
}


 
function song() {

    //process user input 
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

    //send request to Spotify and process result
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({ type: 'track', query: songTitle, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        fs.appendFile("log.txt", " ***** SPOTIFY ***** ", function(){});

        for (i = 0; i < data.tracks.items.length; i++) {
            var info = data.tracks.items[i];

            if (info.name === songTitle) {
                var song = info.name;
                console.log("\nSong Name: " + song);
                var artist = info.artists[0].name;
                console.log("Artist: " + artist);
                var album = info.album.name;
                console.log("Album Name: " + album);
                var preview = info.external_urls.spotify;
                console.log("Preview Link: " + preview);

                fs.appendFile("log.txt", " ----- Song: " + song
                                        + " ----- Artist: " + artist 
                                        + " ----- Album: " + album 
                                        + " ----- Link: " + preview, function(){});
            }
        }
    });

}



function movie() {

    //process user input for movie title
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

    //send request to OMDB and process result
    var omdb = keys.omdb.apikey;

    movieTitle = encodeURIComponent(movieTitle).replace(/'/g, "%27");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + omdb;

    request(queryUrl, function (error, response, body) {

        fs.appendFile("log.txt", " ***** OMDB ***** ", function(){});

        if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            console.log("\nMovie Title: " + movieData.Title);
            console.log("Release Year: " + movieData.Year);
            console.log("Rated: " + movieData.Rated);
            console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
            console.log("Produced in: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);

            fs.appendFile("log.txt", " ----- Movie Title: " + movieData.Title
                                        + " ----- Release Year: " + movieData.Year 
                                        + " ----- Rated: " + movieData.Rated 
                                        + " ----- Rotten Tomatoes: " + movieData.Ratings[1].Value
                                        + " ----- Plot: " + movieData.Plot, function(){});

        } else {
            return console.log(body.Error);
        }
    });
}



function txtTask() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var fileRead = data.split(",");
        var songTitle = fileRead[1];

        switch (fileRead[0]) {
            case "my-tweets":
                tweets();
                break;

            case "spotify-this-song":
                var spotify = new Spotify({
                    id: keys.spotify.id,
                    secret: keys.spotify.secret
                });

                spotify.search({ type: 'track', query: songTitle, limit: 1 }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }

                    fs.appendFile("log.txt", " ***** SPOTIFY FROM RANDOM.TXT FILE ***** ", function(){});

                    for (i = 0; i < data.tracks.items.length; i++) {
                        var info = data.tracks.items[i];
                        if ('"' + info.name + '"' === songTitle) {
                            var song = info.name;
                            console.log("\nSong Name: " + song);
                            var artist = info.artists[0].name;
                            console.log("Artist: " + artist);
                            var album = info.album.name;
                            console.log("Album Name: " + album);
                            var preview = info.external_urls.spotify;
                            console.log("Preview Link: " + preview);
                            

                            fs.appendFile("log.txt", " ----- Song: " + song
                                        + " ----- Artist: " + artist 
                                        + " ----- Album: " + album 
                                        + " ----- Link: " + preview, function(){});
                        }

                    }
                });
                break;

            case "movie-this":
                movie()
                break;


        }
    });
}
