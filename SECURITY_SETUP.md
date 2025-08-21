# 🛡️ 보안 설정 가이드

## 환경 변수 설정 (필수)

### 1. Spring Boot 인증 서버 (.env)
```env
# Gmail SMTP 설정
GMAIL_USERNAME=your-actual-email@gmail.com
GMAIL_PASSWORD=your-16-digit-app-password

# JWT 비밀키 (최소 32자)
JWT_SECRET=your-256-bit-secret-key-here-min-32-chars

# OAuth2 설정
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-google-client-secret
NAVER_CLIENT_ID=your-naver-client-id
NAVER_CLIENT_SECRET=your-naver-client-secret
KAKAO_CLIENT_ID=your-kakao-client-id
KAKAO_CLIENT_SECRET=your-kakao-client-secret
KAKAO_ADMIN_KEY=your-kakao-admin-key
```

### 2. Node.js Agent 서버 (.env)
```env
# OpenAI API
OPENAI_API_KEY=sk-your-openai-api-key

# Google Services
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REFRESH_TOKEN=your-google-refresh-token
GOOGLE_API_KEY=your-google-api-key
SERP_API_KEY=your-serp-api-key

# Discord
DISCORD_TOKEN=your-discord-bot-token

# GitHub
GITHUB_ACCESS_TOKEN=ghp_your-github-token

# Kakao
KAKAO_MAP_CLIENT_ID=your-kakao-map-id
KAKAO_TALK_CLIENT_ID=your-kakao-talk-id
KAKAO_TALK_CLIENT_SECRET=your-kakao-talk-secret
KAKAO_TALK_REFRESH_TOKEN=your-kakao-talk-refresh

# Notion
NOTION_API_KEY=secret_your-notion-key

# Server
PORT=8081
```

### 3. Python STT/TTS 서버 (.env)
```env
# ElevenLabs API
ELEVENLABS_API_KEY=sk_your-elevenlabs-api-key

# Whisper 설정
WHISPER_MODEL=base
DEFAULT_RECORD_DURATION=15.0
MIN_RECORD_DURATION=5.0
MAX_RECORD_DURATION=30.0

# TTS 설정
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM

# 서버 설정
HOST=localhost
PORT=8082
DEBUG=true

# 오디오 설정
SAMPLE_RATE=16000
TEMP_AUDIO_DIR=./temp_audio
```

### 4. React 프론트엔드 (.env)
```env
# Agentica WebSocket
VITE_AGENTICA_WS_URL=ws://localhost:8081

# API URLs (개발환경)
VITE_SPRING_API_URL=http://localhost:8080
VITE_NODE_API_URL=http://localhost:8081
VITE_PYTHON_VOICE_URL=http://localhost:8082
VITE_VOICE_PROXY_URL=http://localhost:8083
VITE_WEBSOCKET_URL=ws://localhost:8081
```

## 🚨 보안 체크리스트

- [ ] 모든 .env 파일이 .gitignore에 포함되어 있는지 확인
- [ ] example 파일에 실제 API 키가 없는지 확인
- [ ] JWT 비밀키가 최소 32자 이상인지 확인
- [ ] 운영 환경에서는 강력한 비밀번호 사용
- [ ] 정기적으로 API 키 로테이션 실시

## API 키 발급 가이드

### OpenAI API 키
1. https://platform.openai.com/api-keys 방문
2. "Create new secret key" 클릭
3. 생성된 키를 안전하게 저장

### ElevenLabs API 키
1. https://elevenlabs.io/app/speech-synthesis 방문
2. Profile Settings → API Key 확인
3. 월 사용량 제한 확인

### Google OAuth2 설정
1. https://console.cloud.google.com/ 방문
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. APIs & Services → Credentials
4. OAuth 2.0 클라이언트 ID 생성
5. 승인된 리디렉션 URI 설정:
   - `http://localhost:8080/login/oauth2/code/google`

### Gmail SMTP 앱 비밀번호
1. Google 계정 → 보안 → 2단계 인증 활성화
2. 앱 비밀번호 생성
3. 16자리 비밀번호를 GMAIL_PASSWORD에 설정

## 개발 환경 빠른 설정

```bash
# 1. 환경 변수 파일 복사
cp finalteam/test2agent/client/.env_example finalteam/test2agent/client/.env
cp finalteam/test2agent/server/.env_example finalteam/test2agent/server/.env
cp MergeStts/env.example MergeStts/.env
cp finalLogin/user/.env.example finalLogin/user/.env

# 2. 각 .env 파일을 열어서 실제 API 키로 수정
# 3. 서비스 시작
./run_all_dev.cmd
```

## 운영 환경 배포 시 주의사항

- Docker secrets 또는 Kubernetes secrets 사용
- 환경 변수는 컨테이너 런타임에서 주입
- API 키는 별도의 key management 서비스 사용 권장
- 로그에 민감한 정보가 출력되지 않도록 주의
