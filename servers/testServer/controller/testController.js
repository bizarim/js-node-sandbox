/**
 * testController
 * controller 사용법
 */

const CController = require('./base/CController');

exports.execute = async function (res, body) {
    const process = new testController();
    await process.execute(res, body);
}

class testController extends CController {
    constructor() { super(); }
    static init() {
        this.func = {};
        this.func[_protocol["test"]["P_TEST_DO"]] = testController.prototype.do;
    }

    async execute(res, body) {
        var ret = { cmd: body.cmd, errno: 0, info: {} };                     // 클라로 응답할 json
        var ci = { sKey: body.sKey, accIdx: body.accIdx, dbIdx: body.bIdx }; // 주요정보
        (undefined === testController.func[body.cmd]) ? res.end("protocol not found") : await testController.func[body.cmd].apply(this, [ci, JSON.parse(body.info), ret, res]);
    }

    async do(ci, bi, ret, res) {
        var logs = [];
        // response 전송
        this.sendResponse(res, ret);

        // 통계용 로그
        await this.userActRecord(res.req.id, logs);
    }


}

// 최초 초기화
testController.init();