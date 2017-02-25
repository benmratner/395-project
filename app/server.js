'use strict';
var path = require('path')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')

app.use(express.static('dist'))
app.use(bodyParser.json({ limit: '50mb', extended: true }))


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/music', function(req, res) {
    const filename = req.body.filename
    const binData = req.body.data_uri

    // var buf = new Buffer(req.body.data_uri.replace(/^data:\/\w+;base64,/, ""),'base64');    
    var ws = fs.createWriteStream(filename, {
        defaultEncoding: 'binary'
    })

    ws.write(binData);


    const
        spawn = require('child_process').spawn,
        cmd = spawn('/Users/benmratner/Dev/essentia-stuff/extractors/streaming/essentia_streaming_extractor_music', [filename, 'output.json']);

    cmd.stdout.on('data', data => {
        console.log(`stdout: ${data}`);
    });

    cmd.stderr.on('data', data => {
        console.log(`stderr: ${data}`);
    });

    cmd.on('close', code => {
        console.log(`child process exited with code ${code}`);
        fs.readFile('output.json', 'utf8', function(err, data) {
            if (err){
                console.log(err)
            }

            var obj = JSON.parse(data)
            res.send({
                beats: obj.rhythm.beats_position,
                key: obj.tonal.key_key,
                scale: obj.tonal.key_scale
            })
        });
    });
})

app.listen(3000)
console.log('Listening on port 3000')
