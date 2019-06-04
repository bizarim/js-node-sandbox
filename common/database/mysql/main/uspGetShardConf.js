/*
*	uspGetShardConf.js
*   샤드 db 정보 얻어오기
*/

const dbUsp = require('../base/dbUsp');
const mainQuery = require('./mainQuery');

class uspGetShardConf extends dbUsp {
    constructor(pool){
        super(pool);
        this.query = new mainQuery();
    }

    initParam() {
    }

    release() {
        this.query = undefined;
        super.release();
    }

    async OnQuery(conn) {
        const rows = await this.query.getShardConf(conn, this.accIdx);
        if(rows.length < 1) throw(_errcode.DB_NONE_SHARD_GAMEDB);
        return rows;
    }
}

module.exports = uspGetShardConf;
