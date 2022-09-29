# 노션(Notion) 클론 프로젝트

## API 사용법

- 요청 주소(Endpoint): `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces`

모든 API 요청(Request) `headers`에 다음 정보가 꼭 포함되어야 합니다.<br>
`username`은 다른 사람과 겹치지 않도록 주의하세요!<br>
본명으로 만들면 나중에 문제가 발생했을 때 찾기가 쉬워요.(E.g. `ParkYoungWoong`)

```json
{
  "content-type": "application/json",
  "apikey": "FinTech202207",
  "username": "<YOUR_NAME>"
}
```

API 사용 예시:

```js
async function createWorkspace() {
  const { data } = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FinTech202207',
      'username': 'ParkYoungWoong'
    },
    data: {
      "title": "신청서",
      "content": "창업지원기관, AC, VC의 지원 사업 모집과 심사를 도와주는 기능"
    }
  })
  console.log(data)
}
```

### 워크스페이스 목록 조회

전체 워크스페이스 목록을 가져옵니다.<br>
상세 내용은 포함되지 않습니다.

```curl
curl -X 'GET' \
https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces
```

```plaintext
@return {Object[]} - 조회된 워크스페이스 목록
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
[
  {
    "id": "3OiZYgMWa4oFS84WvcFK",
    "title": "신청서",
    "children": [
      {
        "id": "UafkQsknimBqgxRqzER7",
        "title": "화면 구분 및 정의"
      }
    ]
  },
  {
    "id": "kRFVo45DVRHSpERvEf69",
    "title": "팩트 시트(투자 유치 제안서)"
  }
]
```

### 워크스페이스 상세 내용 조회

단일 워크스페이스의 상세 내용을 가져옵니다.

```curl
curl -X 'GET' \
https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/:workspaceId
```

```plaintext
@return {Object} - 단일 워크스페이스의 상세 내용
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
{
  "id": "3OiZYgMWa4oFS84WvcFK",
  "title": "신청서",
  "content": "창업지원기관, AC, VC의 지원 사업 모집과 심사를 도와주는 기능",
  "poster": "https://storage.googleapis.com/heropy-api/vRJ0B1K5IXv113441.jpg",
  "children": [
    {
      "id": "UafkQsknimBqgxRqzER7",
      "title": "화면 구분 및 정의"
    }
  ]
}
```

### 워크스페이스 생성

워크스페이스를 생성합니다.<br>
워크스페이스의 내용(`content`)은 `<div>`, `<br>` 태그만 허용합니다.

```curl
curl -X 'POST' \
https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces
```

```plaintext
@param {String} parentId - 부모 워크스페이스 ID
@param {String} title - 워크스페이스 제목
@param {String} content - 워크스페이스 내용
@param {String} poster - 워크스페이스 대표 이미지(Base64)
@return {Object} - 생성된 워크스페이스 객체
```

요청 데이터 예시:

```json
{
  "title": "신청서",
  "content": "창업지원기관, AC, VC의 지원 사업 모집과 심사를 도와주는 기능"
}
```

응답 데이터 예시:

```json
{
  "id": "3OiZYgMWa4oFS84WvcFK",
  "title": "신청서",
  "content": "창업지원기관, AC, VC의 지원 사업 모집과 심사를 도와주는 기능"
}
```

### 워크스페이스 수정

워크스페이스를 수정합니다.<br>
워크스페이스의 내용(`content`)은 `<div>`, `<br>` 태그만 허용합니다.

```curl
curl -X 'PUT' \
https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/:workspaceId
```

```plaintext
@param {String} parentId - 부모 워크스페이스 ID, 부모 워크스페이스를 삭제하는 경우 '-1'
@param {String} title - 워크스페이스 제목
@param {String} content - 워크스페이스 내용
@param {String} poster - 워크스페이스 대표 이미지(Base64), 이미지 삭제하는 경우 '-1'
@return {Object} - 수정된 워크스페이스 객체
```

요청 데이터 예시:

```json
{
  "parentId": "-1",
  "title": "화면 구분 및 정의",
  "content": "신청서를 관리하기 위한 정보의 항목을 테이블에서는 칼럼, 폼에서는 질문이라 칭합니다.(칼럼과 폼은 연결되어있음)",
  "poster": "-1"
}
```

응답 데이터 예시:

```json
{
  "id": "UafkQsknimBqgxRqzER7",
  "title": "화면 구분 및 정의",
  "content": "신청서를 관리하기 위한 정보의 항목을 테이블에서는 칼럼, 폼에서는 질문이라 칭합니다.(칼럼과 폼은 연결되어있음)"
}
```

### 워크스페이스 삭제

특정 워크스페이스를 삭제합니다.<br>
자식 워크스페이스의 부모 워크스페이스 참조도 같이 삭제됩니다.

```curl
curl -X 'DELETE' \
https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/:workspaceId
```

```plaintext
@return {Boolean} - 워크스페이스 삭제 여부
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
true
```

### 삭제한 워크스페이스 복구

삭제한 워크스페이스를 복구합니다.<br>
자식 워크스페이스의 부모 워크스페이스 참조도 같이 복구됩니다.<br>
삭제 직후 생성/수정 등의 다른 동작이 없어야 정상적으로 복구할 수 있습니다.

```curl
curl -X 'PUT' \
https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/rollback/:workspaceId
```

```plaintext
@return {Boolean} - 워크스페이스 복구 여부
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
true
```