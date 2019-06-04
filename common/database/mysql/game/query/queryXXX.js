/*
*	queryXXX.js
*   
*/
const dbQuery = require('../../base/dbQuery');

class userInfoQuery extends dbQuery {
    constructor() {
        super();
    }

    // 
    async getTest(connection, accIdx) {
        const query = `SELECT connection
                       FROM test 
                       WHERE accIdx = ?;`;
        const [rows] = await connection.query(query, [accIdx]);
        return _util.objectCopy(rows);
    }

};

module.exports = userInfoQuery;