/**
 * urc
 * session key 얻기
 */
const userRedisCommand = require('./base/userRedisCommand');
const AccKeys = require('./base/AccKeys');

class urcXXX extends userRedisCommand {
    constructor(accIdx) {
        super();
        this.mainKey    = AccKeys.prototype.getMain(accIdx);
        this.subKey     = AccKeys.prototype.getSubToSKey();
    }
    
    release() {
        this.mainKey    = undefined;
        this.subKey     = undefined;
        super.release();
    }

    async onCommand(client) {
        return await client.hgetallAsync(this.mainKey);
    }
}

module.exports = urcXXX;