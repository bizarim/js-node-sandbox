/**
 * webAppSvr.js
 * was 시작
 */
const IServer = require('../../common/server/base/IServer');
const gbLoader = require('./globalLoader');

class webAppSvr extends IServer {
    constructor() {
        super();
        this.config = undefined;
    }

    async start() {
        function onListen(port) {
            const app = require('./webApp');
            const server = app.listen(port, function () {
                console.log('Express server listening on port ' + server.address().port);
                onException();
            });
        }

        function onException() {

            // todo
            console.log(' on uncaughtException');
            process.on('uncaughtException', function (err) {
                // todo redis pub =>
                console.log('pub uncaughtException');
            });

            console.log(' on unhandledRejection');
            process.on('unhandledRejection', (reason, p) => {
                // todo redis pub =>
                console.log('pub unhandledRejection');
            });

        }

        function setZone(config) {
            if (config.zone === 'real') {
                process.env.NODE_ENV = 'production';
            } else {
                process.env.NODE_ENV = 'development';
            }
            console.log('setZone: ' + config.zone);
        }

        if (undefined == this.config) {
            console.log('load config failed');
            return;
        }

        if (false == await this.loadData()) {
            console.log('load data failed');
            return;
        }

        setZone(this.config);
        onListen(this.config.port);
    }

    async loadConfig(path) {
        const fs = require('fs');
        if (!fs.existsSync(path)) {
            throw Error('none exist config file: ' + path);
        }
        this.config = JSON.parse(fs.readFileSync(path, 'utf8'));
    }

    async loadData() {
        const gb = new gbLoader();
        await gb.load(this.config);
    }
}

module.exports = new webAppSvr();