import firebase from 'gatsby-plugin-firebase-v9.0';
import { get, getDatabase, ref } from 'firebase/database';
import type { PostViewCounts } from '../types/post';

/**
 * @description Firebase에서 포스트별 조회수를 조회
 * @return {Promise<PostViewCounts>} 포스트별 조회수 정보
 */
export async function getPostViewCounts(): Promise<PostViewCounts> {
  const database = getDatabase(firebase);
  const snapshot = await get(ref(database, 'posts'));

  if (!snapshot.exists()) return {};

  const value: unknown = snapshot.val();
  return typeof value === 'object' && value !== null ? (value as PostViewCounts) : {};
}
