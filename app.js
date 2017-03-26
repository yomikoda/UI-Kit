var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use('/js', express.static('assets/js'));
app.use('/css', express.static('assets/css'));
app.use('/img', express.static('assets/img'));
app.use('/fonts', express.static('assets/fonts'));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
