/**
 * IdbProcedureExector.js
 * procedure 실행 인터페이스
 */

const dbConn = require('./dbConn');

class IdbProcedureExector {
    constructor() { }
    // 자원 해제
    release() { }
    // 비동기 실행 (autocommit)
    async executeAsync() { };
    // 실행 쿼리들
    async onQuery(conn) { }
    // 결과 가공 처리
    onResult(rows) { return rows; }
    // 명령어 실행 (none autocommit)
    async command() { }
}
/**
 * IdbProcedureExector 구현 객체
 */
class dbProcedureExector extends IdbProcedureExector {
    constructor(pool) {
        super();
        this.err = _errcode.Success;
        this.dbConn = new dbConn(pool);
    }

    release() {
        this.err = undefined;
        this.dbConn = undefined;
    }

    createErrOnEx(ex) {
        const errcode = Object.values(_errcode).find(o => o === ex);
        if (undefined === errcode) return { err: _errcode.DB_ERROR };
        else return { err: ex };
    }

    crateErr() {
        return { err: _errcode.DB_ERROR };
    }

    logEx(ex, msg) {
        _logger.error(msg);
        if (undefined !== ex.message) {
            _logger.error(ex.message);
            _logger.error(ex.stack);
        } else {
            _logger.error('errcode: ' + ex);
        }
    }

    loggingQueryError(ex) {
        if (undefined !== ex.message) {
            _logger.error(ex.message);
            _logger.error(ex.stack);
        }
    }
}

module.exports = dbProcedureExector;