/**
 * dbTransCmd.js
 * 서로 다른 물리 db에서 Transaction 보장을 위한 프로 시져
 * 
 */
const dbProcedureExector = require('./dbProcedureExector');

class dbTransCmd extends dbProcedureExector {
    constructor(pool) {
        super(pool);
        this.isCommand = false;
    }

    release() {
        this.isCommand = undefined;
        super.release();
    }

    // 커맨드 처리
    async command() {
        // 1. check init
        if (this.err != _errcode.Success)
            return this.createErrOnEx(this.err);

        // 2. check open
        try {
            await this.dbConn.open();
        } catch (ex) {
            this.logEx(ex, 'conn open error');
            return this.createErrOnEx(ex);
        }

        // 3. excute
        try {
            await this.dbConn.beginTransaction();
            const conn = this.dbConn.getConn();
            this.isCommand = true;
            const rows = await this.onQuery(conn);
            return rows;
        }
        catch (ex) {
            this.logEx(ex, 'command error');
            return this.createErrOnEx(ex);                  // error
        }
    }

    // 커밋 처리
    async commit() {
        if (false == this.isCommand) {
            this.release();
            return;
        }
        if (undefined === this.dbConn || null == this.dbConn) {
            this.release();
            return;
        }
        try { await this.dbConn.commit(); }
        catch (ex) {
            this.logEx(ex, 'commit error');
        }
        try { this.dbConn.release(); }
        catch (ex) {
            this.logEx(ex, 'release error');
        }

        this.release();
    }

    // 롤백 처리
    async rollback() {
        if (false == this.isCommand) {
            this.release();
            return;
        }
        if (undefined === this.dbConn || null == this.dbConn) {
            this.release();
            return;
        }

        try { await this.dbConn.rollback(); }
        catch (ex) {
            this.logEx(ex, 'rollback error');
        }

        try { this.dbConn.release(); }
        catch (ex) {
            this.logEx(ex, 'release error');
        }

        this.release();
    }

}


module.exports = dbTransCmd;