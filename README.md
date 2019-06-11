# node js 로 만드는 Web Application Server

## package 설치
```md
npm install
```

### 구조

```sh
│  README.md
├─common (서버 공통 사용)
│  │ 
│  ├─database (db 모듈-mysql,redis)
│  │
│  ├─datas (json data loader)
│  │ 
│  ├─network (server interface)
│  │ 
│  └─util (logger 등)
│
└─servers (구현 was)
   │ 
   ├─ testServer (테스트 서버) 
```

### database class diagrams
![databaseClassDiagrams](/common/database/mysql/databaseClassDiagrams.png)


### redis class diagrams
![redisClassDiagrams](/common/database/redis/redisClassDiagrams.png)


### server class diagrams
![server](/common/database/redis/server.png)