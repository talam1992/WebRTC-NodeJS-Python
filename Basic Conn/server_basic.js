var express = require('express');
var app = express();
var PORT = 2000;
console.log('server started on port ' + PORT);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('basic_conn.ejs');
});

app.listen(PORT);