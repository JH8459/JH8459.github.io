import { Link } from 'gatsby';
import React from 'react';
import type { PostModel } from '../../types/post';

interface PostNavigatorProps {
  prevPost?: PostModel | null;
  nextPost?: PostModel | null;
}

/**
 * @description 이전/다음 포스트 네비게이터
 * @param {PostNavigatorProps} props 네비게이터 props
 * @return {JSX.Element}
 */
function PostNavigator({ prevPost, nextPost }: PostNavigatorProps) {
  return (
    <div className="mt-12 grid w-full grid-cols-1 gap-3 border-t border-[var(--post-card-border-color)] pt-8 md:grid-cols-2 md:gap-4">
      {nextPost && (
        <Link
          className="post-card mr-auto flex w-full flex-col rounded-md border border-[var(--post-card-border-color)] p-4 text-[var(--primary-text-color)] transition-colors duration-200 hover:border-[var(--primary-text-color)]"
          key={nextPost.id}
          to={nextPost.slug}
        >
          <div className="direction mb-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--secondary-text-color)]">
            Previous
          </div>
          <div className="title text-[16px] font-semibold leading-[1.45]">{nextPost.title}</div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center text-[12px] font-medium text-[var(--secondary-text-color)]">
              {nextPost.emoji && <span className="mr-[4px]">{nextPost.emoji}</span>}
              {nextPost.categories &&
                nextPost.categories.map((category) => (
                  <span key={category} className="mr-[4px]">
                    {category}
                  </span>
                ))}
            </div>
            <div className="text-[12px] text-[var(--secondary-text-color)]">{nextPost.date}</div>
          </div>
        </Link>
      )}
      {prevPost && (
        <Link
          className="post-card ml-auto flex w-full flex-col rounded-md border border-[var(--post-card-border-color)] p-4 text-[var(--primary-text-color)] transition-colors duration-200 hover:border-[var(--primary-text-color)]"
          key={prevPost.id}
          to={prevPost.slug}
        >
          <div className="direction mb-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--secondary-text-color)]">
            Next
          </div>
          <div className="title text-[16px] font-semibold leading-[1.45]">{prevPost.title}</div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center text-[12px] font-medium text-[var(--secondary-text-color)]">
              {prevPost.emoji && <span className="mr-[4px]">{prevPost.emoji}</span>}
              {prevPost.categories &&
                prevPost.categories.map((category) => (
                  <span key={category} className="mr-[4px]">
                    {category}
                  </span>
                ))}
            </div>
            <div className="text-[12px] text-[var(--secondary-text-color)]">{prevPost.date}</div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default PostNavigator;
