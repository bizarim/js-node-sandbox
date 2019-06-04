/*
*	redis clinet.js
*   레디스 클라이언트
*/
const Promise = require('bluebird');
const redis = Promise.promisifyAll(require('redis'));

module.exports = {

    initialize : function(ip, port) {
        this._ip = ip;
        this._port = port;
        this.clinet = redis.createClient(port, ip);

        this.clinet.on('error', function(err) {
            console.log('Something went wrong ', err);
        });

        // todo 
        // pub/sub
    },

    getClient : function() {
        if (this.clinet === undefined) {
            this.initialize(this._port, this._ip);
        }
        return this.clinet;
    },

};

