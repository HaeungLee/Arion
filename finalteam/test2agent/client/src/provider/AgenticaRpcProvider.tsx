import { IAgenticaEventJson } from "@agentica/core";
import { IAgenticaRpcListener, IAgenticaRpcService } from "@agentica/rpc";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef
} from "react";
import { Driver, WebSocketConnector } from "tgrid";

interface AgenticaRpcContextType {
  messages: IAgenticaEventJson[];
  conversate: (message: string) => Promise<void>;
  isConnected: boolean;
  isError: boolean;
  tryConnect: () => Promise<
    | WebSocketConnector<
        null,
        IAgenticaRpcListener,
        IAgenticaRpcService<"chatgpt">
      >
    | undefined
  >;
}

const AgenticaRpcContext = createContext<AgenticaRpcContextType | null>(null);

export function AgenticaRpcProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<IAgenticaEventJson[]>([]);
  const [isError, setIsError] = useState(false);
  const [driver, setDriver] =
    useState<Driver<IAgenticaRpcService<"chatgpt">, false>>();

  // 메시지 추가 함수 - 중복 방지 로직 포함
  const pushMessageRef = useRef(async (message: IAgenticaEventJson) => {
    setMessages(prev => {
      // 중복 메시지 체크 (같은 ID와 타입이면 중복으로 간주)
      const isDuplicate = prev.some(msg => 
        msg.id === message.id && 
        msg.type === message.type &&
        msg.content === message.content
      );
      
      if (isDuplicate) {
        console.warn('🚫 중복 메시지 감지, 추가하지 않음:', message.content);
        return prev;
      }
      
      console.log('✅ 새 메시지 추가:', message.type, message.content);
      return [...prev, message];
    });
    return Promise.resolve();
  });

  const tryConnect = useCallback(async () => {
    try {
      setIsError(false);
      
      // WebSocket URL 설정 - undefined 방지
      const wsUrl = import.meta.env.VITE_AGENTICA_WS_URL || 'ws://localhost:8081';
      console.log('🔌 WebSocket 연결 시도:', wsUrl);
      
      const connector: WebSocketConnector<
        null,
        IAgenticaRpcListener,
        IAgenticaRpcService<"chatgpt">
      > = new WebSocketConnector<
        null,
        IAgenticaRpcListener,
        IAgenticaRpcService<"chatgpt">
      >(null, {
        assistantMessage: async (msg) => {
          console.log('📥 Assistant message:', msg.content);
          await pushMessageRef.current(msg);
        },
        describe: async (msg) => {
          // describe는 별도 처리하지 않고 로그만 출력
          console.log('📋 Description:', msg.content);
          // describe 메시지는 추가하지 않음 (중복 방지)
        },
        userMessage: async (msg) => {
          console.log('👤 User message:', msg.content);
          await pushMessageRef.current(msg);
        }
      });
      
      console.log('Attempting to connect to WebSocket...');
      await connector.connect(wsUrl);
      console.log('WebSocket connected successfully');
      
      const driver = connector.getDriver();
      setDriver(driver);
      console.log('WebSocket driver initialized');
      
      return connector;
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      
      // 개발 환경에서는 상세한 연결 실패 정보 제공
      if (import.meta.env.DEV) {
        if (errorMessage.includes('connection refused') || errorMessage.includes('failed')) {
          console.warn('🚀 Agent 서버 (8081) 연결 실패 - 서버를 실행해주세요');
          console.warn('💡 실행 명령: cd finalteam/test2agent/server && npm start');
        } else {
          console.error('Connection error:', e);
        }
      } else {
        console.error('WebSocket connection failed:', errorMessage);
      }
      
      setIsError(true);
      throw e; // 오류를 다시 throw하여 상위에서 처리할 수 있도록 함
    }
  }, []); // 의존성 배열을 비움

  const conversate = useCallback(
    async (message: string) => {
      if (!driver) {
        console.error("Driver is not connected. Please connect to the server.");
        return;
      }
      try {
        await driver.conversate(message);
      } catch (e) {
        console.error(e);
        setIsError(true);
      }
    },
    [driver]
  );

  useEffect(() => {
    let mounted = true;
    let connector: WebSocketConnector<null, IAgenticaRpcListener, IAgenticaRpcService<"chatgpt">> | undefined;
    let reconnectTimeout: NodeJS.Timeout;
    let hasConnected = false; // 연결 중복 방지 플래그

    const connect = async (retryCount = 0) => {
      if (!mounted || hasConnected) return;

      try {
        console.log(`🔌 WebSocket 연결 시도 ${retryCount + 1}/3: ws://localhost:8081`);
        hasConnected = true; // 연결 시도 플래그 설정
        connector = await tryConnect();
        setIsError(false); // 연결 성공 시 에러 상태 초기화
        console.log('✅ WebSocket 연결 성공');
      } catch (e) {
        hasConnected = false; // 연결 실패 시 플래그 리셋
        console.error("Connection error:", e);
        
        // 개발 환경에서만 재연결 시도
        if (import.meta.env.DEV && retryCount < 2 && mounted) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 5000); // 지수 백오프 (최대 5초)
          console.warn(`🔄 ${delay/1000}초 후 재연결 시도...`);
          
          reconnectTimeout = setTimeout(() => {
            if (mounted) {
              connect(retryCount + 1);
            }
          }, delay);
        } else {
          console.warn('❌ WebSocket 연결 실패 - Agent 서버(8081)를 실행해주세요');
          if (import.meta.env.DEV) {
            console.warn('💡 실행 명령: cd finalteam/test2agent/server && npm start');
          }
        }
      }
    };

    // 한 번만 연결 시도
    if (mounted && !hasConnected) {
      connect();
    }

    return () => {
      mounted = false;
      hasConnected = false;
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (connector) {
        connector.close();
        setDriver(undefined);
      }
    };
  }, []); // 의존성 배열에서 tryConnect 제거

  const isConnected = !!driver;

  return (
    <AgenticaRpcContext.Provider
      value={{ messages, conversate, isConnected, isError, tryConnect }}
    >
      {children}
    </AgenticaRpcContext.Provider>
  );
}

export function useAgenticaRpc() {
  const context = useContext(AgenticaRpcContext);
  if (!context) {
    throw new Error("useAgenticaRpc must be used within AgenticaRpcProvider");
  }
  return context;
}
