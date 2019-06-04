/**
 * ptuXXX.js
 * ptuYYY.js
 */
const dbTransCmd = require('../base/dbTransCmd');

class ptuXXX extends dbTransCmd {
    constructor(pool) {
        super(pool);

    }
    release() {

        super.release();
    }

    async onQuery(conn) {

        return {};
    }
}

class ptuYYY extends dbTransCmd {
    constructor(pool) {
        super(pool);
    }

    release() {

        super.release();
    }

    async onQuery(conn) {

        return {};
    }
}

module.exports = {
    ptuXXX,
    ptuYYY
};