/*
*	mainQuery.js
*   main db query 관리 및 결과
*/
const dbQuery = require('../base/dbQuery');

class mainQuery extends dbQuery {

    constructor() {
        super();
    }

    async getShardConf(connection) {
        const query = `SELECT dbIdx,
                              dbGameConnStr 
                        FROM configShardDB`;
        const [rows] = await connection.query(query);
        return _util.objectCopy(rows);
    }

};

module.exports = mainQuery;