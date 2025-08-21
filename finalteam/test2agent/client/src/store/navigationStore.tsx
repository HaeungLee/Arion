import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// 네비게이션 상태 타입
interface NavigationState {
  isOpen: boolean;
  isCollapsed: boolean;
  activeRoute: string;
}

// 액션 타입
type NavigationAction = 
  | { type: 'TOGGLE_NAVIGATION' }
  | { type: 'OPEN_NAVIGATION' }
  | { type: 'CLOSE_NAVIGATION' }
  | { type: 'SET_COLLAPSED'; payload: boolean }
  | { type: 'SET_ACTIVE_ROUTE'; payload: string };

// 초기 상태
const initialState: NavigationState = {
  isOpen: true,
  isCollapsed: false,
  activeRoute: '/',
};

// 리듀서
function navigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
  switch (action.type) {
    case 'TOGGLE_NAVIGATION':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case 'OPEN_NAVIGATION':
      return {
        ...state,
        isOpen: true,
      };
    case 'CLOSE_NAVIGATION':
      return {
        ...state,
        isOpen: false,
      };
    case 'SET_COLLAPSED':
      return {
        ...state,
        isCollapsed: action.payload,
      };
    case 'SET_ACTIVE_ROUTE':
      return {
        ...state,
        activeRoute: action.payload,
      };
    default:
      return state;
  }
}

// 컨텍스트 타입
interface NavigationContextType {
  state: NavigationState;
  toggleNavigation: () => void;
  openNavigation: () => void;
  closeNavigation: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setActiveRoute: (route: string) => void;
  getNavigationWidth: () => string;
  isNavigationVisible: () => boolean;
}

// 컨텍스트 생성
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// 프로바이더 컴포넌트
interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  const toggleNavigation = () => {
    dispatch({ type: 'TOGGLE_NAVIGATION' });
  };

  const openNavigation = () => {
    dispatch({ type: 'OPEN_NAVIGATION' });
  };

  const closeNavigation = () => {
    dispatch({ type: 'CLOSE_NAVIGATION' });
  };

  const setCollapsed = (collapsed: boolean) => {
    dispatch({ type: 'SET_COLLAPSED', payload: collapsed });
  };

  const setActiveRoute = (route: string) => {
    dispatch({ type: 'SET_ACTIVE_ROUTE', payload: route });
  };

  // 유틸리티 함수들
  const getNavigationWidth = (): string => {
    if (!state.isOpen) return 'w-16'; // 닫힌 상태
    return state.isCollapsed ? 'w-20' : 'w-64'; // 축소/확장 상태
  };

  const isNavigationVisible = (): boolean => {
    return state.isOpen;
  };

  const value: NavigationContextType = {
    state,
    toggleNavigation,
    openNavigation,
    closeNavigation,
    setCollapsed,
    setActiveRoute,
    getNavigationWidth,
    isNavigationVisible,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

// 커스텀 훅
export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

// 네비게이션 상태 선택자들
export const useNavigationState = () => {
  const { state } = useNavigation();
  return state;
};

export const useNavigationActions = () => {
  const { 
    toggleNavigation, 
    openNavigation, 
    closeNavigation, 
    setCollapsed, 
    setActiveRoute 
  } = useNavigation();
  
  return {
    toggleNavigation,
    openNavigation,
    closeNavigation,
    setCollapsed,
    setActiveRoute,
  };
};

export const useNavigationUtils = () => {
  const { getNavigationWidth, isNavigationVisible } = useNavigation();
  
  return {
    getNavigationWidth,
    isNavigationVisible,
  };
};
