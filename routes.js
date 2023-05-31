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

function weatherPage(path, res) {
    if(DEBUG) console.log(`weather.html page was requested`);
    displayFile(path, res);
}

function statsPage(path, res) {
    if(DEBUG) console.log(`stats.html page was requested`);
    displayFile(path, res);
}       

function petsPage(path, res) {  
    if(DEBUG) console.log(`pets.html page was requested`);
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
    contactPage,
    FourOhFourPage,
    weatherPage,
    statsPage,
    petsPage
};