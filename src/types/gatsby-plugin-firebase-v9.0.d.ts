/**
 * @description 타입 정의가 없는 라이브러리를 위한 커스텀 선언
 */
declare module 'gatsby-plugin-firebase-v9.0' {
  import type { FirebaseApp } from 'firebase/app';

  const firebaseApp: FirebaseApp;
  export default firebaseApp;
}
