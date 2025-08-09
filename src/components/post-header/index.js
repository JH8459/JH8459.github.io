import { Link } from 'gatsby';
import React, { useState } from 'react';
import ViewCount from './view';
import { FaRegClock, FaCalendarAlt } from 'react-icons/fa';

function PostHeader({ post, viewCount }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isNew =
    Math.ceil((new Date().getTime() - new Date(post.date).getTime()) / (1000 * 3600 * 24)) <= 7;

  return (
    <header className="flex flex-col justify-center w-full pb-[10px] border-b border-[var(--post-card-border-color)] mt-[20px] mb-[40px] break-keep">
      <div className="categories mb-[5px] flex items-center">
        {post.emoji && <div className="text-[18px] mr-[4px]">{post.emoji}</div>}
        {post.categories.map((category) => (
          <Link
            className="category mr-[4px] font-semibold text-[var(--primary-text-color)] hover:underline text-[18px]"
            key={category}
            to={`/posts/${category}`}
          >
            {category}
          </Link>
        ))}
      </div>

      <h1 className="relative title font-semibold text-[32px] text-[var(--primary-text-color)] mb-[6px] leading-[1.3]">
        <span className="relative">
          {post.title}
          {isNew && (
            <span
              className="absolute top-[-10px] right-[-15px] text-red-500 font-bold text-base"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
            >
              N
            </span>
          )}
        </span>
      </h1>
      <div className="info flex flex-wrap w-full leading-[1.5] text-base font-medium text-[var(--secondary-text-color)] justify-end items-center space-x-4">
        <button
          type="button"
          className="relative cursor-pointer p-1 transition-all duration-200 hover:scale-105 bg-transparent border-none text-left font-medium text-[var(--secondary-text-color)] flex items-center"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        >
          <FaRegClock className="w-4 h-4 mr-1" />
          <strong>{`${post.timeToRead} min`}</strong>
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-max p-2 bg-black text-white text-xs rounded">
              {`이 게시글을 읽는데 ${post.timeToRead}분 정도의 시간이 소요될 것으로 예상됩니다.`}
            </div>
          )}
        </button>
        <ViewCount viewCount={viewCount} expectedDigits={4} />
        <div className="flex items-center">
          <FaCalendarAlt className="w-4 h-4 mr-1" /> {post.date}
        </div>
      </div>
    </header>
  );
}
export default PostHeader;
