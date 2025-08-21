import { useNavigate } from "react-router-dom";
import { ChatInput } from "../chat/ChatInput";
import agenticaLogo from "../../images/agentica.png";

export function Home() {
  const navigate = useNavigate();

  const handleSendMessage = (message: string, options?: { autoTTS?: boolean; detailMode?: boolean }) => {
    if (message.trim()) {
      navigate("/chat", { state: { initialMessage: message, ...options } });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-8 min-w-0 relative">
      {/* 중앙 로고 및 컨텐츠 */}
  <div className="flex flex-col items-center space-y-6">
        {/* 로고 크기 조정 (헤더 공간 고려) */}
        <div className="flex flex-col items-center">
          <img 
            src={agenticaLogo} 
            alt="Agentica Logo" 
    className="h-100 w-auto object-contain max-w-full drop-shadow-2xl"
          />
        </div>
        
        {/* 질문 텍스트 */}
        <p className="text-2xl font-medium text-white/90 text-center">무엇을 도와드릴까요?</p>
    <div className="w-[250%] mt-8 px-4">
          <ChatInput 
            onSendMessage={handleSendMessage}
            disabled={false}
            autoFocus
          />
        </div>
      </div>
      
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
