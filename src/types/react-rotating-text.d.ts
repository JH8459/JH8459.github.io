/**
 * @description 타입 정의가 없는 라이브러리를 위한 커스텀 선언
 */
declare module 'react-rotating-text' {
  import type { ComponentType } from 'react';

  interface ReactRotatingTextProps {
    items: string[];
    className?: string;
    typingInterval?: number;
    pause?: number;
    emptyPause?: number;
  }

  const ReactRotatingText: ComponentType<ReactRotatingTextProps>;
  export default ReactRotatingText;
}
