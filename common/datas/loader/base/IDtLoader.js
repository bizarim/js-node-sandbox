/**
 * IDtLoader.js
 * 데이터 로더 인터페이스
 */

class IDtLoader {
    constructor() {
        this.isLoaded = false;
    }
    setLoad(done) {
        this.isLoaded = done;
    }
    isLoaded() {
        return this.isLoaded;
    }
    async loadData() {

    }
}

module.exports = IDtLoader;