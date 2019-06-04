/*
*	uspXXX.js
*   
*/
const dbTransUsp = require('../base/dbTransUsp');
const queryXXX = require('./query/queryXXX');


class uspXXX extends dbTransUsp {
    constructor(pool) {
        super(pool);
        this.query = new queryXXX();
    }

    initParam(accIdx) {
        this.accIdx = accIdx;
    }

    release() {
        this.accIdx = undefined;
        this.query = undefined;

        super.release();
    }

    async onQuery(conn) {
        const result = await this.query.getTest(conn, this.accIdx);
        return result;
    }

    onResult(result) {
        this.setLogs(result);
        return result;
    }

    setLogs(result) {

    }
}

module.exports = uspXXX;