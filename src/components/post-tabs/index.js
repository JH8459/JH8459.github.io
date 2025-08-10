import React, { useMemo } from 'react';
import PostCardColumn from '../post-card-column';
import PostSorter from '../post-sorter';

function PostTabs({ tabIndex, onChange, tabs, posts, showMoreButton, defaultThumbnail, sortType, onSortChange, loadingViews }) {
  const tabPosts = useMemo(() => {
    if (tabs[tabIndex] === 'All') return posts;
    return posts.filter((post) => post.categories.includes(tabs[tabIndex]));
  }, [posts, tabs, tabIndex]);

  return (
    <div className="flex flex-col items-center justify-center self-start top-0 w-full">
      <div className="flex justify-center items-center flex-wrap gap-2 md:gap-4 h-auto w-full max-w-[760px] mb-[18px] mx-auto py-2">
        {tabs.map((title, index) => {
          const isSelected = tabIndex === index;
          return (
            <button
              key={index}
              onClick={() => onChange(null, index)}
              className={`px-5 py-2.5 rounded-lg text-base font-medium transition-all duration-200 whitespace-nowrap shadow-sm ${
                isSelected
                  ? 'bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-amber-100 hover:text-amber-700 dark:hover:text-amber-700'
              }`}
            >
              {title}
            </button>
          );
        })}
      </div>
      <div className="w-full max-w-[760px] my-2">
        <PostSorter sortType={sortType} onChange={onSortChange} />
      </div>
      <PostCardColumn
        posts={showMoreButton ? tabPosts.slice(0, 4) : tabPosts}
        showMoreButton={showMoreButton && tabPosts.length > 4}
        moreUrl={`posts/${tabIndex === 0 ? '' : tabs[tabIndex]}`}
        defaultThumbnail={defaultThumbnail}
        loadingViews={loadingViews} // Pass loading state down
      />
    </div>
  );
}
export default PostTabs;
