/*
*	error.js
*	에러코드 정의
*/

const events = require('events');

exports.errcode = {
    Success                         : 0,
    
    AUTH_ERROR                      : 1000,
    LOBBY_ERROR                     : 2000,
    
    // server error 100000
    SERVER_ERROR                    : 100000,
    SERVER_VER_ERROR                : 100001,
    DB_ERROR                        : 100100,
    DB_CONN_ERROR                   : 100101,
    DB_NONE_SHARD_GAMEDB            : 100102,
    DB_NONE_GAMEDB                  : 100103,
    DB_ERROR_ISR                    : 100104,
    DB_ERROR_UP1                    : 100105,
    DB_ERROR_UP2                    : 100106,
    REDIS_ERROR                     : 100200,
    REDIS_CONN_ERROR                : 100201,
    DT_ERROR                        : 100301,
};

// 코드 내에서 에러 값 변경하지 못하도록 프리징
exports.errcode = Object.freeze(this.errcode);

exports.errorEvent = new events.EventEmitter();
exports.errorEvent.on('error', function (errcode, ret, res) {
    ret['errno'] = errcode;
    _util.sendResult(res, ret);
    //console.log(errcode);
    //console.trace();
});

