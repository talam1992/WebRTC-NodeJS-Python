fs = require('fs')
options = {
	key: fs.readFileSync('keys/key.key'),
	cert: fs.readFileSync('keys/cert.key')
}
var express = require('express.io');
var app = express();
app.https(options).io();
const PORT = 5000;
console.log('server started on port ' + PORT  + ' using HTTPS');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('index_https.ejs');
});

app.listen(process.env.PORT || PORT);

app.io.route('signl', function (req) {
    req.io.join(req.data);
    app.io.room(req.data).broadcast('signl', {
        usrty: req.data.usrty,
        usrnme: req.data.usrnme,
        usrdata: req.data.usrdata,
        commnd: req.data.commnd
    })
})