const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (event, level, message) => {
     const dateTime = `${format(new Date(), 'yyyy-MM-dd\HH:mm:ss')}`;

     const logEvent= `${dateTime}\ t${level}\ t${event}\ t${message}\ t${uuid()}`
     console.log(logEvent);
    }

    module.exports = logEvents;