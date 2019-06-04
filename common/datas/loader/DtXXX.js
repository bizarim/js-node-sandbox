/**
 * DtAutoReelSetCond.js
 * 오토 릴셋 조건 로더
 */

const IDtLoader = require('./base/IDtLoader');
class DtXXX extends IDtLoader {
    constructor(path) {
        super();
        this.datas = {};
        this.path = path;
    }

    async loadData() {
        var dt = require(`${this.path}/DtXXX.json`);
        this.datas = {};
        //this.datas = _util.objectCopy(dt.xxx);
        super.setLoad(true);
    }

    // 슬롯머신 데이터가져오기
    getData() {
        return this.datas;
    }
}

module.exports = DtXXX;