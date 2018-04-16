const express = require('express');
const compression = require('compression');
const path = require('path');


const app = express();
app.use(compression());
app.set('port', 3110);

app.use(express.static(__dirname + "/build")); //serves css files



app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));

});

app.listen(app.get('port'), function() {
    console.log(`Server is listening on localhost:${app.get('port')}`);
});


