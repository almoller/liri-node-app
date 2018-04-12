require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");

console.log(keys);


var task = process.argv[2];
var title = process.argv[3];

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
    console.log("\nI like movies");
}

function txtTask() {
    console.log("\nDo that thing on the txt file.");
}