/**
 * interface User Redis
 */
class IRedsExector {
    constructor() { }
    // 자원 해제
    release() { }
    // 명령어 구현
    async onCommand(client) { }
    // 결과 가공
    onResult(result) { return result; }
    // 비동기 실행
    async executeAsync() { }
}

/**
 * user redis command
 */
class userRedisCommand extends IRedsExector {
    constructor() {
        super();
        this.err = _errcode.Success;
    }

    release() {
        this.err = undefined;
    }

    async executeAsync() {
        if (this.err != _errcode.Success) return super.createErrOnEx(this.err);
        try {
            const client = _redis.getClient();          // get redis client
            if (undefined === client) {
                throw (_errcode.REDIS_CONN_ERROR);
            }
            const result = await this.onCommand(client);// command
            return this.onResult(result);               // result 가공
        }
        catch (ex) {
            _logger.error(ex);                          // logging
            return super.createErrOnEx(ex);             // error
        }
        finally {
            this.release();
        }
    }

    createErrOnEx(ex) {
        const errcode = Object.values(_errcode).find(o => o === ex);
        if (undefined === errcode) return { err: _errcode.REDIS_ERROR };
        else return { err: ex };
    }
    crateErr() { return { err: _errcode.REDIS_ERROR }; }
}

module.exports = userRedisCommand;