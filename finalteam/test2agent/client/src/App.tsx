import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Chat } from "./components/chat/Chat";
import { Home } from "./components/home/Home";
import { AgenticaRpcProvider } from "./provider/AgenticaRpcProvider";
import { AuthProvider } from "./store/authStore";
import { NavigationProvider, useNavigationState } from "./store/navigationStore";
import { Header } from "./components/layout/Header";
import { LoginModal } from "./components/auth/LoginModal";
import Navigation from "./components/layout/Navigation";
import { ConnectionStatus } from "./components/debug/ConnectionStatus";

function AppContent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const navState = useNavigationState();

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const isChatPage = location.pathname === '/chat';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Navigation - 모든 페이지에서 표시 */}
      <Navigation />

      {/* Header - 홈 페이지에서만 표시 */}
      {!isChatPage && <Header onLoginClick={handleLoginClick} />}

      {/* 메인 컨텐츠 영역 */}
      <div className={`transition-all duration-300 ${
        isChatPage 
          ? `${navState.isOpen ? 'ml-64' : 'ml-16'}` 
          : `pt-16 min-h-screen ${navState.isOpen ? 'ml-64' : 'ml-16'}`
      }`}>
        <main className={isChatPage ? "h-screen" : "h-[calc(100vh-4rem)] overflow-auto"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
      
      {/* 개발 환경 연결 상태 표시 (개발환경에서만) */}
      <ConnectionStatus />
    </div>
  );
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AuthProvider>
        <NavigationProvider>
          <AgenticaRpcProvider>
            <AppContent />
          </AgenticaRpcProvider>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
