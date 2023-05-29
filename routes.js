    // *********************************
    // Filename: routes.js
    // Author: Jonah Greening
    // Purpose: routes code for the website
    // Date: 05-28-23
    // Date revised:
    // **********************************

const fs = require('fs');

function indexPage(path, res) {
    if(DEBUG) console.log(`index.html page was requested`);
    displayFile(path, res);
}

function contactPage(path, res) {    
    if(DEBUG) console.log(`contact.html page was requested`);
    displayFile(path, res);
}

function FourOhFourPage(path, res) {
    if(DEBUG) console.log(`404.html page was requested`);
    displayFile(path, res);
}

function birdsPage(path, res) {
    if(DEBUG) console.log(`birds.html page was requested`);
    displayFile(path, res);
}

function catsPage(path, res) {
    if(DEBUG) console.log(`cats.html page was requested`);
    displayFile(path, res);
}

function dogsPage(path, res) {    
    if(DEBUG) console.log(`dogs.html page was requested`);
    displayFile(path, res);
}

function hamstersPage(path, res) {    
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