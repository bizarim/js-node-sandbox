const cTest = require('./controller/testController');
const dispatcher = require('../../common/server/dispatcher');

class testDispatcher extends dispatcher {
    constructor() {
        super();
    }

    init() {
        this.func = [
            cTest
        ];
    }
}

const process = new testDispatcher();

var dispatch = async function (req, res) {
    await process.dispatch(req, res);
}

module.exports = dispatch;


