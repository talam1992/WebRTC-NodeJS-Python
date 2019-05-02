var express = require('express');
var app = express();
console.log('server started on port ');

app.get('/', function(req, res){
	res.render('index.ejs');
});

app.listen(3000);
