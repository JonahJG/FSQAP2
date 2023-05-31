    // *********************************
    // Filename: routes.js
    // Author: Jonah Greening
    // Purpose: routes code for the website
    // Date: 05-28-23
    // Date revised:
    // **********************************

    // Import required modules - filesystem
    const fs = require('fs');

    // Function to handle serving the index.html page
    function indexPage(path, res) {
        if(DEBUG) console.log(`index.html page was requested`);
        displayFile(path, res);
    }
    
    // Function to handle serving the contact.html page
    function contactPage(path, res) {    
        if(DEBUG) console.log(`contact.html page was requested`);
        displayFile(path, res);
    }
    
    // Function to handle serving the 404.html page
    function FourOhFourPage(path, res) {
        if(DEBUG) console.log(`404.html page was requested`);
        displayFile(path, res);
    }
    
    // Function to handle serving the weather.html page
    function weatherPage(path, res) {
        if(DEBUG) console.log(`weather.html page was requested`);
        displayFile(path, res);
    }
    
    // Function to handle serving the stats.html page
    function statsPage(path, res) {
        if(DEBUG) console.log(`stats.html page was requested`);
        displayFile(path, res);
    }       
    
    // Function to handle serving the pets.html page
    function petsPage(path, res) {  
        if(DEBUG) console.log(`pets.html page was requested`);
        displayFile(path, res);
    }   
    
    // Function to read and display a file
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
    
    // Exporting the functions as an object to be used in other modules
    module.exports = {  
        indexPage,  
        contactPage,
        FourOhFourPage,
        weatherPage,
        statsPage,
        petsPage
    };
    