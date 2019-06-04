/*
*	dbPool.js
*   mysql db connection 관리
*/
const uspGetShardConf = require('../main/uspGetShardConf');
const mysql = require('mysql2/promise');

const dbPool = {
    pools : [],
    
    // DB Connection Pool 생성
    poolsInit : async function (dbConfig) {
        await dbPool.initMain(dbConfig.main);
        await dbPool.initStatic(dbConfig.static);
        await dbPool.initGame();
    },

    initMain : async function(maindbconfig) {
        this.pools.main = mysql.createPool(maindbconfig);

        this.pools.main.on('connection', function (connection) {
            // todo redis pub
            //console.log('connection pool increase => ');
        });
        
        this.pools.main.on('enqueue', function () {
            // todo redis pub
            //console.log('Waiting for available connection slot => ');
        });
    },

    initGame : async function() {
        this.pools.push(null);  // 0번 인덱스 사용하지 않기 위해

        var usp = new uspGetShardConf(this.pools.main);
        usp.initParam();
        var rt = await usp.executeAsync();
        if(undefined === rt) throw(_errcode.DB_NONE_SHARD_GAMEDB);
        if(rt.length < 1) throw(_errcode.DB_NONE_GAMEDB);

        // todo
        // redis 붙이게 되면 그때 가서
        rt.forEach(function (v) {
            //console.log(v.dbGameConnStr);
            const strConn = JSON.parse(v.dbGameConnStr);
            //console.log(strConn);
            this.pools.push(mysql.createPool(strConn));
        }, this);
    },

    initStatic : async function(staticdbconfig){
        this.static = mysql.createPool(staticdbconfig);
        
        // this.pools.static.on('connection', function (connection) {
        //     // todo redis pub
        //     //console.log('connection pool increase => ');
        // });
        
        // this.pools.static.on('enqueue', function () {
        //     // todo redis pub
        //     //console.log('Waiting for available connection slot => ');
        // });
    },

    getMain : function() {
        return this.pools.main;
    },

    getGame : function(dbIdx) {
        return this.pools[dbIdx];
    },

    getStatic : function() {
        return this.static;
    },
}

module.exports = dbPool;