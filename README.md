# web_server_node
node express 의 기본 골격  
express를 사용해서 구조 구성  

## express 프로젝트 생성

```javascript
express web_server_node
```

## ecosystem.config.js 파일 생성
```javascript
cd web_server_node
pm2 ecosystem
```

## ecosystem.confi.js 파일 예시
```javascript
// 추후작성
```

## 기본적인 보안
### Helmet 사용

Helmet을 이용하면 HTTP 헤더를 적절히 설정하여 몇 가지 잘 알려진 웹 취약성으로부터 앱을 보호할 수 있다.  
사실 Helmet은 보안 관련 HTTP 헤더를 설정하는 다음과 같은 더 작은 크기의 미들웨어 함수의 모음이다.

```javascript
app.use(helmet());
```

### 적어도 X-Powered-By 헤더는 사용하지 않도록 설정  
Helmet의 사용을 원치 않는 경우에는 적어도 X-Powered-By 헤더는 사용하지 말 것
공격자는 이 헤더(기본적으로 사용하도록 설정되어 있음)를 이용해 Express를 실행하는 앱을 발견한 후 특정한 대상에 대한 공격을 실행할 수 있다.

```javascript
app.disable('x-powered-by')
```