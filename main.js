var express = require('express')
const fs = require('fs');
const path = require('path');

const session = require('express-session');
var serveStatic = require('serve-static');
const uuid = require('uuid'); 
var app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var passport       = require("passport");
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const expressSession = require('express-socket.io-session');
app.use(express.json({ limit: '1000mb' }));
app.use(express.static('public'));app.use(express.urlencoded({ extended: true }));

//mine

const searchVariations = require('./nodejs/search');


//


io.on('connection', (socket) => {
	 function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Handle 'get:Grenades'
    socket.on('get:Grenades', () => {
        const results = searchVariations('Grenades');
        const randomItem = getRandomItem(results);
        socket.emit('response:Grenades', randomItem);
    });

    // Handle 'get:Primary'
    socket.on('get:Primary', () => {
        const results = searchVariations('Primary');
        const randomItem = getRandomItem(results);
        socket.emit('response:Primary', randomItem);
    });

    // Handle 'get:Sidearms'
    socket.on('get:Sidearms', () => {
        const results = searchVariations('Sidearms');
        const randomItem = getRandomItem(results);
        socket.emit('response:Sidearms', randomItem);
    });

    // Handle 'get:Stratagems'
    socket.on('get:Stratagems', () => {
        const results = searchVariations('Stratagems');
        const randomItem = getRandomItem(results);
        socket.emit('response:Stratagems', randomItem);
    });
});

var htmlPath = path.join(__dirname, 'public');console.log(htmlPath);
app.use(serveStatic(htmlPath));

server.listen();

// Load the JSON data

