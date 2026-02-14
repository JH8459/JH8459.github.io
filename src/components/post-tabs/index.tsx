import React, { useMemo } from 'react';
import PostCardColumn from '../post-card-column';
import PostSorter from '../post-sorter';
import type { PostModel } from '../../types/post';
import type { GatsbyImageFile } from '../../types/image';

type SortType = 'date-desc' | 'date-asc' | 'title-asc' | 'views-desc';

interface PostTabsProps {
  tabIndex: number;
  onChange: (event: React.MouseEvent | null, value: number) => void;
  tabs: string[];
  posts: PostModel[];
  showMoreButton?: boolean;
  defaultThumbnail?: GatsbyImageFile;
  sortType: SortType;
  onSortChange: (event: { target: { value: SortType } }) => void;
  loadingViews?: boolean;
}

/**
 * @description 포스트 탭 영역
 * @param {PostTabsProps} props 탭 props
 * @return {JSX.Element}
 */
function PostTabs({
  tabIndex,
  onChange,
  tabs,
  posts,
  showMoreButton,
  defaultThumbnail,
  sortType,
  onSortChange,
  loadingViews,
}: PostTabsProps) {
  const tabPosts = useMemo(() => {
    // 선택 탭에 맞는 포스트만 필터링
    if (tabs[tabIndex] === 'All') return posts;
    return posts.filter((post) => post.categories.includes(tabs[tabIndex]));
  }, [posts, tabs, tabIndex]);

  return (
    <section className="w-full">
      <div className="mt-8 flex flex-col gap-4 border-b border-[var(--post-card-border-color)] pb-3 md:flex-row md:items-end md:justify-between">
        <div className="no-scrollbar -mb-[1px] flex items-center gap-1 overflow-x-auto pr-2">
          {tabs.map((title, index) => {
            const isSelected = tabIndex === index;
            return (
              <button
                key={index}
                onClick={() => onChange(null, index)}
                className={`shrink-0 border-b-2 px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors duration-200 ${
                  isSelected
                    ? 'border-[var(--primary-text-color)] text-[var(--primary-text-color)]'
                    : 'border-transparent text-[var(--secondary-text-color)] hover:text-[var(--primary-text-color)]'
                }`}
              >
                {title}
              </button>
            );
          })}
        </div>
        <div className="shrink-0 md:min-w-[124px]">
          <PostSorter sortType={sortType} onChange={onSortChange} />
        </div>
      </div>
      <PostCardColumn
        posts={showMoreButton ? tabPosts.slice(0, 4) : tabPosts}
        showMoreButton={showMoreButton && tabPosts.length > 4}
        moreUrl={`posts/${tabIndex === 0 ? '' : tabs[tabIndex]}`}
        defaultThumbnail={defaultThumbnail}
        loadingViews={loadingViews} // Pass loading state down
      />
    </section>
  );
}
export default PostTabs;
