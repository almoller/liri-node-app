# liri-node-app

This LIRI App is a Node.JS application that takes commands in the terminal to retrieve, display and log data from Twitter, Spotify, and the OMDB movie database. All data requests are logged in the file log.txt

In the terminal, run "node liri.js" plus the desired arguments

Arguments --

1: my-tweets

    Displays the 20 most recent tweets from the associated twitter account
    
2: spotify-this-song <song title here>
  
    Displays the song title, artist, album, and html link information of the desired song.
    If no song title is provided it will return "The Sign", by Ace of Base.
    
3: movie-this <movie title here>
  
    Displays the following information for the desired movie: title, year, rating, Rotten Tomatoes score, country, language, and plot.
    If no movie title is provided it will return "Mr Nobody"
    
4: do-what-it-says

    Reads text from the random.txt file and runs one of the previous arguments as found in the txt file.
