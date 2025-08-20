# 🚀 Arion - 통합 AI 에이전트 플랫폼

> 오픈소스 개발자 대회 출품작  
> 마이크로서비스 아키텍처 기반 AI 음성 에이전트 시스템

## 📋 프로젝트 개요

Arion은 음성 인식, 자연어 처리, AI 에이전트 기능을 통합한 마이크로서비스 플랫폼입니다. 
여러 독립적인 서비스들이 협력하여 완전한 AI 음성 에이전트 경험을 제공합니다.

## 🏗️ 아키텍처

### 마이크로서비스 구성

| 서비스 | 포트 | 기술 스택 | 역할 |
|--------|------|-----------|------|
| **인증 서버** | 8080 | Spring Boot + JWT | 사용자 인증 및 보안 |
| **STT/TTS 서버** | 8082 | Python FastAPI | 음성 인식/합성 |
| **Voice Proxy** | 8083 | Node.js | 음성 데이터 중계 |
| **모바일 앱** | 8084 | React Native + Expo | 네이티브 모바일 클라이언트 |
| **Agent 백엔드** | 3000 | Node.js + WebSocket | AI 에이전트 로직 |
| **웹 클라이언트** | 5173 | React + Vite | 웹 인터페이스 |

### 시스템 다이어그램

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Mobile App     │    │   Web Client    │    │  Auth Service   │
│  (React Native) │    │    (React)      │    │ (Spring Boot)   │
│     :8084       │    │     :5173       │    │     :8080       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Agent Backend  │
                    │   (Node.js)     │
                    │     :3000       │
                    └─────────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
    │  Voice Proxy    │  │   STT/TTS       │  │   Database      │
    │   (Node.js)     │  │   (Python)      │  │   (Optional)    │
    │     :8083       │  │     :8082       │  │                 │
    └─────────────────┘  └─────────────────┘  └─────────────────┘
```

## 🚀 빠른 시작

### 필수 요구사항

- **Docker Desktop** (실행 중이어야 함)
- **Node.js** 18+ 
- **Python** 3.8+
- **Java** 17+ (Spring Boot용)
- **Expo CLI** (모바일 개발용)

### 원클릭 실행

```bash
# 모든 서비스 동시 실행
./run_all_dev.cmd

# 또는 Voice Proxy만 빠르게 실행
./quick_voice_proxy.cmd

# 서버 상태 확인
./check_servers.cmd
```

### 개별 서비스 실행

```bash
# 1. Spring Boot 인증 서버 (선택사항)
cd finalLogin/user && gradlew bootRun

# 2. Python STT/TTS 서버 (선택사항)
cd MergeStts && python web_server.py

# 3. Node.js Agent 백엔드 (필수)
cd finalteam/test2agent/server && npm run dev

# 4. Voice Proxy 서버 (필수)
cd finalteam/test2agent/server && npm run voice-proxy

# 5. React 웹 클라이언트 (선택사항)
cd finalteam/test2agent/client && npm run dev

# 6. React Native 모바일 (필수)
cd finalteam/native && npm run expo:clear
```

## 🔧 개발 환경 설정

### 초기 설정

```bash
# 저장소 클론
git clone https://github.com/[USERNAME]/Arion.git
cd Arion

# 의존성 설치
./setup_dependencies.cmd

# 환경 변수 설정
cp .env.example .env
# .env 파일을 편집하여 필요한 설정 추가
```

### 문제 해결

```bash
# Metro/Expo 에러 해결
./quick_metro_fix.cmd        # 빠른 수정 (1분)
./fix_metro_expo.cmd         # 완전 복구 (5분)
./complete_expo_fix.cmd      # 완전 수정 및 테스트

# 백엔드 의존성 문제
./fix_backend_dependencies.cmd

# Phase 2 안전한 업그레이드
./safe_agentica_upgrade.cmd
./test_after_upgrade.cmd
```

## 📚 주요 기능

### 🎤 음성 처리
- **실시간 STT**: 음성을 텍스트로 변환
- **자연스러운 TTS**: 텍스트를 음성으로 합성
- **음성 스트리밍**: 낮은 지연시간의 음성 전송

### 🤖 AI 에이전트
- **자연어 이해**: 사용자 의도 파악
- **컨텍스트 관리**: 대화 맥락 유지
- **다중 모드**: 텍스트/음성 동시 지원

### 🔐 보안
- **JWT 인증**: 안전한 사용자 인증
- **세션 관리**: 상태 기반 보안
- **API 보호**: 인증된 요청만 처리

### 📱 크로스 플랫폼
- **React Native**: iOS/Android 네이티브 앱
- **React Web**: 브라우저 기반 웹 앱
- **반응형 디자인**: 모든 디바이스 지원

## 🛠️ 기술 스택

### 백엔드
- **Spring Boot** - 인증 및 보안
- **Node.js** - 실시간 통신 및 에이전트 로직
- **Python FastAPI** - AI/ML 서비스
- **WebSocket** - 실시간 양방향 통신

### 프론트엔드
- **React Native** - 모바일 네이티브 앱
- **React** - 웹 클라이언트
- **TypeScript** - 타입 안전성
- **Expo** - 모바일 개발 도구

### DevOps
- **Docker** - 컨테이너화
- **Docker Compose** - 서비스 오케스트레이션
- **Nginx** - 리버스 프록시 및 로드 밸런싱

## 📖 API 문서

자세한 API 문서는 [API_SPECIFICATION.md](./API_SPECIFICATION.md)를 참조하세요.

### 주요 엔드포인트

```
POST /auth/login          # 사용자 로그인
POST /auth/register       # 사용자 등록
POST /stt/process         # 음성-텍스트 변환
POST /tts/synthesize      # 텍스트-음성 변환
WebSocket /agent          # AI 에이전트 통신
```

## 🧪 테스트

### 유닛 테스트
```bash
# 백엔드 테스트
cd finalteam/test2agent/server && npm test

# 프론트엔드 테스트  
cd finalteam/test2agent/client && npm test

# Python 서비스 테스트
cd MergeStts && python -m pytest
```

### 통합 테스트
```bash
# 전체 시스템 테스트
./test_backend_mobile.cmd

# Voice API 테스트
./test_voice_api.cmd

# OpenAI 통합 테스트
./test_openai_integration.cmd
```

## 🚀 배포

### Docker 배포
```bash
# 개발 환경
docker-compose -f docker-compose.dev.yml up

# 프로덕션 환경
docker-compose up --build
```

### 수동 배포
각 서비스별로 독립적인 배포가 가능합니다. 자세한 내용은 각 서비스 디렉토리의 README를 참조하세요.

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.

## 👥 팀

오픈소스 개발자 대회 출품팀

## 🆘 지원

- **문제 해결**: [EXPO_SUCCESS_GUIDE.md](./EXPO_SUCCESS_GUIDE.md)
- **기능 요구사항**: [FUNCTIONAL_REQUIREMENTS.md](./FUNCTIONAL_REQUIREMENTS.md)
- **이슈 신고**: GitHub Issues
- **토론**: GitHub Discussions

---

⭐ **Star this repository if you find it helpful!** 