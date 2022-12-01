import log4js from 'log4js';
import { config } from './config';

log4js.configure({
    appenders: {
        console: {type: 'console'},
        errorFile: { type: 'file', filename: './error.log'},
        //
        loggerConsole: { type: 'logLevelFilter', appender: 'console', level: 'info'},
        loggerConsoleDebug : {type: 'logLevelFilter', appender: 'console', level: 'debug'},
        loggerError: { type: 'logLevelFilter', appender: 'errorFile', level: 'error'},
    },
    categories: {
        default: {
            appenders: ['loggerConsoleDebug'],
            level: 'all'
        },
        production: {
            appenders: ['loggerConsole','loggerError'],
            level: 'all'
        }
    }
});

let logger:log4js.Logger;

if (config.server.environment == 'production') {
    logger = log4js.getLogger('production')
} else {
    logger = log4js.getLogger()
}

export {logger}
