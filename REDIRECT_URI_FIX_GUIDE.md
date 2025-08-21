# 🔧 redirect_uri_mismatch 오류 해결 가이드

## 🚨 발생한 오류
```
액세스 차단됨: 이 앱의 요청이 잘못되었습니다
400 오류: redirect_uri_mismatch
```

## 🎯 문제 원인
Google Cloud Console에서 OAuth 2.0 클라이언트 ID의 **승인된 리디렉션 URI**에 OAuth Playground URL이 등록되지 않았습니다.

---

## 🛠️ **해결 방법 (단계별)**

### **1단계: Google Cloud Console 접속**
1. https://console.cloud.google.com/ 접속
2. **본인의 프로젝트 선택** (상단 드롭다운)

### **2단계: OAuth 클라이언트 설정 페이지로 이동**
1. 왼쪽 메뉴에서 **"APIs & Services"** 클릭
2. **"Credentials"** 클릭
3. **"OAuth 2.0 클라이언트 ID"** 섹션에서 **본인의 클라이언트** 클릭
   - 이름이 "Web client 1" 또는 직접 지은 이름일 것입니다

### **3단계: 승인된 리디렉션 URI 추가**

#### **현재 상태 확인:**
**"승인된 리디렉션 URI"** 섹션을 확인하세요. 아마 다음과 같이 되어 있을 것입니다:
```
✅ http://localhost:8080/login/oauth2/code/google
```

#### **OAuth Playground URI 추가:**
1. **"URI 추가"** 또는 **"+ ADD URI"** 버튼 클릭
2. 새로 나타나는 입력창에 **정확히** 다음 URL 입력:
   ```
   https://developers.google.com/oauthplayground
   ```
   ⚠️ **주의**: 끝에 `/` 슬래시 없이 정확히 입력하세요!

#### **최종 결과:**
승인된 리디렉션 URI가 다음과 같이 되어야 합니다:
```
✅ http://localhost:8080/login/oauth2/code/google
✅ https://developers.google.com/oauthplayground
```

### **4단계: 변경사항 저장**
- 페이지 하단의 **"저장"** 또는 **"SAVE"** 버튼 클릭
- 변경사항이 적용될 때까지 **1-2분 정도** 기다려주세요

---

## 🎮 **OAuth Playground 재시도**

### **5단계: OAuth Playground 다시 시도**
1. OAuth Playground 페이지를 **새로고침** (F5)
2. 또는 https://developers.google.com/oauthplayground 다시 접속

### **6단계: 처음부터 다시 진행**
1. **⚙️ 설정**에서 본인의 OAuth credentials 입력
2. **Gmail API v1** 권한 선택
3. **"Authorize APIs"** 클릭
4. **이번에는 정상적으로 Google 로그인 페이지로 이동**해야 합니다

---

## 🔍 **추가 확인사항**

### **OAuth 클라이언트가 없는 경우:**

만약 **OAuth 2.0 클라이언트 ID**가 아예 없다면:

1. **"+ CREATE CREDENTIALS"** 클릭
2. **"OAuth client ID"** 선택
3. **"Application type"**: **Web application** 선택
4. **"Name"**: 원하는 이름 입력 (예: "Agentica OAuth Client")
5. **"Authorized redirect URIs"**에 **두 개 모두** 추가:
   ```
   http://localhost:8080/login/oauth2/code/google
   https://developers.google.com/oauthplayground
   ```
6. **"CREATE"** 클릭
7. 생성된 **클라이언트 ID**와 **클라이언트 보안 비밀** 복사

### **프로젝트가 없는 경우:**

1. Google Cloud Console 상단에서 **"프로젝트 선택"** 클릭
2. **"새 프로젝트"** 클릭
3. 프로젝트 이름 입력 (예: "Agentica Project")
4. **"만들기"** 클릭
5. 위의 OAuth 클라이언트 생성 과정 진행

---

## ✅ **성공 확인**

**올바르게 설정되었다면:**
1. OAuth Playground에서 **"Authorize APIs"** 클릭 시
2. **Google 로그인 페이지**로 정상 이동
3. 로그인 후 **권한 승인 페이지** 표시
4. 승인 후 **OAuth Playground로 돌아와서 authorization code 표시**

---

## 🚨 **여전히 문제가 있다면**

### **체크리스트:**
- [ ] Google Cloud Console에서 올바른 프로젝트를 선택했는가?
- [ ] OAuth 2.0 클라이언트 ID가 생성되어 있는가?
- [ ] 승인된 리디렉션 URI에 정확히 `https://developers.google.com/oauthplayground`가 추가되었는가?
- [ ] 변경사항을 저장했는가?
- [ ] 1-2분 정도 기다린 후 다시 시도했는가?

### **스크린샷으로 확인해주세요:**
1. Google Cloud Console의 OAuth 클라이언트 설정 페이지
2. "승인된 리디렉션 URI" 섹션이 올바르게 설정되었는지 확인

**이렇게 하면 redirect_uri_mismatch 오류가 해결됩니다!** 🎉
