# DOP Backend API [![Typed with TypeScript](https://badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=555555&color=blue)](https://github.com/microsoft/TypeScript) [![Code Style](https://badgen.net/badge/style/Airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

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
  created: Date.now(), // 가입일
}
```

### Post
포스트 모델입니다.

```js
{
  id: '5dde748551787a36434f6f21', // 포스트 식별자
  title: '모바일 지도 앱을 만들어 보고 싶어요!',
  content: '구글 지도 같은 앱 서비스를 만들고 싶은데 앱 개발에 대한 지식이 없어 시작할 엄두가 나지 않습니다 ㅜㅜ 도와주세요',
  images: [ // 이미지 URL 리스트
    'http://via.placeholder.com/150.png',
  ],
  author: '507f1f77bcf86cd799439011', // 게시한 사용자의 식별자
  created: Date.now(),
  tags: [ // 태그 리스트
    '안드로이드',
    '앱개발',
  ],
  likes: [ // 추천하는 사용자의 식별자 목록
    '507f1f77bcf86cd799439011'
  ],
}
```

### Answer
답변 모델입니다.

```js
{
  id: '5dde748644d279861608625e', // 답변 식별자
  content: '앱 개발이 처음이신데, 리액트를 다룬 적 있고 멀티 플랫폼 개발을 원하신다면 React Native는 어때요?',
  schedule: [
    { date: Date(), content: '프로젝트 초기화하기' },
    { date: Date(), content: '홈 스크린 만들기' },
    { date: Date(), content: 'React Navigation 적용하기' },
  ],
  post: '5dde748551787a36434f6f21', // 답변을 달 포스트
  author: '507f1f77bcf86cd799439011', // 게시한 사용자의 식별자
  created: Date.now(),
  likes: [ // 추천하는 사용자의 식별자 목록
    '507f1f77bcf86cd799439011'
  ],
}
```

## Routes

### Auth

#### [POST] `/auth/join`
새로운 사용자를 생성합니다.

##### 요청

```json
{
  "name": "여준호",
  "nickname": "주노",
  "email": "test@example.com",
  "password": "pa$$w0Rd",
  "tel": "01012345678",
  "image": "https://github.com/junhoyeo.png"
}
```

##### 응답

```json
{
  "id": "507f1f77bcf86cd799439011"
}
```

#### [POST] `/auth/login`
사용자 이메일과 패스워드로 인증을 수행한 뒤 액세스 토큰을 발급합니다.

##### 요청

```json
{
  "email": "test@example.com",
  "password": "pa$$w0Rd"
}
```

##### 응답

```json
{
  "id": "507f1f77bcf86cd799439011",
  "token": "ACCESS_TOKEN"
}
```

### Post

#### [POST] `/post`
#### [GET] `/post`
#### [GET] `/post/{postID}`
#### [PUT] `/post/{postID}`
#### [DELETE] `/post/{postID}`
#### [POST] `/post/{postID}/like`

### Answer

#### [POST] `/answer/{postID}`
#### [PUT] `/answer/{answerID}`
#### [DELETE] `/answer/{answerID}`
#### [POST] `/answer/{answerID}/like`
