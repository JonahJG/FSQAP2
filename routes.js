const fs = require('fs');

function indexPage(req, res) {
    if(DEBUG) console.log(`index.html page was requested`);
    displayFile(path, res);
}

function aboutPage(req, res) {
    if(DEBUG) console.log(`about.html page was requested`);
    displayFile(path, res);
}

function contactPage(req, res) {    
    if(DEBUG) console.log(`contact.html page was requested`);
    displayFile(path, res);
}

function FourOhFourPage(req, res) {
    if(DEBUG) console.log(`404.html page was requested`);
    displayFile(path, res);
}

function birdsPage(req, res) {
    if(DEBUG) console.log(`birds.html page was requested`);
    displayFile(path, res);
}

function catsPage(req, res) {
    if(DEBUG) console.log(`cats.html page was requested`);
    displayFile(path, res);
}

function dogsPage(req, res) {    
    if(DEBUG) console.log(`dogs.html page was requested`);
    displayFile(path, res);
}

function hamstersPage(req, res) {    
    if(DEBUG) console.log(`hamsters.html page was requested`);
    displayFile(path, res);
}     

function displayFile(path, res) {
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            if(DEBUG) console.log(`File read successfully`);
            res.writeHead(res.statusCode, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
}

module.exports = {  
    indexPage,  
    aboutPage,
    contactPage,
    FourOhFourPage,
    birdsPage,
    catsPage,
    dogsPage,
    hamstersPage    
}