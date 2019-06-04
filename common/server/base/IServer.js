/**
 * server 인터페이스
 */

class IServer {
    constructor() { }
    async loadConfig(path) { return true; }
    async loadData() { return true; }
    async start(path) { }
}

module.exports = IServer;