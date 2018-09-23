const log4js = require('log4js')

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[%d{yyyy-MM-dd hh:mm:ss.SSS} %c %p %] %m',
      },
    },
    log: { type: 'file', filename: 'latest.log' },
  },
  categories: {
    default: {
      appenders: ['out', 'log'],
      level: 'debug',
    },
  },
})

module.exports = log4js
