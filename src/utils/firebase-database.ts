import firebase from 'gatsby-plugin-firebase-v9.0';
import { getDatabase, type Database } from 'firebase/database';

let cachedDatabase: Database | null = null;

/**
 * @description 조회수 기능(Realtime Database) 사용 가능 여부
 *  .env 에 FIREBASE_DATABASE_URL 이 없는 로컬 환경에서는 false 가 되어,
 *  글 작성·미리보기는 그대로 두고 조회수 기능만 비활성화된다.
 * @return {boolean} 사용 가능 여부
 */
export function isViewCountEnabled(): boolean {
  return Boolean(firebase?.options?.databaseURL);
}

/**
 * @description Realtime Database 인스턴스를 반환
 *  설정이 없으면 예외 대신 null 을 돌려주어 호출부에서 건너뛸 수 있게 한다.
 * @return {Database | null} 데이터베이스 인스턴스, 설정이 없으면 null
 */
export function getOptionalDatabase(): Database | null {
  if (!isViewCountEnabled()) return null;

  if (!cachedDatabase) cachedDatabase = getDatabase(firebase);

  return cachedDatabase;
}
