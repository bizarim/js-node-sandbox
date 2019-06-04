/**
 * dbTransCmdManager.js
 * 트랜잭션 관리자.
 *  - 서로 다른 물리 db에서 Transaction 보장을 위한 프로 시져 실행을 목적으로 한다.
 *  - 실행
 *  - 커밋
 *  - 롤백
 */
class IdbTransCmdManager {
    // 리소르 해제
    release() { }
    // 프로시져 추가
    addProcedure(usp) { }
    // 실행
    async executeAsync() { }
    // 커밋
    async commit() { }
    // 롤백
    async rollback() { }
}
class dbTransCmdManager extends IdbTransCmdManager {
    constructor() {
        super();
        this.list = [];         // 실행 리스트
        this.completes = [];    // 완료 리스트
        this.fails = [];        // 실패 리스트
    }

    release() {
        this.list = undefined;
        this.completes = undefined;
    }

    addProcedure(usp) {
        if (undefined === this.list)
            this.list = [];
        this.list.push(usp);
    }

    async executeAsync() {
        var result = [];
        try {
            var err = _errcode.Success;
            const cnt = this.list.length;
            for (var i = 0; i < cnt; ++i) {
                const ptu = this.list.shift();
                const rt = await ptu.command();
                if (undefined !== rt.err) {
                    err = rt.err;
                    result.err = rt.err;
                    this.fails.push(ptu);
                    break;
                }

                this.completes.push(ptu);
                result.push(rt);
            }

            if (_errcode.Success !== err) {
                await this.rollback();
            }
            else {
                await this.commit();
            }
        } catch (ex) {
            _logger.error(ex);
            return { err: _errcode.DB_ERROR };
        } finally {
            this.release();
        }

        return result;
    }

    async rollback() {
        const ccnt = this.completes.length;
        for (var i = 0; i < ccnt; ++i) {
            const ptu = this.completes.shift();
            await ptu.rollback();
        }

        const lcnt = this.list.length;
        for (var i = 0; i < lcnt; ++i) {
            const ptu = this.list.shift();
            await ptu.rollback();
        }

        const fcnt = this.fails.length;
        for (var i = 0; i < fcnt; ++i) {
            const ptu = this.fails.shift();
            await ptu.rollback();
        }
    }

    async commit() {
        const ccnt = this.completes.length;
        for (var i = 0; i < ccnt; ++i) {
            const ptu = this.completes.shift();
            await ptu.commit();
        }

        const lcnt = this.list.length;
        for (var i = 0; i < lcnt; ++i) {
            const ptu = this.list.shift();
            await ptu.commit();
        }
    }
}

module.exports = dbTransCmdManager;