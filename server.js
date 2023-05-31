    // *********************************
    // Filename: server.js
    // Author: Jonah Greening
    // Purpose: server code for the website
    // Date: 05-28-23
    // Date revised:
    // **********************************

// Enable debug mode
global.DEBUG = true;

// Import required modules
const http = require('http');
const fs = require('fs');
const routes = require('./routes');
const logEvents = require('./logEvents.js');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// Log events handler
myEmitter.on('log', (event, level, message) => logEvents(event, level, message));

// Weather module setup
const weather = require('openweather-apis');
weather.setLang('en');
weather.setCoordinate(47.5649, -52.7093);
weather.setUnits('metric');
weather.setAPPID('828cbb8bc80073c999d9e5d57db67b62');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Logging and initialization
  if (DEBUG) console.log(req.url, req.method);
  let path = './views/';
  let statusCode = 200;

  // Route handling
  switch (req.url) {
    case '/':
      myEmitter.emit('log', req.url, 'INFO', 'Root of the website was requested');
      path += 'index.html';
      res.statusCode = 200;
      routes.indexPage(path, res);
      break;
    case '/contact':
      myEmitter.emit('log', req.url, 'INFO', 'Contact page was requested');
      path += '/contact.html';
      res.statusCode = 200;
      routes.contactPage(path, res);
      break;
    case '/weather':
      myEmitter.emit('log', req.url, 'INFO', 'Weather page was requested');
      path += '/weather.html';
      res.statusCode = 200;

      // Function to fetch weather data and send the response
      const fetchWeatherData = () => {
        // Get weather information using openweather-apis
        weather.getTemperature((err, temperature) => {
          if (err) {
            console.log(err);
            temperature = 'N/A';
          }

          weather.getHumidity((err, humidity) => {
            if (err) {
              console.log(err);
              humidity = 'N/A';
            }

            weather.getDescription((err, description) => {
              if (err) {
                console.log(err);
                description = 'N/A';
              }

              // Read the HTML file
              fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                  console.log(err);
                  res.writeHead(404, { 'Content-Type': 'text/html' });
                  res.end('404 Not Found');
                } else {
                  // Replace placeholders in the HTML with weather values
                  data = data.replace('{{temperature}}', temperature);
                  data = data.replace('{{humidity}}', humidity);
                  data = data.replace('{{description}}', description);

                  // Send the modified HTML as the response
                  res.writeHead(statusCode, { 'Content-Type': 'text/html' });
                  res.write(data);
                  res.end();
                }
              });
            });
          });
        });
      };

      // Fetch weather data immediately and schedule fetching every day at 00:00 AM
      fetchWeatherData();
      cron.schedule('0 0 * * *', fetchWeatherData);

      break;
    case '/stats':
      myEmitter.emit('log', req.url, 'INFO', 'Stats page was requested');
      path += '/stats.html';
      res.statusCode = 200;

      // Fetch stock data and news data simultaneously using Promise.all()
      Promise.all([
        stockdata.stocks({
          API_TOKEN: '28779ded9a8f963e4c943123dd336b93',
          options: {
            limit: 3,
            symbols: ['AAPL', 'GOOGL', 'MSFT']
          }
        }),
        newsapi.v2.topHeadlines({
          q: 'tech',
          category: '',
          language: 'en',
          country: '',
        })
      ])
        .then(([stockResponse, newsResponse]) => {
          const stocks = stockResponse.data;
          const articles = newsResponse.articles;
          let newsHTML = '';

          // Generate HTML for each news article
          articles.forEach((article) => {
            const { title, description, url } = article;
            newsHTML += `
              <div class="news-article">
                <h4>${title}</h4>
                <p>${description}</p>
                <a href="${url}" target="_blank">Read More</a>
              </div>
            `;
          });

          // Read the HTML file
          fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
              console.log(err);
              res.writeHead(404, { 'Content-Type': 'text/html' });
              res.end('404 Not Found');
            } else {
              // Replace placeholders in the HTML with stock and news data
              data = data.replace('{{stockApple}}', stocks[2].symbol);
              data = data.replace('{{stockApplePriceHigh}}', stocks[2].high);
              data = data.replace('{{stockApplePriceLow}}', stocks[2].low);
              data = data.replace('{{stockGoogle}}', stocks[0].symbol);
              data = data.replace('{{stockGooglePriceHigh}}', stocks[0].high);
              data = data.replace('{{stockGooglePriceLow}}', stocks[0].low);
              data = data.replace('{{stockMicrosoft}}', stocks[1].symbol);
              data = data.replace('{{stockMicrosoftPriceHigh}}', stocks[1].high);
              data = data.replace('{{stockMicrosoftPriceLow}}', stocks[1].low);
              data = data.replace('{{news}}', newsHTML);

              // Send the modified HTML as the response
              res.writeHead(statusCode, { 'Content-Type': 'text/html' });
              res.write(data);
              res.end();
            }
          });
        })
        .catch((error) => {
          console.log(error);
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('Internal Server Error');
        });

      break;
    case '/pets':
      myEmitter.emit('log', req.url, 'INFO', 'Pets page was requested');
      res.statusCode = 200;

      // Request a random photo from the cat and dog APIs simultaneously
      Promise.all([
        fetch('https://api.thecatapi.com/v1/images/search').then(response => response.json()),
        fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json())
      ])
        .then(([catApiResponse, dogApiResponse]) => {
          const catImageUrl = catApiResponse[0].url;
          const dogImageUrl = dogApiResponse.message;

          // Read the HTML file
          fs.readFile('./views/pets.html', 'utf8', (err, data) => {
            if (err) {
              console.log(err);
              res.writeHead(404, { 'Content-Type': 'text/html' });
              res.end('404 Not Found');
            } else {
              // Create the img tags with the cat and dog image URLs
              const catImageTag = `<img src="${catImageUrl}" alt="Cat" onclick="loadRandomImage('cat')">`;
              const dogImageTag = `<img src="${dogImageUrl}" alt="Dog" onclick="loadRandomImage('dog')">`;

              // Replace the placeholders in the HTML with the cat and dog image tags
              data = data.replace('{{catImage}}', catImageTag);
              data = data.replace('{{dogImage}}', dogImageTag);

              // Send the modified HTML as the response
              res.writeHead(statusCode, { 'Content-Type': 'text/html' });
              res.write(data);
              res.end();
            }
          });
        })
        .catch((error) => {
          console.log(error);
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('Internal Server Error');
        });

      break;
    default:
      myEmitter.emit('log', req.url, 'ERROR', 'A missing page was requested');
      res.statusCode = 404;
      path += '/404.html';
      routes.FourOhFourPage(path, res);
      break;
  }
});

// Start the HTTP server
server.listen(3000, 'localhost', () => {
  console.log('Listening on port: 3000');
});