/**
 * dbQuery.js
 * 쿼리 기본 기능
 *  - 열에서 행으로 변환 객체
 *  - 쿼리 실행 후 assert
 *  - 시간 얻어오기
 *  - 결과 가공
 */
const dbRowTransformer = require('../base/dbRowTransformer');

class dbQuery {
    constructor() {
        this.rowTransformer = new dbRowTransformer();
    }

    release() {
        this.rowTransformer = undefined;
    }

    // 시간 얻어오기
    async getNow(connection) {
        const query = 'SELECT NOW() AS now;';
        const [rows] = await connection.query(query);
        var now = new Date(rows[0].now);
        var date = {};
        date.now = now.toMysqlDateTime();
        now.setDate(now.getDate() + 1);
        date.tomarrow = now.toMysqlDate();
        return date;
    }
    // insert 쿼리 확인용
    assertInsert(rows) {
        if (false == this.checkAffectedRows(rows)) throw (_errcode.DB_ERROR_ISR);
    }
    // update 쿼리 확인용 ALL
    assertUpdate(rows) {
        if (false == this.checkAffectedRows(rows)) throw (_errcode.DB_ERROR_UP1);
        if (false == this.checkChangedRows(rows)) throw (_errcode.DB_ERROR_UP2);
    }
    // update 쿼리 확인용 WithOut Change
    assertUpdateWithOutChange(rows) {
        if (false == this.checkAffectedRows(rows)) throw (_errcode.DB_ERROR_UP1);
    }
    // row 대상 확인
    checkAffectedRows(rows) {
        if (undefined === rows.affectedRows) return false;
        if (null === rows.affectedRows) return false;
        if (rows.affectedRows < 1) return false;
        return true;
    }
    // row 변경 확인
    checkChangedRows(rows) {
        if (undefined === rows.changedRows) return false;
        if (null === rows.changedRows) return false;
        if (rows.changedRows < 1) return false;
        return true;
    }

    // DB에서 나오는 결과를 사용하기 쉽게 파싱
    async getResult(result) {
        if (!result) return undefined;
        if (result.length === 0) return undefined;
        var newResult = [];
        for (var i = 0; i < result.length; i++) {
            if (result[i]['fieldCount'] == null && result[i]['affectedRows'] == null) {
                if (Array.isArray(result[i]) && result[i].length == 1) {
                    newResult.push(result[i][0]);
                }
                else {
                    newResult.push(result[i]);
                }
            }
        }
        return newResult;
    }

    // 테스트 코드
    async test(connection, accIdx) {
        const query = 'SELECT * FROM test WHERE accIdx = ?';
        const [rows] = await connection.query(query, [accIdx]);
        return _util.objectCopy(rows);
    }
}

module.exports = dbQuery;