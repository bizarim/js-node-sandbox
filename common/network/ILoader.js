/**
 * global.js
 * 목적: static으로 사용 하기 위함
 * 전역으로 사용할 객체들을 사용하기 쉽게 global로 설정
 * global 객체를 이용
 * 전역 객체 앞에는 전역을 뜻하는 뜻으로 _로 시작
 */

class ILoader {
    constructor() { }
    async load(config) { }
}

module.exports = ILoader;
