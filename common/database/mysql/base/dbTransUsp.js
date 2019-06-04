/**
 * dbTransUsp.js
 * transaction 프로시져 실행 클래스
 * usp: user stored procedure
 */

const dbProcedureExector = require('./dbProcedureExector');

class dbTransUsp extends dbProcedureExector {
    constructor(pool) {
        super(pool);
        this.isExcute = false;
    }

    async executeAsync() {
        if (this.err != _errcode.Success) return super.createErrOnEx(this.err);
        try {
            await this.dbConn.open();

            try {
                await this.dbConn.beginTransaction();
                const conn = this.dbConn.getConn();
                const rows = await this.onQuery(conn);
                await this.dbConn.commit();
                this.dbConn.release();
                this.isExcute = true;
                try {
                    return this.onResult(rows);
                }
                catch (ex) {
                    this.logEx(ex, 'on result error');
                    return super.createErrOnEx(ex);
                }
            }
            catch (ex) {
                await this.dbConn.rollback();
                this.dbConn.release();
                this.loggingQueryError(ex);
                return super.createErrOnEx(ex);
            }
        } catch (ex) {
            this.logEx(ex, 'excute dbConn open error');
            return super.crateErr();
        }
        finally {

            this.release();
        }
    }

    release() {
        super.release();
        this.isExcute = undefined;
        //console.log('release dbTransUsp');
    }
}

module.exports = dbTransUsp;