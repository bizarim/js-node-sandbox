/**
 * dbUsp.js
 * usp: user stored procedure
 * transaction 없는 프로시져 실행 클래스
 */
const dbProcedureExector = require('./dbProcedureExector');

class dbUsp extends dbProcedureExector {
    constructor(pool) {
        super(pool);
    }

    release() {
        super.release();
    }

    async executeAsync() {
        try {
            if (this.err != _errcode.Success) throw (this.err);
        } catch (ex) {
            this.logEx(ex, 'init error');
            return this.createErrOnEx(ex);
        }

        try {
            await this.dbConn.open();
        } catch (ex) {
            this.logEx(ex, 'conn open error');
            return this.createErrOnEx(ex);
        }

        try {
            const rows = await await this.onQuery(this.dbConn.getConn());
            this.dbConn.release();
            try {
                return this.onResult(rows);
            }
            catch (ex) {
                this.logEx(ex);
                return super.createErrOnEx(ex);
            }
        }
        catch (ex) {
            this.dbConn.release();
            this.logEx(ex);
            return super.createErrOnEx(ex);
        }
        finally {
            this.release();
            //console.log('release dbUsp');
        }
    }

}


module.exports = dbUsp;