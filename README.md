# DOP Backend API [![Typed with TypeScript](https://badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=555555&color=blue)](https://github.com/microsoft/TypeScript) [![Code Style](https://badgen.net/badge/style/Airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

## TOC

- [Models](#Models)
  - [User](#User)
  - [Post](#Post)
  - [Answer](#Answer)
- [Authorization](#Authorization)
- [Routes](#Routes)
  - [Auth](#Auth)
  - [*Post](#Post-1)
  - [*Answer](#Answer-1)
  - [Upload](#Upload)
  - [Search](#Search)

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
  image: 'https://github.com/junhoyeo.png', // 프로필 이미지 URL
  // 기본 프로필 이미지는 값이 null일 때 프엔에서 처리하도록 하겠습니다,,,
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
    { date: 1574956959, content: '프로젝트 초기화하기' }, // timestamp by `new Date().getTime()`
    { date: 1574956959, content: '홈 스크린 만들기' },
    { date: 1574956959, content: 'React Navigation 적용하기' },
  ],
  post: '5dde748551787a36434f6f21', // 답변을 달 포스트
  author: '507f1f77bcf86cd799439011', // 게시한 사용자의 식별자
  created: Date.now(),
  likes: [ // 추천하는 사용자의 식별자 목록
    '507f1f77bcf86cd799439011'
  ],
}
```

## Authorization

### 요청
```js
{
  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
}
```

### 실패 시 응답
`401`

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

-----

### *Post
JWT 토큰이 필요합니다.

#### [POST] `/post`
새로운 게시글을 올립니다.

##### 요청
```json
{
  "title": "모바일 지도 앱을 만들어 보고 싶어요!",
  "content": "구글 지도 같은 앱 서비스를 만들고 싶은데 앱 개발에 대한 지식이 없어 시작할 엄두가 나지 않습니다 ㅜㅜ 도와주세요",
  "images": [
    "http://via.placeholder.com/150.png"
  ],
  "tags": [
    "안드로이드",
    "앱개발"
  ]
}
```

##### 응답
생성된 게시물의 식별자를 반환합니다.

```json
{
    "id": "5ddfe7d72456d93ee091cd3e"
}
```

#### [GET] `/post`
모든 게시글의 정보가 있는 목록을 가져옵니다. 나중에 시간이 난다면 페이징도 지원하도록 고칠게요.

##### 요청
`http://localhost:5000/post`

##### 응답
```json
{
  "posts": [
    {
      "images": [
        "http://via.placeholder.com/150.png"
      ],
      "likes": [],
      "tags": [
          "안드로이드",
          "앱개발"
      ],
      "title": "모바일 지도 앱을 만들어 보고 싶어요!",
      "content": "구글 지도 같은 앱 서비스를 만들고 싶은데 앱 개발에 대한 지식이 없어 시작할 엄두가 나지 않습니다 ㅜㅜ 도와주세요",
      "author": {
        "name": "여준호",
        "nickname": "주노",
        "email": "test@example.com",
        "tel": "01012345678",
        "image": "https://github.com/junhoyeo.png",
        "joined": "2019-11-27T13:05:09.163Z",
        "id": "5dde748551787a36434f6f21"
      },
      "created": "2019-11-28T15:28:52.437Z",
      "id": "5ddfe7b4d5533a3e6897243b",
      "answers": []
    }
  ]
}
```

#### [GET] `/post/{postID}`
`postID`를 가지는 특정 게시글의 정보를 가져옵니다.

##### 요청
`http://localhost:5000/post/5ddfe7b4d5533a3e6897243b`

##### 응답
```json
{
  "post": {
    "images": [
      "http://via.placeholder.com/150.png"
    ],
    "likes": [],
    "tags": [
      "안드로이드",
      "앱개발"
    ],
    "title": "모바일 지도 앱을 만들어 보고 싶어요!",
    "content": "구글 지도 같은 앱 서비스를 만들고 싶은데 앱 개발에 대한 지식이 없어 시작할 엄두가 나지 않습니다 ㅜㅜ 도와주세요",
    "author": {
      "name": "여준호",
      "nickname": "주노",
      "email": "test@example.com",
      "tel": "01012345678",
      "image": "https://github.com/junhoyeo.png",
      "joined": "2019-11-27T13:05:09.163Z",
      "id": "5dde748551787a36434f6f21"
    },
    "created": "2019-11-28T15:28:52.437Z",
    "id": "5ddfe7b4d5533a3e6897243b",
    "answers": []
  }
}
```

#### [PUT] `/post/{postID}`
`postID`를 가지는 특정 게시글의 정보를 수정합니다.

- 요청으로 들어온 `content`, `images`, `tags`, `title` 필드의 값으로 기존의 값을 덮어씌우게 되므로 유의하세요.

##### 요청
```json
{
  "title": "모바일 지도 앱. 만들어 보고 싶음.",
  "content": "구글 지도 같은 앱 서비스를 만들고 싶은데 앱 개발에 대한 지식이 없어 시작할 엄두가 나지 않음 ㅜㅜ 도와주셈",
  "images": [
    "http://via.placeholder.com/150.png"
  ],
  "tags": [
    "안드로이듦",
    "앱개밞"
  ]
}
```

##### 응답
성공 시 `200`

#### [DELETE] `/post/{postID}`
`postID`를 가지는 특정 게시글을 삭제합니다.

##### 요청
```json
{}
```

##### 응답
성공 시 `200`

#### [POST] `/post/{postID}/like`
`postID`를 가지는 특정 게시글에 *좋아요* 를 토글합니다.

- 좋아요를 누르지 않은 상태에서 요청을 보내면 *좋아요* 가 설정됩니다.
- 이미 좋아요를 누른 상태에서 요청을 보내면 *좋아요* 가 해제됩니다.

##### 요청
`http://localhost:5000/post/5ddfe7d72456d93ee091cd3e/like`

```json
{}
```

##### 응답
성공 시 `200`

-----

### *Answer
JWT 토큰이 필요합니다.

#### [POST] `/answer/{postID}`
`postID`의 포스트에 새로운 답변을 추가합니다.

#### 요청
`http://localhost:5000/answer/5ddfe7d72456d93ee091cd3e`

```json
{
  "content": "앱 개발이 처음이신데, 리액트를 다룬 적 있고 멀티 플랫폼 개발을 원하신다면 React Native는 어때요?",
  "schedule": [
    { "date": 1574956959, "content": "프로젝트 초기화하기" },
    { "date": 1574956959, "content": "홈 스크린 만들기" },
    { "date": 1574956959, "content": "React Navigation 적용하기" }
  ]
}
```

#### 응답
```json
{
    "id": "5ddff0b60b20274c6fbfcc2a"
}
```

#### [PUT] `/answer/{answerID}`

#### 요청
```json
{
  "content": "앱 개발 처음임? 리액트를 다룬 적 있음? 멀티 플랫폼 개발을 원함? React Native는 어떰?",
  "schedule": [
    { "date": 1574956959, "content": "프로젝트 초기화하셈" },
    { "date": 1574956959, "content": "홈 스크린 만드셈" },
    { "date": 1574956959, "content": "React Navigation 적용하셈" }
  ]
}
```

##### 응답
성공 시 `200`

#### [DELETE] `/answer/{answerID}`

##### 요청
```json
{}
```

##### 응답
성공 시 `200`

#### [POST] `/answer/{answerID}/like`

##### 요청
`http://localhost:5000/answer/5ddff0b60b20274c6fbfcc2a/like`

```json
{}
```

##### 응답
성공 시 `200`

-----

### Upload

#### [POST] `/upload`
새로운 이미지를 업로드하고 서버 상의 주소를 받습니다. 프로필이나 게시물에 사진을 올릴 때 사용하세요.

##### 요청
[upload.test.html](./upload.test.html)

##### 응답
```json
{
  "path": "uploads/GGG.png"
}
```

- 업로드된 이미지는 `http://example.com/uploads/GGG.png` 에서 액세스 가능

-----

### Search

#### [GET] `/search/{query}`
`query` 텍스트가 포함된 포스트와, 답변을 모두 검색한 뒤 포스트 주소와 이미지 주소 목록을 반환합니다.

##### 요청
##### 응답
```json
{
  "result": [
    {
      "images": [
        "http://via.placeholder.com/150.png"
      ],
      "id": "5ddfe7d72456d93ee091cd3e"
    }
  ]
}
```
