// API 공통 응답 타입
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

// 인증 관련 타입
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  verificationCode: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  authProvider: 'LOCAL' | 'GOOGLE' | 'NAVER' | 'KAKAO';
  createdAt: string;
  updatedAt: string;
}

// 음성 API 관련 타입
export interface VoiceResponse {
  success: boolean;
  text?: string;
  agent_response?: string;
  duration?: number;
  processing_time?: number;
  message?: string;
  error?: string;
  timestamp?: string;
}

export interface RecordRequest {
  duration: number;
}

export interface TTSRequest {
  text: string;
  voice_id?: string;
}

export interface VoiceCommandRequest {
  duration: number;
  speak_response?: boolean;
  voice_id?: string;
}

export interface DurationPreset {
  name: string;
  duration: number;
  description: string;
}

export interface DurationPresetsResponse {
  presets: DurationPreset[];
  recommended: number;
  performance_info: {
    base_model: string;
    processing_time: Record<string, string>;
  };
}

export interface ServiceInfo {
  service_name: string;
  version: string;
  description: string;
  features: {
    stt: {
      enabled: boolean;
      model: string;
      languages: string[];
    };
    tts: {
      enabled: boolean;
      provider: string;
      voices_available: number;
    };
  };
  performance: {
    max_audio_duration: number;
    average_processing_time: string;
    supported_formats: string[];
  };
}

export interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  service: string;
  version?: string;
  docs_url?: string;
  whisper_model?: string;
}

// Agentica 메시지 타입
export interface AgenticaMessage {
  id: string;
  type: 'userMessage' | 'assistantMessage';
  content: string;
  timestamp: string;
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// WebSocket RPC 타입
export interface RpcRequest {
  method: string;
  params: Record<string, unknown>;
  id: string;
}

export interface RpcResponse<T = unknown> {
  id: string;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

// 에러 타입
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

// 유틸리티 타입
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// 환경 설정 타입
export interface Config {
  SPRING_API_URL: string;
  NODE_API_URL: string;
  PYTHON_VOICE_URL: string;
  VOICE_PROXY_URL: string;
  WEBSOCKET_URL: string;
}

// 네비게이션 타입
export interface NavigationItem {
  id: string;
  path: string;
  label: string;
  icon: React.ComponentType;
  active: boolean;
  badge?: string | number;
}

// 컴포넌트 Props 타입
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends ComponentProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

// 성능 모니터링 타입
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  threshold?: number;
}

export interface SystemStatus {
  overall: 'healthy' | 'degraded' | 'down';
  services: {
    auth: HealthResponse;
    voice: HealthResponse;
    agent: HealthResponse;
  };
  uptime: number;
  lastChecked: string;
}
