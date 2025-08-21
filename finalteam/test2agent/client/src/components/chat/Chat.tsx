import { useAgenticaRpc } from "../../provider/AgenticaRpcProvider";
import { ChatMessages } from "./ChatMessages";
import { ChatStatus } from "./ChatStatus";
import { ChatInput } from "./ChatInput";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function Chat() {
  const { messages, isConnected, isError, tryConnect, conversate } = useAgenticaRpc();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const hasMessage = messages.length > 0;

  // Handle initial message from home page
  useEffect(() => {
    const state = location.state as { initialMessage?: string; autoTTS?: boolean; detailMode?: boolean } | null;
    if (state?.initialMessage && isConnected) {
      // 연결된 상태에서만 메시지 전송
      conversate(state.initialMessage, { autoTTS: state.autoTTS, detailMode: state.detailMode })
        .catch(error => {
          console.error('Initial message send failed:', error);
        });
      // Clear the state to prevent resending on re-renders
      window.history.replaceState({}, '');
    }
  }, [location.state, conversate, isConnected]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900 overflow-hidden">
      {/* 메인 채팅 영역 - 레이아웃 문제 해결 */}
      <div className={`flex flex-col h-screen transition-all duration-300`}>
        <div className="flex-1 min-h-0 flex flex-col">
          {/* 채팅 메시지 영역 */}
          <div className="flex-1 min-h-0 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-600/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
            <div
              ref={messagesContainerRef}
              className="space-y-6 max-w-4xl mx-auto"
            >
              {hasMessage ? (
                <ChatMessages messages={messages} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  {/* 로딩 애니메이션 */}
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* 웰컴 메시지 */}
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-200">무엇을 도와드릴까요?</h2>
                    <p className="text-gray-400 max-w-md">
                      음성 또는 텍스트로 질문해주세요. AI가 다양한 서비스와 연동하여 도움을 드립니다.
                    </p>
                  </div>
                  
                  {/* 예시 질문들 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mt-8">
                    {[
                      "📧 Gmail 확인하기",
                      "📅 일정 관리하기", 
                      "🔍 정보 검색하기",
                      "📋 문서 작성 도움"
                    ].map((example, idx) => (
                      <button
                        key={idx}
                        onClick={() => conversate(example)}
                        className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 text-left group"
                      >
                        <span className="text-gray-300 group-hover:text-gray-200 font-medium">
                          {example}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pb-4">
                <ChatStatus
                  isError={isError}
                  isConnected={isConnected}
                  hasMessages={hasMessage}
                  onRetryConnect={tryConnect}
                  isWsUrlConfigured={import.meta.env.VITE_AGENTICA_WS_URL !== ""}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* 채팅 입력 영역 - 더 깔끔한 배경 */}
        <div className="border-t border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto p-4 px-8">
            <ChatInput 
              onSendMessage={conversate} 
              disabled={!isConnected} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
