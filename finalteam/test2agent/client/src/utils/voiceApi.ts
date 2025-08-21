import { getConfig } from './config';
import type {
  VoiceResponse,
  RecordRequest,
  TTSRequest,
  VoiceCommandRequest,
  DurationPreset,
  DurationPresetsResponse,
  ServiceInfo,
  HealthResponse
} from '../types/api';

const config = getConfig();

class VoiceApiService {
  private baseURL: string;
  private timeout: number = 40000; // 40초 타임아웃 (STT 처리 시간 고려)

  constructor() {
    this.baseURL = config.VOICE_PROXY_URL;
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('요청 시간이 초과되었습니다. 다시 시도해주세요.');
      }
      throw error;
    }
  }

  // 🎤 음성 녹음 + STT - Voice Proxy 통해 API 호출
  async recordAndTranscribe(duration: number = 15.0): Promise<string> {
    try {
      const data = await this.makeRequest<VoiceResponse>('/api/record-and-transcribe', {
        method: 'POST',
        body: JSON.stringify({ duration } as RecordRequest),
      });
      
      if (data.success && data.text) {
        return data.text;
      } else {
        throw new Error(data.error || '음성 인식에 실패했습니다.');
      }
    } catch (error) {
      console.error('STT Error:', error);
      throw new Error(`음성 인식 실패: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // 🔊 TTS 음성 출력 - Voice Proxy 통해 API 호출
  async textToSpeech(text: string, voiceId?: string): Promise<boolean> {
    try {
      const requestBody = voiceId ? { text, voice_id: voiceId } : { text };
      const data = await this.makeRequest<VoiceResponse>('/api/text-to-speech', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      
      return data.success;
    } catch (error) {
      console.error('TTS Error:', error);
      throw new Error(`음성 출력 실패: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // 🎯 통합 음성 명령 (STT + Agent + TTS) - Voice Proxy 통해 API 호출
  async processVoiceCommand(duration: number = 15.0, speakResponse: boolean = true, voiceId?: string): Promise<{text: string, agentResponse?: string}> {
    try {
      const requestBody = {
        duration,
        speak_response: speakResponse,
        ...(voiceId && { voice_id: voiceId })
      };
      
      const data = await this.makeRequest<VoiceResponse & {agent_response?: string}>('/api/voice-command', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      
      if (data.success && data.text) {
        return {
          text: data.text,
          agentResponse: data.agent_response
        };
      } else {
        throw new Error(data.error || '음성 명령 처리 실패');
      }
    } catch (error) {
      console.error('Voice Command Error:', error);
      throw new Error(`음성 명령 실패: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // ⚙️ Duration 프리셋 가져오기 - Voice Proxy 통해 API 호출
  async getDurationPresets(): Promise<DurationPresetsResponse> {
    try {
      return await this.makeRequest<DurationPresetsResponse>('/api/duration-presets', {
        method: 'GET',
      });
    } catch (error) {
      console.error('Duration Presets Error:', error);
      // 기본값 반환
      return {
        presets: [
          { name: "빠른 명령", duration: 10.0, description: "간단한 명령어용" },
          { name: "일반 명령", duration: 15.0, description: "대부분의 명령어 (권장)" },
          { name: "긴 명령", duration: 30.0, description: "복잡한 명령어나 긴 텍스트" }
        ],
        recommended: 15.0,
        performance_info: {
          base_model: "whisper-base",
          processing_time: {
            "15_seconds": "3-7초",
            "30_seconds": "5-10초"
          }
        }
      };
    }
  }

  // 📋 서비스 정보 조회
  async getServiceInfo(): Promise<ServiceInfo> {
    try {
      return await this.makeRequest<ServiceInfo>('/api/service-info', {
        method: 'GET',
      });
    } catch (error) {
      console.error('Service Info Error:', error);
      throw new Error(`서비스 정보 조회 실패: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // 🎵 사용 가능한 음성 목록 조회
  async getAvailableVoices(): Promise<unknown[]> {
    try {
      return await this.makeRequest<unknown[]>('/api/voices', {
        method: 'GET',
      });
    } catch (error) {
      console.error('Voices List Error:', error);
      throw new Error(`음성 목록 조회 실패: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // ⚕️ 서버 상태 확인
  async checkHealth(): Promise<boolean> {
    try {
      const data = await this.makeRequest<HealthResponse>('/health', {
        method: 'GET',
      });
      return data.status === 'healthy' || data.status === 'degraded';
    } catch (error) {
      console.error('Voice Service Health Check Failed:', error);
      return false;
    }
  }

  // 🔧 설정 메서드
  setTimeout(timeout: number) {
    this.timeout = timeout;
  }

  getTimeout(): number {
    return this.timeout;
  }

  getBaseURL(): string {
    return this.baseURL;
  }
}

// 싱글톤 인스턴스
export const voiceApiService = new VoiceApiService();

// 유틸리티 함수들
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}초`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0 ? `${minutes}분 ${remainingSeconds}초` : `${minutes}분`;
};

export const validateDuration = (duration: number): boolean => {
  return duration >= 5.0 && duration <= 30.0;
}; 