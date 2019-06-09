/*
*	testServer.js
*   was 시작 진입점
*/

(async (path = './config.json') => {
    try {
        const was = require('./webAppSvr');
        await was.loadConfig(path);
        await was.start();
    }
    catch (ex) {
        console.log('ex: ' + ex.message);
        console.log('ex: ' + ex.stack);
        process.exit(0);
    }
})();