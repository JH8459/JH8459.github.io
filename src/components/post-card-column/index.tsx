import { navigate } from 'gatsby';
import React, { useCallback } from 'react';
import PostCard from '../post-card';
import type { PostModel } from '../../types/post';
import type { GatsbyImageFile } from '../../types/image';

interface PostCardColumnProps {
  posts: PostModel[];
  showMoreButton?: boolean;
  moreUrl: string;
  defaultThumbnail?: GatsbyImageFile;
  loadingViews?: boolean;
}

/**
 * @description 포스트 카드 컬럼
 * @param {PostCardColumnProps} props 컬럼 props
 * @return {JSX.Element}
 */
function PostCardColumn({
  posts,
  showMoreButton,
  moreUrl,
  defaultThumbnail,
  loadingViews,
}: PostCardColumnProps) {
  /**
   * @description 더보기 버튼 클릭 핸들러
   * @return {void}
   */
  const onMoreButtonClick = useCallback(() => {
    // 더보기 클릭 시 목록 페이지 이동
    navigate(moreUrl);
  }, [moreUrl]);

  const postsToRender: Array<PostModel | undefined> = loadingViews
    ? Array.from({ length: posts.length || 4 })
    : posts;

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center space-y-4 w-full max-w-4xl">
        {postsToRender.map((post, index) => (
          <PostCard
            key={loadingViews ? `skeleton-${index}` : (post?.id ?? `post-${index}`)}
            post={post}
            defaultThumbnail={defaultThumbnail}
            isLoading={loadingViews}
          />
        ))}
        {showMoreButton && !loadingViews && (
          <button
            className="h-10 px-4 font-medium text-[15px] bg-[var(--button-background-color)] text-[var(--tab-hover-text-color)] rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={onMoreButtonClick}
          >
            More
          </button>
        )}
      </div>
    </div>
  );
}

export default PostCardColumn;
