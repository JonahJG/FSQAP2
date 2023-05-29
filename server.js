    // *********************************
    // Filename: server.js
    // Author: Jonah Greening
    // Purpose: server code for the website
    // Date: 05-28-23
    // Date revised:
    // **********************************

const http = require('http');
const routes = require('./routes.js');
global.STYLE = '<link rel="stylesheet" href="./views/styles/style.css">'
global.DEBUG = true;
const logEvents = require('./logEvents.js');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();
myEmitter.on('log', (event, level, message) => logEvents(event, level, message));

const server = http.createServer((req, res) => {
    if(DEBUG) console.log(req.url, req.method);
    let path = './views/';
    switch(req.url) {
        case '/':
            myEmitter.emit('log', req.url, 'INFO', 'root of the website was requested')
            path += 'index.html';
            res.statusCode = 200;
            routes.indexPage(path, res);
            break;
        case '/contact':
            myEmitter.emit('log', req.url, 'INFO', 'contact page was requested')
            res.statusCode = 200;
            path += 'contact.html';
            routes.contactPage(path, res);
            break;
        case '/subscribe':
            myEmitter.emit('log', req.url, 'INFO', 'subscribe page was requested')
            res.statusCode = 200; 
            path += 'subscribe.html';  
            routes.subscribePage(path, res);
            break;
        case '/dogs':
            myEmitter.emit('log', req.url, 'INFO', 'dogs page was requested')
            res.statusCode = 200;
            path += 'dogs.html';
            routes.dogsPage(path, res);
            break;
        case '/cats':
            myEmitter.emit('log', req.url, 'INFO', 'cats page was requested')
            res.statusCode = 200;
            path += 'cats.html';
            routes.catsPage(path, res);
            break;
        case '/birds':
            myEmitter.emit('log', req.url, 'INFO', 'birds page was requested')
            res.statusCode = 200;
            path += 'birds.html';
            routes.birdsPage(path, res);
            break;
        case '/hamsters':
            myEmitter.emit('log', req.url, 'INFO', 'hamsters page was requested')
            res.statusCode = 200;
            path += 'hamsters.html';
            routes.hamstersPage(path, res);
            break;
        case 'styles/style.css':
            myEmitter.emit('log', req.url, 'INFO', 'style.css page was requested')
            res.statusCode = 200;
            routes.stylePage(res);
            break;

        default:
            myEmitter.emit('log', req.url, 'ERROR', 'a missing page was requested')
            res.statusCode = 404;
            path += '404.html';
            routes.FourOhFourPage(path, res);
            break;
    }});

    server.listen(3000, 'localhost', () => {
        console.log('Listening on port: 3000');
    });
