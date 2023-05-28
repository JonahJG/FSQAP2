const http = require('http');
global.DEBUG = true;

const server = http.createServer((req, res) => {
    if(DEBUG) console.log(req.url, req.method);
    switch(req.url) {
        case '/':
            res.statusCode = 200;
            res.end(`/ route was requested`)
            break;
        case '/about':
            res.statusCode = 200;
            res.end(`/about route was requested`)
            break;
        case '/contact':
            res.statusCode = 200;
            res.end(`/contact route was requested`)
            break;
        case '/subscribe':
            res.statusCode = 200; 
            res.end(`/subscribe route was requested`)  
            break;
        case '/dogs':
            res.statusCode = 200;
            res.end(`/dogs route was requested`)
            break;
        case '/cats':
            res.statusCode = 200;
            res.end(`/cats route was requested`)
            break;
        case '/birds':
            res.statusCode = 200;
            res.end(`/birds route was requested`)
            break;
        case '/hamsters':
            res.statusCode = 200;
            res.end(`/hamsters route was requested`)
            break;
        default:
            res.statusCode = 404;
            res.end(`404: page not found`)
    }});

    server.listen(3000, 'localhost', () => {
        console.log('Listening on port: 3000');
    });
