/*
*	IController.js
*	controller 인터페이스
*/

class IController {
    constructor() { }
    // 세션키 검증
    async isValidSKey(accIdx, sKey) { return undefined; }
    // 유저 행동 로깅
    async userActRecord(guid, logs) { }
    // sendresponse
    sendResponse(res, ret) { }
}

module.exports = IController;