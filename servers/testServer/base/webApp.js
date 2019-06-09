/*
*	webApp.js
*	express의 시작점
*   웹서버와 관련된 셋팅은 모두 여기서
*/
const express = require('express');
const asyncify = require('express-asyncify');
const compression = require('compression');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const uuid = require('node-uuid')
const morgan = require('morgan');
const dispatcher = require('./testDispatcher');
const webApp = asyncify(express()); // aysnc/await 지원 할 수 있도록 설정

// morgan token setting
morgan.token('pid', function getPid() { return process.pid; });
morgan.token('id', function getId(req) { return req.id });
morgan.token('ip', function getIp(req) { return req.cip; });

function setGuid(req, res, next) {
    req.id = uuid.v4();
    next();
};

function setIPv4(req, res, next) {
    req.cip = req.ip.replace(/::ffff:/g, '');   // or 다른방식
    if (undefined === req.cip) req.cip = '0.0.0.0';
    next();
};

webApp.use(compression());
webApp.use(bodyParser.json());
webApp.use(bodyParser.urlencoded({ extended: true }));
webApp.use(bodyParser.text());
webApp.use(setGuid);
webApp.use(setIPv4);
webApp.use(morgan('ip::ip,guid::id,pid::pid,status::status,ms::response-time', { stream: _logger.stream }));

webApp.set('port', process.env.PORT || 10230);

if (webApp.get('env') === 'development') {
    webApp.use(errorHandler({ dumpExceptions: true, showStack: true }));
} else {
    webApp.use(errorHandler());
}

// healthcheck
webApp.get('/', function (req, res) { res.end('OK'); });
webApp.get('/healthcheck', function (req, res) { res.end('OK'); });

// dispatcher
webApp.post('/pt', dispatcher);
webApp.get('/pt?', dispatcher);

module.exports = webApp;