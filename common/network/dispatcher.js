/**
 * dispatcher.js
 * 패킷 1차 분기
 * webApp.js에서 넘어온 프로토콜을 각 로직에 전달
 * 각 서버 필요한 곳에서 구현하면 된다.
 * 
 * 참고:
 *  router 가 아닌 dispatcher인 이유는
 *  restfull api 가 아닌 rpc 방식
 *  web service가 아니여서 web과 게임 프로토콜 의 어중띤 방식을 취했다.
 */

class IDispatcher {
    constructor() { }
    async dispatch(req, res) { }
}

class dispatcher extends IDispatcher {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.func = [];
    }

    async dispatch(req, res) {
        var body = undefined;
        var logicCmd = 0;

        try {
            if (undefined !== req.query.enc) {
                // get 요청 - 서비스일 경우는 무조건 post 처리라 이부분은 에러 처리
                body = req.query;
            } else if (null !== req.body.enc) {
                // post 요청
                body = req.body;
            } else {
                res.end('error');
                return;
            }

            // body parse
            body = JSON.parse(body.enc);

            logicCmd = parseInt(body.cmd / 1000);
            if (null === this.func[logicCmd] || undefined === this.func[logicCmd]) {
                res.end('error');
                return;
            }

            // execute
            await this.func[logicCmd].execute(res, body);

        } catch (ex) {
            res.end('error');
        } finally {

        }
    }

}

module.exports = dispatcher;