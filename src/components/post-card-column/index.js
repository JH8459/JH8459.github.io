import { navigate } from 'gatsby-link';
import React, { useCallback } from 'react';
import PostCard from '../post-card';

function PostCardColumn({ posts, showMoreButton, moreUrl, defaultThumbnail }) {
  const onMoreButtonClick = useCallback(() => {
    navigate(moreUrl);
  }, [moreUrl]);

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center space-y-4 w-full max-w-4xl">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} defaultThumbnail={defaultThumbnail} />
        ))}
        {showMoreButton && (
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
