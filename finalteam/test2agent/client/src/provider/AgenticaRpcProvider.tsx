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
  conversate: (message: string, options?: { autoTTS?: boolean; detailMode?: boolean }) => Promise<void>;
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
        JSON.stringify(msg) === JSON.stringify(message)
      );
      
      if (isDuplicate) {
        console.warn('🚫 중복 메시지 감지, 추가하지 않음:', message.type);
        return prev;
      }
      
      console.log('✅ 새 메시지 추가:', message.type);
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
          console.log('📥 Assistant message:', (msg as any).text || msg.type);
          await pushMessageRef.current(msg);
        },
        describe: async (msg) => {
          console.log('📋 Description:', (msg as any).text || msg.type);
          
          // describe 메시지를 UI에 표시
          const text = (msg as any).text || '';
          const EMAIL_SUCCESS_REGEX = /(메일|이메일).*(전송|보냈).*(성공|완료)|successfully\s+sent/i;
          
          if (EMAIL_SUCCESS_REGEX.test(text)) {
            // 이메일 성공 시 특별한 스타일로 표시
            await pushMessageRef.current({
              ...msg,
              id: msg.id + '-email-success',
              type: 'assistantMessage',
              text: '📧 이메일 전송 성공',
              content: '📧 이메일 전송 성공'
            } as any);
          }
          
          // 모든 describe 메시지를 UI에 표시 (이메일 성공 포함)
          await pushMessageRef.current({
            ...msg,
            id: msg.id + '-describe',
            type: 'assistantMessage', 
            text: text,
            content: text,
            done: true,
            isDescribe: true  // describe 메시지임을 표시
          } as any);
        },
        userMessage: async (msg) => {
          console.log('👤 User message:', (msg as any).contents?.[0]?.text || msg.type);
          await pushMessageRef.current(msg);
        }
      });
      
      console.log('Attempting to connect to WebSocket...');
      
      // 연결 타임아웃 설정 (10초)
      const connectPromise = connector.connect(wsUrl);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000)
      );
      
      await Promise.race([connectPromise, timeoutPromise]);
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
    async (message: string, options: { autoTTS?: boolean; detailMode?: boolean } = {}) => {
      if (!driver) {
        console.error("Driver is not connected. Please connect to the server.");
        return;
      }
      try {
        // 옵션을 서버에 전달 (향후 서버에서 시스템 프롬프트로 처리)
        // TODO: 서버에서 options.detailMode를 받아서 시스템 프롬프트에 반영하도록 수정 필요
        await driver.conversate(message);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.error('Conversate error:', errorMessage);
        
        // 연결이 끊어진 경우 driver를 undefined로 설정하고 재연결 시도
        if (errorMessage.includes('connection has been closed') || 
            errorMessage.includes('connection refused') ||
            errorMessage.includes('WebSocket is not connected')) {
          console.warn('🔌 연결이 끊어졌습니다. 재연결을 시도합니다...');
          setDriver(undefined);
          setIsError(true);
          
          // 잠시 후 재연결 시도
          setTimeout(() => {
            console.log('🔄 자동 재연결 시도...');
            tryConnect().catch(console.error);
          }, 1000);
        } else {
          setIsError(true);
        }
      }
    },
    [driver, tryConnect]
  );

  useEffect(() => {
    let mounted = true;
    let connector: WebSocketConnector<null, IAgenticaRpcListener, IAgenticaRpcService<"chatgpt">> | undefined;
    let reconnectTimeout: NodeJS.Timeout;
    let hasConnected = false; // 연결 중복 방지 플래그

    const connect = async (retryCount = 0) => {
      if (!mounted) return;

      try {
        // 이미 연결 시도 중이면 스킵
        if (hasConnected && retryCount === 0) {
          console.log('🔄 이미 연결 시도 중입니다...');
          return;
        }

        console.log(`🔌 WebSocket 연결 시도 ${retryCount + 1}/3`);
        hasConnected = true;
        
        connector = await tryConnect();
        setIsError(false);
        console.log('✅ WebSocket 연결 성공');
        
        // 연결 성공 시 플래그 유지
        return;
        
      } catch (e) {
        hasConnected = false; // 연결 실패 시 플래그 리셋
        console.error("Connection error:", e);
        
        // 최대 3회 재시도
        if (retryCount < 2 && mounted) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
          console.warn(`🔄 ${delay/1000}초 후 재연결 시도... (${retryCount + 2}/3)`);
          
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
          setIsError(true);
        }
      }
    };

    // 컴포넌트 마운트 시 연결 시도
    connect();

    return () => {
      mounted = false;
      hasConnected = false;
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (connector) {
        try {
          connector.close();
        } catch (e) {
          console.warn('WebSocket 연결 해제 중 오류:', e);
        }
        setDriver(undefined);
      }
    };
  }, []); // 빈 의존성 배열로 한 번만 실행

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
