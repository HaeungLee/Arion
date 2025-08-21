import React, { useState, useCallback, useEffect, useRef } from 'react';
import { voiceApiService, formatDuration } from '../../utils/voiceApi';

interface VoiceButtonProps {
  onVoiceInput: (text: string) => void;
  disabled?: boolean;
  className?: string;
  defaultDuration?: number;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({ 
  onVoiceInput, 
  disabled = false,
  className = "",
  defaultDuration = 15.0
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [duration] = useState(defaultDuration);
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [isSTTEnabled, setIsSTTEnabled] = useState(true);
  
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 컴포넌트 마운트 시 서버 상태 확인
  useEffect(() => {
    checkServerHealth();
  }, []);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  const checkServerHealth = async () => {
    try {
      const healthy = await voiceApiService.checkHealth();
      setIsHealthy(healthy);
    } catch (error) {
      setIsHealthy(false);
    }
  };

  const startCountdown = useCallback((durationSeconds: number) => {
    setCountdown(durationSeconds);
    
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const stopCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdown(null);
  }, []);

  // 더블 클릭 핸들러
  const handleClick = useCallback(() => {
    if (disabled) return;
    
    setClickCount(prev => prev + 1);
    
    // 클리어 이전 타임아웃
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    // 300ms 내에 두 번째 클릭 체크
    clickTimeoutRef.current = setTimeout(() => {
      if (clickCount === 0) {
        // 첫 번째 클릭 - 음성 인식 시작
        if (isSTTEnabled) {
          handleVoiceInput();
        }
      } else if (clickCount === 1) {
        // 두 번째 클릭 - STT 토글
        setIsSTTEnabled(!isSTTEnabled);
        setError(isSTTEnabled ? 'STT가 비활성화되었습니다' : 'STT가 활성화되었습니다');
        setTimeout(() => setError(null), 2000);
      }
      setClickCount(0);
    }, 300);
  }, [disabled, clickCount, isSTTEnabled]);

  const handleVoiceInput = useCallback(async () => {
    if (disabled || isRecording || !isSTTEnabled) return;
    
    setIsRecording(true);
    setError(null);
    startCountdown(duration);
    
    try {
      // FastAPI 서버로 음성 명령 처리 요청
      const text = await voiceApiService.processVoiceCommand(duration);
      
      if (text.trim()) {
        // 채팅 입력창에 텍스트 삽입
        onVoiceInput(text);
      } else {
        setError('음성이 인식되지 않았습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Voice input error:', error);
      setError(error instanceof Error ? error.message : '음성 인식 중 오류가 발생했습니다.');
      
      // 서버 연결 문제일 수 있으므로 health check
      if (error instanceof Error && error.message.includes('fetch')) {
        setIsHealthy(false);
      }
    } finally {
      stopCountdown();
      setIsRecording(false);
    }
  }, [disabled, isRecording, duration, onVoiceInput, startCountdown, stopCountdown, isSTTEnabled]);

  const getButtonStatus = () => {
    if (isRecording) return 'recording';
    if (disabled) return 'disabled';
    if (isHealthy === false) return 'offline';
    if (!isSTTEnabled) return 'stt-disabled';
    return 'ready';
  };

  const getMicrophoneIcon = () => {
    const status = getButtonStatus();
    
    if (status === 'recording') {
      return (
        <div className="relative">
          <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </div>
      );
    }
    
    if (status === 'offline') {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A7.001 7.001 0 0019 8a1 1 0 10-2 0 5 5 0 01-.5 2.025L15.025 8.55A3 3 0 0013 5.5V4a3 3 0 10-6 0v1.293L3.707 2.293zM10 11.93A7.001 7.001 0 004.07 8.5L7 5.573V8a3 3 0 003 3v.93zm1-2.43A1.5 1.5 0 009.5 8V7a1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5v1.5z" clipRule="evenodd" />
        </svg>
      );
    }
    
    if (status === 'stt-disabled') {
      return (
        <div className="relative">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-0.5 bg-red-500 rotate-45 rounded-full" />
          </div>
        </div>
      );
    }
    
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
      </svg>
    );
  };

  const getButtonClassName = () => {
    const status = getButtonStatus();
    const baseClasses = "w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800";
    
    switch (status) {
      case 'recording':
        return `${baseClasses} bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20 focus:ring-red-400/50 scale-110 animate-pulse`;
      case 'offline':
        return `${baseClasses} bg-gray-700/60 text-gray-400 cursor-not-allowed focus:ring-gray-500/50 shadow-md shadow-gray-700/30`;
      case 'disabled':
        return `${baseClasses} bg-gray-700/30 text-gray-500 opacity-50 cursor-not-allowed focus:ring-gray-500/30`;
      case 'stt-disabled':
        return `${baseClasses} bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25 focus:ring-yellow-400/30 border border-yellow-500/20 shadow-md shadow-yellow-500/10`;
      default:
        return `${baseClasses} bg-gray-700/80 hover:bg-gray-600/80 text-gray-300 hover:text-white shadow-md shadow-gray-700/30 focus:ring-gray-500/50 hover:scale-105 active:scale-95 border border-gray-600/30`;
    }
  };

  const getButtonTitle = () => {
    const status = getButtonStatus();
    
    switch (status) {
      case 'recording':
        return `음성 녹음 중... (${countdown}초 남음)`;
      case 'offline':
        return '음성 서버에 연결할 수 없습니다. 다시 시도해주세요.';
      case 'disabled':
        return '음성 기능이 비활성화되었습니다.';
      case 'stt-disabled':
        return 'STT가 비활성화됨 - 더블클릭으로 활성화';
      default:
        return `클릭: 음성 인식 | 더블클릭: STT 토글 (${formatDuration(duration)})`;
    }
  };

  return (
    <div className={`voice-button-container flex items-center gap-2 relative ${className}`}>
      {/* 메인 마이크 버튼 */}
      <button 
        onClick={handleClick}
        disabled={disabled || isRecording || isHealthy === false}
        className={getButtonClassName()}
        title={getButtonTitle()}
      >
        {getMicrophoneIcon()}
      </button>

      {/* 카운트다운 표시 */}
      {isRecording && countdown !== null && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500/90 text-white text-xs px-2 py-1 rounded-md font-mono">
          {countdown}s
        </div>
      )}

      {/* 서버 상태 재확인 버튼 */}
      {isHealthy === false && (
        <button
          onClick={checkServerHealth}
          className="w-8 h-8 rounded-full bg-gray-700/60 hover:bg-gray-600/80 text-gray-400 hover:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50 flex items-center justify-center border border-gray-600/30"
          title="음성 서버 연결 상태 다시 확인"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      
      {/* 에러/상태 메시지 */}
      {error && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-900/95 text-white text-xs rounded-lg max-w-xs z-20 shadow-lg border border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⚠️</span>
            <div>{error}</div>
            <button
              onClick={() => setError(null)}
              className="text-gray-400 hover:text-white text-xs ml-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};