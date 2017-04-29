'use strict';
var path = require('path')
var express = require('express')
var app = express()
var http = require('http').createServer(app)
var axios = require('axios')
var bodyParser = require('body-parser')
var fs = require('fs')
var socket = require('socket.io');
var firebase = require('./config/firebase.js');
var id = require('./config/id.js');

app.use(express.static('dist'))
app.use(bodyParser.json({ limit: '50mb', extended: true }))

http.listen(3000)
console.log('Listening on port 3000')


var io = socket(http)


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/music', function(req, res) {
    console.log("music upload")
    const filename = req.body.filename
    const binData = req.body.data_uri

    // var buf = new Buffer(req.body.data_uri.replace(/^data:\/\w+;base64,/, ""),'base64');    
    var ws = fs.createWriteStream(filename, {
        defaultEncoding: 'binary'
    })

    ws.write(binData);

    io.in(filename).emit('status', 'analyze')

    const
        spawn = require('child_process').spawn,
        cmd = spawn('/Users/benmratner/Dev/harmonizr/extractors/streaming/essentia_streaming_extractor_music', [filename, 'output.json']);

    cmd.stdout.on('data', data => {
        console.log(`stdout: ${data}`);
    });

    cmd.stderr.on('data', data => {
        console.log(`stderr: ${data}`);
    });

    cmd.on('close', code => {
        console.log(`child process exited with code ${code}`);
        io.in(filename).emit('status', 'parse')


        fs.readFile('output.json', 'utf8', function(err, data) {
            if (err) {
                console.log(err)
            }
            var obj = JSON.parse(data)

            var songData = {
                scale: obj.tonal.key_scale,
                dance: obj.rhythm.danceability,
                title: obj.metadata.tags.title[0],
                artist: obj.metadata.tags.artist[0],
                meta: obj.metadata,
            }
            io.in(filename).emit('status', 'save')


            console.log(obj.metadata.tags.artist[0])
            var sanitizedTitle = obj.metadata.tags.title[0].replace(/[\.\#\$\[\]]/g, '');
            searchTracks(songData)
            
            



            res.send(songData)
        });
    });
})

function searchTracks(songData){

    if (songData.artist){
        var q = `track:${songData.title} artist:${songData.artist}`;

    } else {
        var q = `track:${songData.title}`;
    }
    var songId = '';
    axios.get('https://api.spotify.com/v1/search', 
        {params: 
            { 
                q: q,
                type: 'track' 
            }
        }).then((data) => {
            if (data.data.tracks.items.length){
                return data.data.tracks.items[0];
            } else {
                return {};
            }
        }).then(song =>{
            if (song.id){
                songId = song.id;
                songData = Object.assign(songData, {
                    id: songId,
                    spotify: true
                })
                // io.in(filename).emit('status', 'finish')

            } else {
                songId = id.gen(32, id.chars)
                songData = Object.assign(songData, {
                    id: songId,
                    spotify: false
                })
            }
                firebase.database.ref('songs/' + songId).set(songData);

        }).catch(err=>{
            console.log(err)
        })

}

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('connected', true)

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('room', function(data) {
        console.log(data)
        socket.join(data.room);
    });

    socket.on('leave room', (data) => {
        socket.leave(data.room)
    })
});
