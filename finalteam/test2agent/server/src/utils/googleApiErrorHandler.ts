/**
 * Google API 서비스들의 공통 오류 처리 유틸리티
 */

export interface GoogleApiService {
  [key: string]: any;
}

export interface ErrorHandlerOptions {
  serviceName: string;
  apiName: string;
}

/**
 * Google API 오류를 사용자 친화적인 메시지로 변환합니다.
 */
export function createGoogleApiErrorMessage(error: any, options: ErrorHandlerOptions): string {
  const { serviceName, apiName } = options;
  
  // OAuth 토큰 관련 오류 처리
  if (error.message?.includes('invalid_grant') || 
      error.message?.includes('invalid_token') ||
      error.message?.includes('Token has been expired') ||
      error.code === 401) {
    
    return `${serviceName} 인증 토큰이 만료되었습니다. 새로운 토큰을 생성해주세요.\n\n해결 방법:\n1. 'python get_refresh_token.py' 실행\n2. Google 인증 후 새 토큰 획득\n3. .env 파일의 GOOGLE_REFRESH_TOKEN 업데이트\n4. 서버 재시작\n\n자세한 가이드: README_REFRESH_TOKEN.md 참고`;
  }
  
  // API 할당량 초과 오류
  else if (error.message?.includes('quota')) {
    return `${serviceName} API 할당량이 초과되었습니다. 잠시 후 다시 시도해주세요.`;
  }
  
  // 권한 없음 오류
  else if (error.message?.includes('forbidden') || error.code === 403) {
    return `${serviceName} API 권한이 없습니다. Google Cloud Console에서 ${apiName}을 활성화해주세요.`;
  }
  
  // 리소스 찾을 수 없음 오류
  else if (error.message?.includes('not found') || error.code === 404) {
    const resourceType = getResourceType(serviceName);
    return `요청한 ${resourceType}을(를) 찾을 수 없습니다.`;
  }
  
  // 네트워크 오류
  else if (error.message?.includes('ENOTFOUND') || error.message?.includes('ECONNREFUSED')) {
    return `${serviceName} 서비스에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.`;
  }
  
  // 기타 오류
  else {
    return `${serviceName} 서비스 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`;
  }
}

/**
 * 서비스명에 따른 리소스 타입을 반환합니다.
 */
function getResourceType(serviceName: string): string {
  switch (serviceName) {
    case 'Gmail':
      return '메일';
    case 'Google Calendar':
      return '캘린더 일정';
    case 'Google Docs':
      return '문서';
    case 'Google Drive':
      return '파일이나 폴더';
    default:
      return '리소스';
  }
}

/**
 * Google API 서비스에 오류 처리를 추가하는 데코레이터 함수
 */
export function withGoogleApiErrorHandling<T extends GoogleApiService>(
  service: T,
  options: ErrorHandlerOptions
): T {
  const { serviceName } = options;
  
  // 서비스의 모든 함수를 찾아서 에러 핸들링 래퍼를 적용
  const originalFunctions = Object.getOwnPropertyNames(Object.getPrototypeOf(service))
    .filter(name => typeof (service as any)[name] === 'function' && name !== 'constructor');
  
  originalFunctions.forEach(funcName => {
    const originalFunc = (service as any)[funcName];
    if (typeof originalFunc === 'function') {
      (service as any)[funcName] = async function(...args: any[]) {
        try {
          return await originalFunc.apply(this, args);
        } catch (error: any) {
          console.error(`❌ ${serviceName} API 오류 (${funcName}):`, error.message);
          
          const userFriendlyMessage = createGoogleApiErrorMessage(error, options);
          throw new Error(userFriendlyMessage);
        }
      };
    }
  });
  
  return service;
}

/**
 * Google 서비스별 옵션 상수
 */
export const GOOGLE_SERVICE_OPTIONS = {
  GMAIL: { serviceName: 'Gmail', apiName: 'Gmail API' },
  CALENDAR: { serviceName: 'Google Calendar', apiName: 'Calendar API' },
  DOCS: { serviceName: 'Google Docs', apiName: 'Docs API' },
  DRIVE: { serviceName: 'Google Drive', apiName: 'Drive API' },
} as const;
