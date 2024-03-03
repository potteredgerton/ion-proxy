var express = require('express')
var alloy = require('alloyproxy')
var app = express()
var http = require('http')
var fs = require('fs')
var path = require('path')

const config = JSON.parse(fs.readFileSync('./config.json', {
    encoding: 'utf8'
}));

const server = http.createServer(app);

//Local Alloy Proxy

const localprox = new alloy({
    prefix: '/go/',
    error: (proxy) => {
        return proxy.res.send("error");
    },
    request: [
      
    ],
    response: [],
    injection: true
});

app.use(localprox.app);

localprox.ws(server);

//Cloudflare Attack Mode Fix

app.post('/', async (req, res) => {
    switch (req.url) {
        case '/':
            return res.send(fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8'));
    }
});

//Querystring Navigation
app.get('/', async (req, res) => {

    switch (req.url) {
        case '/':
            return res.send(fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8'));
    }

    switch (req.url) {
        case '/?a':
            return res.send(fs.readFileSync(path.join(__dirname, 'public', 'error.html'), 'utf8'));
    }

});

app.use(express.static(path.join(__dirname, 'public')));

server.listen(process.env.PORT || config.port);