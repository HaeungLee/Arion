import { useState, useEffect } from 'react';
import { FiWifi, FiWifiOff, FiServer, FiAlertCircle } from 'react-icons/fi';
import { getConfig } from '../../utils/config';

interface ServiceStatus {
  name: string;
  url: string;
  port: number;
  status: 'connected' | 'disconnected' | 'checking';
  error?: string;
}

export function ConnectionStatus() {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const config = getConfig();

  const checkServiceHealth = async (service: ServiceStatus): Promise<ServiceStatus> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      let healthUrl = '';
      if (service.port === 8080) {
        healthUrl = `${service.url}/actuator/health`; // Spring Boot health
      } else if (service.port === 8082) {
        healthUrl = `${service.url}/api/health`; // Python FastAPI health
      } else if (service.port === 8083) {
        healthUrl = `${service.url}/health`; // Voice Proxy health
      } else if (service.port === 8081) {
        // WebSocket은 직접 연결 테스트
        return new Promise((resolve) => {
          const ws = new WebSocket(service.url);
          const timeout = setTimeout(() => {
            if (ws.readyState === WebSocket.CONNECTING) {
              ws.close();
            }
            resolve({ ...service, status: 'disconnected', error: 'WebSocket connection timeout' });
          }, 3000);

          ws.onopen = () => {
            clearTimeout(timeout);
            ws.close();
            resolve({ ...service, status: 'connected' });
          };

          ws.onerror = (event) => {
            clearTimeout(timeout);
            console.error('WebSocket connection to', service.url, 'failed:', event);
            resolve({ 
              ...service, 
              status: 'disconnected', 
              error: '🚀 Agent 서버(8081) 미실행 - npm start 필요' 
            });
          };

          ws.onclose = (event) => {
            if (event.code === 1006) {
              // 1006: 연결이 비정상적으로 종료됨 (서버 미실행)
              clearTimeout(timeout);
              resolve({ 
                ...service, 
                status: 'disconnected', 
                error: '🚀 Agent 서버(8081) 미실행 - npm start 필요' 
              });
            }
          };
        });
      }

      const response = await fetch(healthUrl, {
        signal: controller.signal,
        method: 'GET',
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return { ...service, status: 'connected' };
      } else {
        return { 
          ...service, 
          status: 'disconnected', 
          error: `HTTP ${response.status}` 
        };
      }
    } catch (error) {
      return { 
        ...service, 
        status: 'disconnected', 
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const checkAllServices = async () => {
    const serviceList: ServiceStatus[] = [
      { name: 'Spring Security', url: config.SPRING_API_URL, port: 8080, status: 'checking' },
      { name: 'Agent WebSocket', url: config.WEBSOCKET_URL, port: 8081, status: 'checking' },
      { name: 'STT/TTS Server', url: config.PYTHON_VOICE_URL, port: 8082, status: 'checking' },
      { name: 'Voice Proxy', url: config.VOICE_PROXY_URL, port: 8083, status: 'checking' },
    ];

    setServices(serviceList);

    const results = await Promise.all(
      serviceList.map(service => checkServiceHealth(service))
    );

    setServices(results);
  };

  useEffect(() => {
    checkAllServices();
    
    // 개발 환경에서만 자동 갱신
    if (import.meta.env.DEV) {
      const interval = setInterval(checkAllServices, 10000); // 10초마다
      return () => clearInterval(interval);
    }
  }, []);

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'connected':
        return <FiWifi className="text-green-500" size={16} />;
      case 'disconnected':
        return <FiWifiOff className="text-red-500" size={16} />;
      case 'checking':
        return <FiServer className="text-yellow-500 animate-pulse" size={16} />;
    }
  };

  const connectedCount = services.filter(s => s.status === 'connected').length;
  const hasErrors = services.some(s => s.status === 'disconnected');

  // 개발 환경이 아니거나 에러가 없으면 표시하지 않음
  if (!import.meta.env.DEV || (!hasErrors && connectedCount === services.length)) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 상태 요약 버튼 */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`mb-2 px-3 py-2 rounded-lg shadow-lg transition-all ${
          hasErrors 
            ? 'bg-red-500/90 text-white' 
            : 'bg-green-500/90 text-white'
        } hover:scale-105`}
      >
        <div className="flex items-center gap-2">
          {hasErrors ? <FiAlertCircle size={16} /> : <FiWifi size={16} />}
          <span className="text-sm font-medium">
            {connectedCount}/{services.length} Services
          </span>
        </div>
      </button>

      {/* 상세 상태 패널 */}
      {isVisible && (
        <div className="bg-gray-900/95 backdrop-blur-sm text-white rounded-lg shadow-xl p-4 min-w-[300px] border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Service Status</h3>
            <button
              onClick={checkAllServices}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Refresh
            </button>
          </div>

          <div className="space-y-2">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-2 rounded bg-gray-800/50"
              >
                <div className="flex items-center gap-2">
                  {getStatusIcon(service.status)}
                  <span className="text-sm">{service.name}</span>
                  <span className="text-xs text-gray-500">:{service.port}</span>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-medium ${
                    service.status === 'connected' ? 'text-green-400' :
                    service.status === 'disconnected' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {service.status === 'connected' ? 'Connected' :
                     service.status === 'disconnected' ? 'Disconnected' :
                     'Checking...'}
                  </div>
                  {service.error && (
                    <div className="text-xs text-red-300 max-w-[150px] truncate">
                      {service.error}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {hasErrors && (
            <div className="mt-3 p-2 bg-yellow-900/30 border border-yellow-700/50 rounded text-xs">
              <div className="flex items-center gap-1 text-yellow-400 mb-1">
                <FiAlertCircle size={12} />
                <span className="font-medium">개발 환경 안내</span>
              </div>
              <div className="text-gray-300">
                일부 서비스가 실행되지 않았습니다. 
                <br />터미널에서 각 서버를 실행해주세요.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
