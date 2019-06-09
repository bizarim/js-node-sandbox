/**
 * global.js
 * 목적: static으로 사용 하기 위함
 * 전역으로 사용할 객체들을 사용하기 쉽게 global로 설정
 * global 객체를 이용
 * 전역 객체 앞에는 전역을 뜻하는 뜻으로 _로 시작
 */
//const DtXXX = require('../../common/datas/loader/DtXXX');
const ILoader = require('../../common/server/ILoader');

class globalLoader extends ILoader {
    constructor() {
        super();
    }

    async load(config) {

        function configLoad(config) {
            global._config = config;
        }

        function utilLoad(config) {
            if (undefined == global._logger) {
                global._logger = require('../../../common/util/logger').createLogger(config);
            }
            global._util = require('../../../common/util/util');
        }

        function errLoad() {
            global._err = require('../../common/server/base/error');
            global._erremit = _err.errorEvent;
            global._errcode = _err.errcode;
        }

        function enumLoad() {
            global._protocol = require('../../common/server/base/protocol').protocol;
            global._eCdType = require('../../common/server/base/enums').eCdType;
        }

        // json data load
        async function dataLoad(config) {
            //global._dtShop = new DtXXX(config.dataPath);
            //await global._dtShop.loadData();
        }

        async function dbLoad(config) {
            // redis connection
            global._redis = require('../../../common/database/redis/base/redisClient');
            global._redis.initialize(config.redis.host, config.redis.port);
            // mysql connection pool
            global._pool = require('../../../common/database/mysql/base/dbPool');
            await global._pool.poolsInit(config.db);
        }

        // 순서가 있다. (순서에 따라 의존성을 갖는건 올바르지 않다)
        configLoad(config);
        utilLoad(config);
        errLoad();
        enumLoad();
        //await dataLoad(config);
        //await dbLoad(config);
    }
}

module.exports = globalLoader;
