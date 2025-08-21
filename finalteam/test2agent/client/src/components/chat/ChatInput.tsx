import { useState, KeyboardEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { VoiceButton } from "./VoiceButton";

interface ChatInputProps {
  onSendMessage: (content: string, options?: { autoTTS?: boolean; detailMode?: boolean }) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function ChatInput({ onSendMessage, disabled, autoFocus = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [autoTTS, setAutoTTS] = useState(false);
  const [detailMode, setDetailMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;
    
    // Auto TTS와 Detail 모드 옵션과 함께 메시지 전송
    onSendMessage(message, { autoTTS, detailMode });
    setMessage("");
    textareaRef.current?.focus();
    
    // Navigate to chat screen if not already there
    if (window.location.pathname !== '/chat') {
      navigate('/chat');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      e.nativeEvent.isComposing === false
    ) {
      e.preventDefault();
      if (!disabled) {
        handleSubmit(e);
      }
    }
  };

  const handleVoiceInput = (text: string) => {
    setMessage(text);
  };

  return (
    <div className="space-y-3">
      {/* 메인 입력 영역 */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div 
          className="flex-1 relative"
          onClick={(e) => {
            e.stopPropagation();
            textareaRef.current?.focus();
          }}
        >
          <div className="relative">
                        {/* 음성 입력 버튼 - 왼쪽 배치 */}
            <div className="absolute left-3 bottom-3">
              <VoiceButton
                onVoiceInput={handleVoiceInput}
                disabled={disabled}
                className="scale-90"
              />
            </div>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setMessage(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              placeholder="메시지를 입력하세요..."
              className="w-full min-h-[60px] max-h-[120px] p-4 pl-16 pr-16 bg-gray-800/40 text-gray-100 placeholder:text-gray-400 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/30 cursor-text select-text text-lg"
              autoFocus={autoFocus}
            />

            {/* 전송 버튼 */}
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className={`absolute right-3 bottom-3 p-2.5 rounded-xl transition-all duration-200 ${
                message.trim() && !disabled
                  ? "text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 cursor-pointer"
                  : "text-gray-600"
              }`}
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-5 h-5"
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
              </svg>
            </button>
          </div>
        </div>
      </form>

      {/* 깔끔한 토글 버튼들 */}
      <div className="flex justify-between items-center px-2 mt-3">
        {/* 왼쪽: Auto TTS 토글 - 더 깔끔한 디자인 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoTTS(!autoTTS)}
            className={`group flex items-center gap-2.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              autoTTS
                ? 'bg-gradient-to-r from-green-500/25 to-emerald-500/25 text-green-300 shadow-md shadow-green-500/20 border border-green-400/40'
                : 'bg-gray-800/40 backdrop-blur-sm text-gray-400 hover:text-gray-300 hover:bg-gray-700/40 border border-gray-600/30'
            }`}
          >
            <div className={`p-1.5 rounded-full transition-all duration-300 ${
              autoTTS 
                ? 'bg-green-400/20 text-green-300' 
                : 'bg-gray-600/50 text-gray-400 group-hover:bg-gray-500/50'
            }`}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.846l3.537-2.816z" />
                <path d="M12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" />
              </svg>
            </div>
            <span className="font-medium">Auto TTS</span>
            <div className={`w-10 h-5 rounded-full transition-all duration-300 relative ${
              autoTTS ? 'bg-green-400' : 'bg-gray-600'
            }`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 transform absolute top-0.5 ${
                autoTTS ? 'translate-x-5' : 'translate-x-0.5'
              }`} />
            </div>
          </button>
        </div>

        {/* 오른쪽: Detail 모드 토글 - 더 깔끔한 디자인 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDetailMode(!detailMode)}
            className={`group flex items-center gap-2.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              detailMode
                ? 'bg-gradient-to-r from-blue-500/25 to-cyan-500/25 text-blue-300 shadow-md shadow-blue-500/20 border border-blue-400/40'
                : 'bg-gray-800/40 backdrop-blur-sm text-gray-400 hover:text-gray-300 hover:bg-gray-700/40 border border-gray-600/30'
            }`}
          >
            <div className={`p-1.5 rounded-full transition-all duration-300 ${
              detailMode 
                ? 'bg-blue-400/20 text-blue-300' 
                : 'bg-gray-600/50 text-gray-400 group-hover:bg-gray-500/50'
            }`}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium">Detail</span>
            <div className={`w-10 h-5 rounded-full transition-all duration-300 relative ${
              detailMode ? 'bg-blue-400' : 'bg-gray-600'
            }`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 transform absolute top-0.5 ${
                detailMode ? 'translate-x-5' : 'translate-x-0.5'
              }`} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
