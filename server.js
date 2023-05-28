const http = require('http');
const routes = require('./routes.js');
const { ro } = require('date-fns/locale');
global.DEBUG = true;

const server = http.createServer((req, res) => {
    if(DEBUG) console.log(req.url, req.method);
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            routes.indexPage(path, res);
            break;
        case '/about':
            res.statusCode = 200;
            path =+ 'about.html';
            routes.aboutPage(path, res);
            break;
        case '/contact':
            res.statusCode = 200;
            path += 'contact.html';
            routes.contactPage(path, res);
            break;
        case '/subscribe':
            res.statusCode = 200; 
            path += 'subscribe.html';  
            routes.subscribePage(path, res);
            break;
        case '/dogs':
            res.statusCode = 200;
            path += 'dogs.html';
            routes.dogsPage(path, res);
            break;
        case '/cats':
            res.statusCode = 200;
            path += 'cats.html';
            routes.catsPage(path, res);
            break;
        case '/birds':
            res.statusCode = 200;
            path += 'birds.html';
            routes.birdsPage(path, res);
            break;
        case '/hamsters':
            res.statusCode = 200;
            path += 'hamsters.html';
            routes.hamstersPage(path, res);
            break;
        default:
            res.statusCode = 404;
            path += '404.html';
            routes.FourOhFourPage(path, res);
            break;
    }});

    server.listen(3000, 'localhost', () => {
        console.log('Listening on port: 3000');
    });
