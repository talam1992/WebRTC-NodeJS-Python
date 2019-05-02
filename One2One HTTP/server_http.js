const express = require('express.io');
const app = express();
app.http().io();
const PORT = 4000;
console.log('server started on port ' + PORT + ' using HTTP');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('index_http.ejs');
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