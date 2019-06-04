/*
*	IController.js
*	controller 인터페이스
*/
const IController = require('../../../../common/server/IController');

class CController extends IController {
    constructor() { super(); }
    // 세션키 검증
    async isValidSKey(accIdx, sKey) { return undefined; }
    // 유저 행동 로깅
    async userActRecord(guid, logs) { }
    // sendresponse
    sendResponse(res, ret) {
        if (!res || !ret) return;
        ret = JSON.stringify(ret);
        res.end(ret);
    }
}

module.exports = CController;