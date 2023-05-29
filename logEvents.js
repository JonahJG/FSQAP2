const { format, getYear } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

    // *********************************
    // Filename: logEvents.js
    // Author: Jonah Greening
    // Purpose: log events code for the website
    // Date: 05-28-23
    // Date revised:
    // **********************************

const logEvents = async (event, level, message) => {
  const dateTime = `${format(new Date(), 'yyyy-MM-dd\HH:mm:ss')}`;

  const logEvent = `${dateTime}\t${level}\t${event}\t${message}\t${uuid()}`;
  console.log(logEvent);

  try {
    const currFolder = 'logs/' + getYear(new Date());
    if (!fs.existsSync(path.join(__dirname, currFolder))) {
      console.log(`Creating folder: ${currFolder}`);
      await fsPromises.mkdir(path.join(__dirname, currFolder), { recursive: true });
    }

    const fileName = `${format(new Date(), 'yyyy-MM-dd')}_http_events.log`;
    await fsPromises.appendFile(path.join(__dirname, currFolder, fileName), logEvent + '\n');
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;
