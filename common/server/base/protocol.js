/*
*	protocol.js
*	C <-> S 간 프로토콜 번호 정의
*   일반적으로는 RQ <=> RS 프로토콜을 정의 하지만 
*   http 통신이라 
*/

exports.protocol = {};

this.protocol["test"] = {};
this.protocol["test"]["P_TEST"] = 0;
this.protocol["test"]["P_TEST_DO"] = 1;

this.protocol["auth"] = {};
this.protocol["auth"]["P_AUTH"] = 1000;

this.protocol["lobby"] = {};
this.protocol["lobby"]["P_LOBBY"] = 2000;

this.protocol["game"] = {};
this.protocol["game"]["P_GAME"] = 7000;

// 코드 내에서 에러 값 변경하지 못하도록 프리징
exports.protocol = Object.freeze(this.protocol);