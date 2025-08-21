import agenticaLogo from "/agentica.svg";
import { FiChevronLeft, FiMenu, FiHome, FiMessageCircle, FiSettings, FiUser } from 'react-icons/fi';
import { useNavigate, useLocation } from "react-router-dom";
import { useNavigation, useNavigationActions } from "../../store/navigationStore";
import { useAuth } from "../../store/authStore";

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useNavigation();
  const { toggleNavigation } = useNavigationActions();
  const { state: authState } = useAuth();
  
  const toggleSidebar = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNavigation();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Navigation */}
      <div className="relative">
        <nav 
          className={`fixed top-0 left-0 h-screen bg-gray-900/95 backdrop-blur-sm text-white overflow-y-auto border-r border-gray-700/50 z-40 transform transition-all duration-300 ease-in-out
                    ${state.isOpen ? 'w-64 translate-x-0' : 'w-16 translate-x-0'}`}
        >
          <div className="p-4 space-y-6">
            {/* 로고/제목 및 토글 버튼 */}
            <div className="flex items-center justify-between">
              <div 
                className="flex items-center cursor-pointer group"
                onClick={() => navigate('/')}
              >
                <img
                  src={agenticaLogo}
                  alt="Agentica logo"
                  className="w-8 h-8 transition-all group-hover:scale-110 group-hover:drop-shadow-[0_0_1rem_rgba(59,130,246,0.5)]"
                />
                {state.isOpen && (
                  <h1 className="text-xl font-semibold text-white ml-3 transition-all duration-300">
                    AriOn
                  </h1>
                )}
              </div>
              
              {/* 토글 버튼 - 항상 표시 */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSidebar(e);
                }}
                className={`p-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200 text-gray-400 hover:text-white ${!state.isOpen ? 'ml-auto' : ''}`}
                aria-label={state.isOpen ? "Close navigation" : "Open navigation"}
              >
                {state.isOpen ? <FiChevronLeft size={20} /> : <FiMenu size={20} />}
              </button>
            </div>

            {/* 메뉴 아이템들 */}
            <div className="space-y-2 pt-4">
              {/* 홈 */}
              <button
                onClick={() => navigate('/')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                  isActive('/') 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                title={!state.isOpen ? '홈' : ''}
              >
                <FiHome className={`text-xl ${isActive('/') ? 'text-blue-300' : 'text-gray-400 group-hover:text-white'} transition-colors`} />
                {state.isOpen && (
                  <span className="font-medium transition-all duration-300">홈</span>
                )}
              </button>

              {/* 채팅 */}
              <button
                onClick={() => navigate('/chat')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                  isActive('/chat') 
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                title={!state.isOpen ? '채팅' : ''}
              >
                <FiMessageCircle className={`text-xl ${isActive('/chat') ? 'text-green-300' : 'text-gray-400 group-hover:text-white'} transition-colors`} />
                {state.isOpen && (
                  <span className="font-medium transition-all duration-300">채팅</span>
                )}
              </button>
            </div>

            {/* 사용자 정보 섹션 - 로그인 시에만 표시 */}
            {authState.isAuthenticated && state.isOpen && (
              <div className="border-t border-gray-700/50 pt-4 mt-auto">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {authState.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {authState.user?.name || '사용자'}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {authState.user?.email}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;