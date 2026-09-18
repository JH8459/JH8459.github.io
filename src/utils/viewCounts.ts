import { get, ref } from 'firebase/database';
import { getOptionalDatabase } from './firebase-database';
import type { PostViewCounts } from '../types/post';

/**
 * @description Firebase에서 포스트별 조회수를 조회
 * @return {Promise<PostViewCounts>} 포스트별 조회수 정보
 */
export async function getPostViewCounts(): Promise<PostViewCounts> {
  const database = getOptionalDatabase();

  // Realtime Database 설정이 없으면 조회수 없이 진행한다
  if (!database) return {};

  const snapshot = await get(ref(database, 'posts'));

  if (!snapshot.exists()) return {};

  const value: unknown = snapshot.val();
  return typeof value === 'object' && value !== null ? (value as PostViewCounts) : {};
}
