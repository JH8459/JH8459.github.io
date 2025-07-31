import React, { useMemo } from 'react';
import PostCardColumn from '../post-card-column';

function PostTabs({ tabIndex, onChange, tabs, posts, showMoreButton, defaultThumbnail }) {
  const tabPosts = useMemo(() => {
    if (tabs[tabIndex] === 'All') return posts;
    return posts.filter((post) => post.categories.includes(tabs[tabIndex]));
  }, [posts, tabs, tabIndex]);

  return (
    <div className="flex flex-col items-center justify-center self-start top-0 w-full">
      <div className="flex justify-center items-center h-[40px] w-full max-w-[760px] mb-[36px] overflow-x-auto mx-auto">
        {tabs.map((title, index) => (
          <button
            key={index}
            onClick={() => onChange(null, index)}
            className={`h-[40px] min-h-auto min-w-auto px-[12px] py-[10px] font-sans text-[17px] font-medium leading-none transition-all duration-200 focus:outline-none ${tabIndex === index ? 'bg-[var(--tab-selected-background-color)] text-[var(--tab-hover-text-color)] rounded-[8px] font-semibold' : 'text-[var(--tab-text-color)] hover:text-[var(--tab-hover-text-color)]'}`}
          >
            {title}
          </button>
        ))}
      </div>
      <PostCardColumn
        posts={showMoreButton ? tabPosts.slice(0, 4) : tabPosts}
        showMoreButton={showMoreButton && tabPosts.length > 4}
        moreUrl={`posts/${tabIndex === 0 ? '' : tabs[tabIndex]}`}
        defaultThumbnail={defaultThumbnail}
      />
    </div>
  );
}
export default PostTabs;
