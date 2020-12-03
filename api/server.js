var express = require('express');
var app = express();

app.get('/:name', function(req, res) {
    res.send();
});

app.listen(3009, () => {
    console.log('App server started!');
});