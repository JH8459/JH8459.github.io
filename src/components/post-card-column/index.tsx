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
}: PostCardColumnProps) {
  /**
   * @description 더보기 버튼 클릭 핸들러
   * @return {void}
   */
  const onMoreButtonClick = useCallback(() => {
    // 더보기 클릭 시 목록 페이지 이동
    navigate(moreUrl);
  }, [moreUrl]);

  return (
    <div className="mt-2 flex w-full justify-center">
      <div className="flex w-full flex-col items-center">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} defaultThumbnail={defaultThumbnail} />
        ))}
        {showMoreButton && (
          <button
            className="mt-8 h-10 rounded-md border border-[var(--post-card-border-color)] px-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--secondary-text-color)] transition-colors duration-200 hover:border-[var(--primary-text-color)] hover:text-[var(--primary-text-color)]"
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
