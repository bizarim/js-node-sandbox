/**
 * protocol dispatcher
 * 프로토콜과 컨트롤러 연결해주는 dispatcher
 */
const cTest = require('../controller/testController');
const dispatcher = require('../../common/server/dispatcher');

class testDispatcher extends dispatcher {
    constructor() {
        super();
    }

    init() {
        this.func = [
            // controller 추가
            cTest   // 0 번
        ];
    }
}

const process = new testDispatcher();

var dispatch = async function (req, res) {
    await process.dispatch(req, res);
}

module.exports = dispatch;


