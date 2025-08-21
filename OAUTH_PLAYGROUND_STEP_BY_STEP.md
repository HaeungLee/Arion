# 🎮 OAuth Playground 단계별 가이드

## 🔧 **1단계: OAuth Playground 접속 및 설정**

### **A. 사이트 접속**
1. 브라우저에서 https://developers.google.com/oauthplayground 열기

### **B. 본인 OAuth Credentials 설정 (중요!)**

#### **🔍 화면 우상단 톱니바퀴(⚙️) 아이콘 찾기**
- 페이지 오른쪽 상단에 **⚙️ (톱니바퀴)** 아이콘이 있습니다
- 클릭하면 **"Configuration"** 패널이 열립니다

#### **📋 설정 패널에서 다음 작업:**

1. **"Use your own OAuth credentials" 체크박스 찾기**
   - 패널 상단에 위치
   - ☐ Use your own OAuth credentials → ☑️ 체크

2. **OAuth Client ID 입력**
   ```
   OAuth Client ID: [여기에 본인의 클라이언트 ID 입력]
   ```
   - Google Cloud Console에서 복사한 ID
   - 형식: `123456789012-abcdefghijklmnop.apps.googleusercontent.com`

3. **OAuth Client Secret 입력**
   ```
   OAuth Client secret: [여기에 본인의 클라이언트 시크릿 입력]
   ```
   - Google Cloud Console에서 복사한 Secret
   - 형식: `GOCSPX-abcdefghijklmnopqrstuvwx`

#### **💡 본인의 OAuth Credentials를 모르는 경우:**

**Google Cloud Console에서 확인하는 방법:**

1. **Google Cloud Console 접속**: https://console.cloud.google.com/
2. **APIs & Services** → **Credentials** 클릭
3. **OAuth 2.0 클라이언트 ID** 섹션에서 본인 프로젝트의 클라이언트 찾기
4. 클라이언트 이름 클릭 (예: "Web client 1")
5. **클라이언트 ID와 클라이언트 보안 비밀** 복사

**만약 OAuth 클라이언트가 없다면:**
1. **+ CREATE CREDENTIALS** 클릭
2. **OAuth client ID** 선택
3. **Application type**: Web application
4. **Authorized redirect URIs**에 추가:
   ```
   https://developers.google.com/oauthplayground
   http://localhost:8080/login/oauth2/code/google
   ```
5. **CREATE** 클릭 후 클라이언트 ID/Secret 복사

---

## 🎯 **2단계: Gmail API 권한 설정**

### **왼쪽 API 목록에서 Gmail 찾기:**

1. **Step 1** 섹션에서 스크롤하여 **"Gmail API v1"** 찾기
2. **Gmail API v1** 확장 (▶️ 클릭)
3. 다음 권한들을 **체크**:
   ```
   ☑️ https://www.googleapis.com/auth/gmail.readonly
   ☑️ https://www.googleapis.com/auth/gmail.send  
   ☑️ https://www.googleapis.com/auth/gmail.modify
   ```

### **권한 승인:**
4. **"Authorize APIs"** 버튼 클릭 (파란색 버튼)
---

## 🔐 **3단계: Google 로그인 및 권한 승인**

### **로그인 화면:**
1. **Google 계정 선택** (본인이 사용할 Gmail 계정)
2. **비밀번호 입력**

### **권한 승인 화면:**
1. **"이 앱이 확인되지 않았습니다"** 경고가 나올 수 있음
   - **"고급"** 클릭
   - **"안전하지 않은 페이지로 이동"** 클릭
   
2. **권한 승인 페이지:**
   ```
   OAuth Playground에서 다음을 요청합니다:
   ☑️ Gmail에서 이메일 메시지 및 설정 보기
   ☑️ 이메일 작성, 전송 및 영구 삭제
   ☑️ Gmail 라벨 관리 및 이메일 메시지 삭제
   ```
   - **"허용"** 또는 **"Allow"** 클릭

---

## 🎫 **4단계: Authorization Code → Refresh Token**

### **Step 1 완료 후:**
- 페이지가 OAuth Playground로 돌아옵니다
- **Authorization code** 자동으로 채워져 있음

### **Step 2 실행:**
1. **"Exchange authorization code for tokens"** 버튼 클릭
2. 잠시 기다리면 **토큰 정보가 표시됩니다**:
   ```json
   {
     "access_token": "ya29.a0AfH6SMC...",
     "expires_in": 3599,
     "refresh_token": "1//0GWE...", ← 이것이 필요한 refresh token!
     "scope": "https://www.googleapis.com/auth/gmail.readonly...",
     "token_type": "Bearer"
   }
   ```

### **Refresh Token 복사:**
- **"refresh_token"** 값을 전체 복사
- 형식: `1//0GWE...` (보통 100자 이상의 긴 문자열)

---

## 📝 **5단계: 환경변수 파일 업데이트**

### **파일 위치:**
```
finalteam/test2agent/server/.env
```

### **업데이트할 내용:**
```env
# Google OAuth2 설정
GOOGLE_CLIENT_ID=123456789012-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwx
GOOGLE_REFRESH_TOKEN=1//0GWE_새로_복사한_refresh_token_여기에_붙여넣기

# 기타 필수 설정
OPENAI_API_KEY=sk-your-openai-api-key
```

### **서버 재시작:**
```bash
cd finalteam/test2agent/server
npm start
```

---

## 🧪 **6단계: 테스트**

### **OAuth Playground에서 테스트:**
1. **Step 3**: List possible operations 확인
2. **Gmail API v1** → **users.messages.list** 선택  
3. **Send the request** 클릭
4. **성공 응답 확인** (200 OK + 메일 목록)

### **Agent에서 테스트:**
채팅에서 입력:
```
Gmail 메일 목록 보여줘
test@example.com으로 안녕하세요 제목으로 메일 보내줘
```

---

## 🚨 **문제 해결**

### **"Client not found" 오류:**
- Google Cloud Console에서 OAuth 클라이언트 ID가 제대로 생성되었는지 확인
- 클라이언트 ID를 정확히 복사했는지 확인

### **"Redirect URI mismatch" 오류:**
Google Cloud Console에서 승인된 리디렉션 URI에 다음 추가:
```
https://developers.google.com/oauthplayground
```

### **"Access blocked" 오류:**
- 앱이 확인되지 않은 상태
- Google Cloud Console → OAuth consent screen에서 테스트 사용자로 본인 이메일 추가

---

## ✅ **성공 확인**

다음과 같은 메시지가 나오면 성공:
```
✅ Gmail에서 메일 목록을 성공적으로 가져왔습니다.
📧 test@example.com으로 메일을 성공적으로 전송했습니다.
```

**이제 Gmail 기능이 정상 작동합니다!** 🎉
