import type { PostModel } from '../types/post';

/**
 * @description 포스트 목록에서 고유 카테고리를 추출
 * @param {PostModel[]} posts 포스트 배열
 * @return {string[]} 정렬된 카테고리 목록
 */
export const getUniqueCategories = (posts: PostModel[]): string[] => {
  const categorySet = new Set<string>();
  posts.forEach(({ categories }) => categories.forEach((category) => categorySet.add(category)));
  return [...categorySet].sort((a, b) => {
    if (a === 'featured') return -1;
    if (b === 'featured') return 1;
    return 0;
  });
};
