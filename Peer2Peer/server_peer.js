var express = require('express.io');
var app = express();
app.http().io();
var PORT = 3000;
console.log('server started on port ' + PORT);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('p2p.ejs');
});

app.io.route('rdy', function(req) {
	req.io.join(req.data.chtrm);
	req.io.join(req.data.signlrm);
	app.io.room(req.data).broadcast('announce', {
		msg: 'New client in the ' + req.data + ' room.'
	})
})

app.io.route('snd', function(req) {
    app.io.room(req.data.rm).broadcast('msg', {
        msg: req.data.msg,
		author: req.data.author
    });
})

app.io.route('signl', function(req) {
	req.io.room(req.data.rm).broadcast('signlngmsg', {
        type: req.data.type,
		msg: req.data.msg
    });
})

app.listen(PORT);