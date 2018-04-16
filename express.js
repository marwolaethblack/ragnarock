const express = require('express');
const compression = require('compression');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser')
const Sequelize = require('sequelize');



const app = express();
app.use(compression());
app.set('port', 3110);
app.use(bodyParser.json());

app.use(express.static(__dirname + "/build")); //serves css files


const sequelize = new Sequelize('mainDB', null, null, {
    dialect: "sqlite",
    storage: './db.sqlite',
});


sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

let Song = sequelize.define("Song", {
    song: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    bandName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    members: {
        type: Sequelize.STRING
    }
})


app.post('/api/songs', function(req,res) {
    const body = req.body;
    Song.create({...body})
        .then(createdSong => {
            res.json(createdSong);
        })
        .catch(e => {
            res.json(e);
        })
});

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));

});

sequelize.sync().then(function() {
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});


