/**
 * IConnection
 * db connection 관리
 */
class IConnection {
    // 해제
    release() { }
    // 오픈
    async open() { }
    // 컨넥션 얻기
    getConn() { }
    // 커밋
    async commit() { }
    // 롤백
    async rollback() { }
}
/**
 * dbConn
 * IConnection 구현 객체
 */
class dbConn extends IConnection {
    constructor(pool) {
        super();
        this.dbPool = pool;
    }

    release() {
        if (undefined !== this.conn) {
            this.conn.release();
            this.conn = undefined;
        }
        if (undefined === this.dbPool) {
            this.dbPool = undefined;
        }
    }

    async open() {
        if (undefined === this.dbPool) {
            throw (_errcode.DB_CONN_ERROR);
        }
        this.conn = await this.dbPool.getConnection();
    }

    getConn() {
        return this.conn;
    }

    async beginTransaction() {
        if (undefined === this.conn) return;
        await this.conn.query("START TRANSACTION;");
    } 

    async commit() {
        if (undefined === this.conn) return;
        await this.conn.commit();
    }
    async rollback() {
        if (undefined === this.conn) return;
        await this.conn.rollback();
    }
}

module.exports = dbConn;