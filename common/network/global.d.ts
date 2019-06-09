/**
 * global.d.ts
 * global 객체 이용시 자동으로 ide 지원이 안되서
 * 수동으로 설정이 필요함
 */
import { Logger, LogCallback } from "winston";

declare var _pool: SC.IdbPool;
declare var _redis: SC.IRedis;
declare var _logger: SC.ILogger;
declare var _util: SC.IUtil;
declare var _erremit: SC.IErrorEmitter;

declare namespace SC {
    interface IErrorEmitter {
        /**
         * 에러처리 Helper
         * @param error 에러
         * @param errcode 에러 코드
         * @param ret result object
         * @param res response object
         */
        emit(error: String, errcode: Number, ret: Object, res: Object): void;
    }
    interface IdbPool {
        /**
         * db connection pool initialize
         *
         * @param dbConfig db config
         * @param cb callback function
        **/
        poolsInit(dbConfig: any, cb: () => void): Promise<void>;
        /**
         * get main db connection pool
        **/
        getMain(): Object;
        /**
         * get game db connection pool
         * @param dbIdx game shard db index number
        **/
        getGame(dbIdx: Number): Object;
        /**
         * get static db connection pool
        **/
        getStatic(): Object;
    }
    interface IRedis {
        /**
         * 레디스 초기화
         * @param ip ip
         * @param port port
         */
        initialize(ip: String, port: Number): Promise<void>;
        /**
         * 레디스 클라이언트 얻어오기
         */
        getClient(): Object;
    }
    interface ILogger {
        /**
         * use debug 
         */
        debug: LeveledLogMethod;
        /**
         * use info
         */
        info: LeveledLogMethod;
        /**
         * use error
         */
        error: LeveledLogMethod;
    }

    interface LeveledLogMethod {
        (message: string, callback: LogCallback): Logger;
        (message: string, meta: any, callback: LogCallback): Logger;
        (message: string, ...meta: any[]): Logger;
        (infoObject: object): Logger;
    }

    interface IUtil {
        /**
         * 패킷 디코딩
         * @param enc 인코딩 string
         */
        packetDecrypt(enc: String): String;
        /**
         * 패킷 인코딩
         * @param dec 디코딩 string
         */
        packetEncrypt(dec: String): String;
        /**
         * from ~ to 사이 랜덤한 숫자 (int)
         * @param from 시작
         * @param to 끝
         */
        randomInt(from: Number, to: Number): Number;
        /**
         * from ~ to 사이 랜덤한 숫자 (float)
         * @param from 
         * @param to 
         */
        randomFloat(from: Number, to: Number): Number;
        /**
         * send helper
         * @param res reponse 객체
         * @param ret result 객체
         */
        sendResult(res: Object, ret: Object): void;
        /**
         * 객체 길이 구하기
         * @param object 해당 객체
         */
        getLength(object: Object): Number;
        /**
         * 객체 deep copy
         * @param object 
         */
        objectCopy(object: Object): Object;
        /**
         * session key 생성기
         * @param accIdx 계정 번호
         */
        sKeyGen(accIdx: Number): String;
        /**
         * 룸키 생성기
         * @param accIdx 개정 번호
         */
        rKeyGen(accIdx: Number, sMCode: String): String;
        /**
         * float 합산
         * @param x X
         * @param y Y
         */
        floatSum(x: Number, y: Number): Number;
        /**
        * 배열 중복값 제거
        * @param arr 배열
        */
        uniqueArray(arr: Object[]);
    }

}