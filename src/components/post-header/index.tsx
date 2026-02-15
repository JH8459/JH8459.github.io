import { Link } from 'gatsby';
import React, { useState } from 'react';
import ViewCount from './view';
import { FaRegClock, FaCalendarAlt } from 'react-icons/fa';
import type { PostModel } from '../../types/post';

interface PostHeaderProps {
  post: PostModel;
  viewCount?: number;
}

/**
 * @description 포스트 헤더
 * @param {PostHeaderProps} props 헤더 props
 * @return {JSX.Element}
 */
function PostHeader({ post, viewCount }: PostHeaderProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  // 7일 이내 게시글은 신규 표시
  const isNew =
    Math.ceil((new Date().getTime() - new Date(post.date).getTime()) / (1000 * 3600 * 24)) <= 7;

  return (
    <header className="w-full border-b border-[var(--post-card-border-color)] pb-9 pt-10 break-keep md:pt-12">
      <h1 className="title mb-4 text-[29px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[var(--primary-text-color)] md:text-[35px]">
        {post.title}
        {isNew && (
          <span className="ml-2 inline-flex rounded-md bg-red-50 px-2.5 py-[2px] align-middle text-[12px] font-bold uppercase tracking-[0.05em] text-red-500 dark:bg-red-900/30 dark:text-red-300 md:text-[13px]">
            New
          </span>
        )}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {post.emoji && <div className="mr-[2px] text-[18px]">{post.emoji}</div>}
          {post.categories.map((category) => (
            <Link
              className="rounded-md bg-[var(--button-background-color)] px-1.5 py-[1px] text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--secondary-text-color)] transition-colors duration-200 hover:text-[var(--primary-text-color)]"
              key={category}
              to={`/posts/${category}`}
            >
              {category}
            </Link>
          ))}
        </div>

        <div className="info flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-[var(--secondary-text-color)] md:justify-end">
          <button
            type="button"
            className="relative flex items-center"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
          >
            <FaRegClock className="mr-1 h-4 w-4" />
            <strong>{`${post.timeToRead} min`}</strong>
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 z-10 mb-2 w-max -translate-x-1/2 rounded-md border border-[var(--post-card-border-color)] bg-[var(--background-color)] px-2 py-1 text-[11px] font-medium text-[var(--secondary-text-color)] shadow-lg">
                {`이 게시글을 읽는데 ${post.timeToRead}분 정도의 시간이 소요될 것으로 예상됩니다.`}
              </div>
            )}
          </button>
          <ViewCount viewCount={viewCount} />
          <div className="inline-flex items-center">
            <FaCalendarAlt className="mr-1 h-4 w-4" /> {post.date}
          </div>
        </div>
      </div>
    </header>
  );
}
export default PostHeader;
