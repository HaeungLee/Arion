interface ChatStatusProps {
  isError: boolean;
  isConnected: boolean;
  hasMessages: boolean;
  onRetryConnect: () => void;
  isWsUrlConfigured: boolean;
}

export function ChatStatus({
  isError,
  isConnected,
  hasMessages,
  onRetryConnect,
  isWsUrlConfigured
}: ChatStatusProps) {
  if (!isWsUrlConfigured) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="text-yellow-400 text-sm">
          VITE_AGENTICA_WS_URL is not configured
        </div>
        <div className="text-gray-400 text-sm">
          Please set the VITE_AGENTICA_WS_URL environment variable
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="text-center">
          <div className="text-red-400 text-sm mb-2">
            ❌ AI Agent 서버 연결 실패
          </div>
          <div className="text-gray-400 text-xs">
            Agent 서버(8081)가 실행되지 않았습니다
          </div>
        </div>
        
        {/* 개발 환경에서만 간단한 안내 표시 */}
        {import.meta.env.DEV && (
          <div className="text-gray-400 text-xs text-center">
            Agent 서버(8081)를 실행한 후 재연결하세요
          </div>
        )}
        
        <button
          onClick={onRetryConnect}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          🔄 재연결 시도
        </button>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="text-blue-400">
          <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-2"></div>
          <div className="text-sm">AI Agent 서버 연결 중...</div>
        </div>
        <div className="text-gray-400 text-xs">
          ws://localhost:8081에 연결하는 중입니다
        </div>
      </div>
    );
  }

  if (!hasMessages) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        Start a conversation by sending a message...
      </div>
    );
  }

  return null;
}
