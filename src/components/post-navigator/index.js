import { Link } from 'gatsby';
import React from 'react';


function PostNavigator({ prevPost, nextPost }) {
  return (
    <div className="grid w-full grid-cols-[49.3%_49.3%] gap-[1.4%] mt-[40px]">
      {nextPost && (
        <Link className="post-card flex flex-col w-full border border-[var(--post-card-border-color)] rounded-[6px] p-[15px] text-[var(--primary-text-color)] cursor-pointer transition-transform duration-200 hover:scale-105 mr-auto" key={nextPost.id} to={nextPost.slug}>
          <div className="direction text-[14px] font-medium text-gray-500 mb-[5px]">이전 글</div>
          <div className="title text-[16px] font-semibold leading-[1.4]">{nextPost.title}</div>
          <div className="flex justify-between items-center mt-[5px]">
            <div className="flex items-center text-[14px] font-medium text-[var(--primary-text-color)]">
              {nextPost.emoji && <span className="mr-[4px]">{nextPost.emoji}</span>}
              {nextPost.categories && nextPost.categories.map((category) => (
                <span key={category} className="mr-[4px]">{category}</span>
              ))}
            </div>
            <div className="text-[12px] text-[var(--secondary-text-color)]">{nextPost.date}</div>
          </div>
        </Link>
      )}
      {prevPost && (
        <Link className="post-card flex flex-col w-full border border-[var(--post-card-border-color)] rounded-[6px] p-[15px] text-[var(--primary-text-color)] cursor-pointer transition-transform duration-200 hover:scale-105 ml-auto" key={prevPost.id} to={prevPost.slug}>
          <div className="direction text-[14px] font-medium text-gray-500 mb-[5px]">다음 글</div>
          <div className="title text-[16px] font-semibold leading-[1.4]">{prevPost.title}</div>
          <div className="flex justify-between items-center mt-[5px]">
            <div className="flex items-center text-[14px] font-medium text-[var(--primary-text-color)]">
              {prevPost.emoji && <span className="mr-[4px]">{prevPost.emoji}</span>}
              {prevPost.categories && prevPost.categories.map((category) => (
                <span key={category} className="mr-[4px]">{category}</span>
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

