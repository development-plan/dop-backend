# DOP Backend API

## Models

### User
사용자 모델입니다.

```js
{
  id: '507f1f77bcf86cd799439011', // 식별자
  name: '여준호', // 본명
  nickname: '주노', // 닉네임
  email: 'test@example.com', // 이메일
  password: 'pa$$w0Rd', // 패스워드
  tel: '01012345678', // 전화번호
  image: 'https://github.com/junhoyeo.png', // 프로필 이미지 URL (기본으로 default 이미지 경로)
}
```

### Post

### Answer

## Routes

### [POST] `/auth/login`
로그인을 처리합니다.

### 요청

```json
{
  "email": "test@example.com",
  "password": "pa$$w0Rd"
}
```

### 응답

```json
{
  "token": "JWT",
  "refresh_token": "JWT_REFRESH_TOKEN"
}
```
