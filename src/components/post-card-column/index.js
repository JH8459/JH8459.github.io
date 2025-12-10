import { navigate } from 'gatsby';
import React, { useCallback } from 'react';
import PostCard from '../post-card';

function PostCardColumn({ posts, showMoreButton, moreUrl, defaultThumbnail, loadingViews }) {
  const onMoreButtonClick = useCallback(() => {
    navigate(moreUrl);
  }, [moreUrl]);

  const postsToRender = loadingViews
    ? Array.from({ length: posts.length || 4 }) // Render skeletons based on actual post count or a default of 4
    : posts;

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center space-y-4 w-full max-w-4xl">
        {postsToRender.map((post, index) => (
          <PostCard
            key={loadingViews ? `skeleton-${index}` : post.id}
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
