/*
*	logger.js
*	파일 로깅 wiht winston
*   ref=> https://github.com/winstonjs/winston
*/
const winston = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
// 로컬 아이피 남길려고 만듬
const os = require('os')
const ifaces = os.networkInterfaces();
var numCPUs = os.cpus().length;
//var logMaxSize = 20480000; //(numCPUs * 1024 * 1000 * 10).toFixed();     // 용량 제한 102400 => 100 kb, 102400000 => 100mb, 10240000 => 10mb
var logMaxSize = (2048 / numCPUs).toFixed() * 1000 * 100;     // 용량 제한 102400 => 100 kb, 102400000 => 100mb, 10240000 => 10mb

exports.createLogger = function (config) {

    const logDir = config.logPath;
    const name = config.name;
    var address;

    for (var dev in ifaces) {
        var iface = ifaces[dev].filter(function (details) {
            return details.family === 'IPv4' && details.internal === false;
        });
        if (iface.length > 0) address = iface[0].address;
    }

    // create log directory
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    // logger
    const logger = winston.createLogger({
        // level: 'debug',
        format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            winston.format.printf(info => `${info.timestamp} [${address}] [${info.level.toUpperCase()}] - ${info.message}`)
        ),
        // logger setting
        transports: [
            // console setting
            new winston.transports.Console({ level: 'error' }),
            new winston.transports.DailyRotateFile({
                level: 'debug',      // 로그 레벨 지정
                filename: `${logDir}/log/${name}_%DATE%.log`,
                datePattern: 'YYYY-MM-DD',
                maxSize: logMaxSize,
            })
        ],
        // uncaughtException 발생시 처리
        exceptionHandlers: [
            new winston.transports.Console(),
            new winston.transports.DailyRotateFile({
                level: 'debug',
                filename: `${logDir}/exception/ex_${name}_%DATE%.log`,
                datePattern: 'YYYY-MM-DD',  // 시간 별로 파일을 다르게 남길지 고민해 보자.
                maxSize: logMaxSize,
            })
        ]
    });

    // express morgan 용
    logger.stream = {
        write: function (message) {
            logger.info(message.substring(0, message.lastIndexOf('\n')));
        }
    };
    // console.log(numCPUs);
    // console.log(logMaxSize);
    logger.info('pid: ' + process.pid + ' numCPUs: ' + numCPUs);
    logger.info('pid: ' + process.pid + ' logMaxSize: ' + logMaxSize);
    
    return logger;
}